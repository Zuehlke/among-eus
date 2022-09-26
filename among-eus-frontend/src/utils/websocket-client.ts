import {Stomp} from "@stomp/stompjs";
import { Client, Message } from '@stomp/stompjs';


let ws: WebSocket | undefined = undefined;

export function sendMessage(data: string) {
    if (!ws) {
        throw new Error('No connection exists');
    }
    ws.send(data);
}

export function connect(url: string, connectedCallback: any) {
    if (ws === undefined) {

        const client = new Client({
            brokerURL: 'wss://among-eus-core.azurewebsites.net/socket',
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 15000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = function (frame) {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            console.info('we are connected', frame);
        };

        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        client.activate();
    }
}