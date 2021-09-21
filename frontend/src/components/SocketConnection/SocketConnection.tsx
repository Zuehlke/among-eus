import React from 'react';
import './SocketConnection.css';
import * as Stomp from 'stompjs';
import SockJS from "sockjs-client";
import {client, Message} from "stompjs";


interface SocketConnectionProps {
}

interface SocketConnectionState {
    connected: boolean,
    client?: Stomp.Client,
    response: string
}

class SocketConnection extends React.Component<SocketConnectionProps, SocketConnectionState> {

    componentWillMount() {
        this.setState({connected: false, client: undefined, response: ""})
        this.connect();
    }

    connect () {
        const WS_GAMES_URL : string = (process.env.REACT_APP_WS_URL as string);
        const WS_GAMES_ENDPOINT : string = (process.env.REACT_APP_WS_GAMES_ENDPOINT as string);
        const socket = new SockJS(WS_GAMES_URL + WS_GAMES_ENDPOINT);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            this.setConnected(true, stompClient);
            stompClient.subscribe('/topic/result', this.showMessageOutput);
        });
    }

    setConnected(connected: boolean, stompClient?: Stomp.Client) {
        this.setState({client: stompClient, connected: connected});
    }

    disconnect = () => {
        if(this.state.client != null) {
            this.state.client.disconnect(() => console.debug("Disconnected"));
        }
        this.setConnected(false);
        console.log("Disconnected");
    }

    sendMessage = () => {
        // @ts-ignore
        this.state.client.send("/game", {}, text);
    }

    showMessageOutput = (messageOutput: Message) => {
        this.setState({response: messageOutput.body})
    };

    render = () => {
        return (
            <div className="SocketConnection">
                SocketConnection Component
                <input id="from" type="text" />
                <input id="text" type="text" />
                <input id="response" type="text" value={this.state.response}/>
                <button id="btnSendMessage" onClick={() => this.sendMessage()}>Send Message</button>
            </div>
        );
    }

}

export default SocketConnection;
