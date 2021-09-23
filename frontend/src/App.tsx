import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame, {Game} from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";
import React from "react";
import {Client, Message} from "@stomp/stompjs";
import {createClient} from "./websocket-helper";

interface AppState {
    currentView: string,
    client?: Client,
    games: Game[],
    playerName?: string,
    gameId: string,
}

class App extends React.Component<any, AppState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            currentView: 'ChooseName',
            client: undefined,
            games: [],
            gameId: '',
        };
        this.onNameChosen = this.onNameChosen.bind(this);
        this.onHostGame = this.onHostGame.bind(this);
        this.onGamesReceived = this.onGamesReceived.bind(this);
        this.onLobbyJoin = this.onLobbyJoin.bind(this);
    }

    render() {
        const currentView = this.state.currentView;
        return (
            <div className="app-container schwarzwald-background">
                {currentView === 'ChooseName' && <ChooseName onNameChosen={this.onNameChosen}/>}
                {currentView === 'ChooseGame' && <ChooseGame games={this.state.games}
                                                             onHostGame={this.onHostGame}
                                                             onLobbyJoin={this.onLobbyJoin}/>}
                {currentView === 'Lobby' && <Lobby playerId={this.state.playerName || ''}
                                                   client={this.state.client}
                                                   gameId={this.state.gameId}
                                                   isHost={true}
                                                   numberOfTasks={2}/>}
                {currentView === 'CreateTasks' &&
                <CreateTasks playerId={this.state.playerName || ''}
                             gameId={this.state.gameId}
                             onTasksCreated={() => this.setState({currentView: 'Lobby'})}/>}
            </div>
        );
    }

    onNameChosen(playerName: string) {
        this.setState({
            playerName,
            currentView: 'ChooseGame',
        });
    }

    onHostGame() {
        const client: Client | undefined = this.state.client;
        client?.publish({
            destination: '/create',
            body: JSON.stringify({
                name: this.state.playerName + "'s Game",
                ownerId: 42,
            }),
        });
    }

    onLobbyJoin(gameId: string) {
        this.setState({currentView: "Lobby", gameId});
    }

    componentDidMount() {
        this.initialiseWebSocket();
    }

    initialiseWebSocket() {
        const gameEndpoint: string = (process.env.REACT_APP_WS_GAMES_URL as string);
        const client = createClient(gameEndpoint);

        client.onConnect = () => {
            this.setState({client})

            client.subscribe('/getGames', this.onGamesReceived)
        }

        client.activate();
    }


    private onGamesReceived(message: Message) {
        const games: Game[] = JSON.parse(message.body);
        this.setState({
            games,
        });
    }
}

export default App;
