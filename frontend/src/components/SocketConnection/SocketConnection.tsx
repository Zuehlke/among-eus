import React from 'react';
import './SocketConnection.css';
import {Client, Message} from "@stomp/stompjs";


interface SocketConnectionProps {
}

interface SocketConnectionState {
    connected: boolean,
    response: string
}

class SocketConnection extends React.Component<SocketConnectionProps, SocketConnectionState> {

    private client?: Client;


    constructor(props: SocketConnectionProps) {
        super(props);
        this.state = {
            connected: false,
            response: ''
        };
    }

    componentDidMount() {
        this.setState({connected: false, response: ""})
        this.connect();
    }

    connect() {
        const that = this;
        //const WS_GAMES_URL: string = (process.env.REACT_APP_WS_URL as string);
        //const WS_GAMES_ENDPOINT: string = (process.env.REACT_APP_WS_GAMES_ENDPOINT as string);

        this.client = new Client({
            brokerURL: 'ws://among-eus-games-dev.us-east-2.elasticbeanstalk.com/game',
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = () => {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            //this.setConnected(true, stompClient);
            this.setState({connected: true});
            this.client?.subscribe('/topic/result', that.showMessageOutput);
        };

        this.client.onStompError = function (frame) {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.client.activate();

    }

    componentWillUnmount() {
        this.client?.deactivate();
    }

    private sendMessage() {
        this.client?.publish({
            destination: '/game',
            body: ''
        });
    }

    showMessageOutput = (messageOutput: Message) => {
        this.setState({response: messageOutput.body})
    };

    render() {
        return (
            <div className="SocketConnection">
                SocketConnection Component
                <input id="from" type="text"/>
                <input id="text" type="text"/>
                <input id="response" type="text" defaultValue={this.state.response}/>
                <button id="btnSendMessage" onClick={() => this.sendMessage()}>Send Message</button>
            </div>
        );
    }

}

export default SocketConnection;
