import {Client, IFrame} from "@stomp/stompjs";


export function createClient(url: string, errorHandler?: (frame: IFrame) => void): Client {
    const client = new Client({
        brokerURL: url,
        debug: function (str) {
            console.debug(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });


    client.onStompError = errorHandler ? errorHandler : defaultErrorHandler;

    return client;
}

const defaultErrorHandler = (frame: IFrame) => {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};