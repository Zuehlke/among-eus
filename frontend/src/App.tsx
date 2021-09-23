import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame, {Game} from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";
import React from "react";
import SocketConnection from "./components/SocketConnection/SocketConnection";
import {Client, Message} from "@stomp/stompjs";

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
            gameId: ""
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
                {currentView === 'ChooseGame' && <ChooseGame games={this.state.games} onHostGame={this.onHostGame} onLobbyJoin={this.onLobbyJoin}/>}
                {currentView === 'Lobby' && <Lobby client={this.state.client} gameId={this.state.gameId} isHost={true} numberOfTasks={2} />}
                {currentView === 'CreateTasks' && <CreateTasks/>}
                {currentView === 'SocketConnection' && <SocketConnection/>}
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

    private publish(endpoint:string, payload?: any) {
        const client: Client | undefined = this.state.client;
        client?.publish({
            destination: endpoint,
            body: JSON.stringify(payload),
        });
    }

    componentDidMount() {
        this.initialiseWebSocket();
    }

    initialiseWebSocket() {
        const WS_GAMES_URL: string = (process.env.REACT_APP_WS_GAMES_URL as string);

        const client = new Client({
            brokerURL: WS_GAMES_URL,
            debug: function (str) {
                console.debug(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            this.setState({client})

            client.subscribe('/getGames', this.onGamesReceived)
        }

        client.onStompError = (frame) => {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

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
