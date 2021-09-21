import React from 'react';
import './SocketConnection.css';
import * as Stomp from 'stompjs';
import SockJS from "sockjs-client";
import {client, Message} from "stompjs";


interface SocketConnectionProps {
}

interface SocketConnectionState {
    connected: boolean,
    client?: Stomp.Client
}

class SocketConnection extends React.Component<SocketConnectionProps, SocketConnectionState> {

    componentWillMount() {
        this.connect();
    }

    connect () {
        let socket = new SockJS("http://localhost:8080/game");
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            this.setConnected(true, stompClient);
            let that = this;
            stompClient.subscribe('/topic/result', (messageOutput) => {
                console.log(messageOutput.body);
                that.showMessageOutput(messageOutput);
            });
        });
    }

    setConnected(b: boolean, stompClient?: Stomp.Client) {
        this.setState({client: stompClient, connected: b});
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
        var from = document.getElementById('from').value;
        // @ts-ignore
        // this.state.client.send("/games", {},
        var text = document.getElementById('text').value;
        //     JSON.stringify({'from':from, 'text':text}));
        // @ts-ignore
        this.state.client.send("/game", {}, text);
    }

    showMessageOutput = (messageOutput: Message) => {
        var response = document.getElementById('response');
        var p = document.createElement('p');
        p.style.wordWrap = 'break-word';
        console.debug("received message");

        /*p.appendChild(document.createTextNode(messageOutput.from + ": "
            + messageOutput.text + " (" + messageOutput.time + ")"));
        response.appendChild(p);*/
        p.appendChild(document.createTextNode(messageOutput.body));
        // @ts-ignore
        response.appendChild(p);
    }

    render = () => {
        return (
            <div className="SocketConnection">
                SocketConnection Component
                <input id="from" type="text" />
                <input id="text" type="text" />
                <input id="response" type="text" />
                <button id="btnSendMessage" onClick={() => this.sendMessage()}>Send Message</button>
            </div>
        );
    }

}

export default SocketConnection;
