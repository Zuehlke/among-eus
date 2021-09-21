import './App.css';
import ChooseName from "./components/ChooseName/ChooseName";
import Lobby from "./components/Lobby/Lobby";
import ChooseGame from "./components/ChooseGame/ChooseGame";
import CreateTasks from "./components/CreateTasks/CreateTasks";
import React from "react";
import SocketConnection from "./components/SocketConnection/SocketConnection";
import {Client, Message} from "@stomp/stompjs";

class App extends React.Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            currentView: 'ChooseName',
            client: undefined,
        };
        this.onNameChosen = this.onNameChosen.bind(this);
        this.onHostGame = this.onHostGame.bind(this);
    }

    render() {
        const currentView = this.state.currentView;
        return (
            <div>
                {currentView === 'ChooseName' && <ChooseName onNameChosen={this.onNameChosen}/>}
                {currentView === 'ChooseGame' && <ChooseGame onHostGame={this.onHostGame}/>}
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
        this.initialiseWebSocket();
    }

    onHostGame() {
        console.log('onHostGame');
        const client: Client = this.state.client;
        client.publish({
            destination: '/create',
            body: JSON.stringify({
                name: this.state.playerName + "'s Game",
                ownerId: 42,
            }),
        });
    }

    componentDidMount() {
    }

    initialiseWebSocket() {
        const WS_GAMES_URL: string = (process.env.REACT_APP_WS_URL as string);
        const WS_GAMES_ENDPOINT: string = (process.env.REACT_APP_WS_GAMES_ENDPOINT as string);

        const client = new Client({
            brokerURL: WS_GAMES_URL + WS_GAMES_ENDPOINT,
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('connected');
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
        console.log(message.body);
    }
}

export default App;
