import {Client} from "@stomp/stompjs";
import {IMessage} from "@stomp/stompjs/src/i-message";


let client: Client | undefined = undefined;

export function sendMessage(destination: string, body: string) {
    client?.publish({
        destination,
        body
    });
}

export function subscribe(destination: string, callback: (message: IMessage) => void) {
    client?.subscribe(destination, callback);
}

export function connect(url: string = 'ws://localhost:8080/socket', connectedCallback: any) {
    if (client === undefined) {

        client = new Client({
            brokerURL: url,
            debug: function (str) {
                console.debug(str);
            },
            reconnectDelay: 15000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = function (_) {
            // Do something, all subscribes must be done is this callback
            // This is needed because this will be executed after a (re)connect
            connectedCallback();
        };

        client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        client.activate();
    }
}