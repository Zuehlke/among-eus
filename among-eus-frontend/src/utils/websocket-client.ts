let ws: WebSocket | undefined = undefined;

export function sendMessage(data: string) {
    if (!ws) {
        throw new Error('No connection exists');
    }
    ws.send(data);
}

export function connect(url: string, connectedCallback: any) {
    if (ws === undefined) {
        ws = new WebSocket(url);

        ws.onopen = (event) => {
            console.info('connection opened', event);
            connectedCallback();
        };
        ws.onclose = (event) => {
            console.info('connection closed', event);
        }
        ws.onmessage = (event) => {
            console.info('message', event.data);
        }
    }
}