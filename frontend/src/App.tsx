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
    playerClient?: Client,
    playerId?: string
}

interface Player {
    id: string,
}

class App extends React.Component<any, AppState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            currentView: 'ChooseName',
            client: undefined,
            games: [],
            playerClient: undefined,
            playerId: '',
        };
        this.onNameChosen = this.onNameChosen.bind(this);
        this.onHostGame = this.onHostGame.bind(this);
        this.onGamesReceived = this.onGamesReceived.bind(this);
        this.onPlayerReceived = this.onPlayerReceived.bind(this);
    }

    render() {
        const currentView = this.state.currentView;
        return (
            <div>
                {currentView === 'ChooseName' && <ChooseName onNameChosen={this.onNameChosen}/>}
                {currentView === 'ChooseGame' && <ChooseGame playerId={this.state.playerId} games={this.state.games} onHostGame={this.onHostGame}/>}
                {currentView === 'Lobby' && <Lobby/>}
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

    initialiseWebSocketPlayers() {
        const WS_PLAYERS_URL: string = (process.env.REACT_APP_WS_PLAYERS_URL as string);

        const playerClient = new Client({
            brokerURL: WS_PLAYERS_URL,
            debug: function (str) {
                console.debug(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        playerClient.onConnect = () => {
            this.setState({playerClient: playerClient});

            // TODO: Change URL
            playerClient.subscribe('/players', this.onGamesReceived)
        }

        playerClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        playerClient.activate();
    }


    private onGamesReceived(message: Message) {
        const games: Game[] = JSON.parse(message.body);
        this.setState({
            games,
        });
    }

    private onPlayerReceived(message: Message) {
        const player: Player = JSON.parse(message.body);
        this.setState({
            playerId: player.id,
        });
    }
}

export default App;
