import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";
import jsonStringToClientEvent from "../../mappers/jsonStringToClientEvent";
import ClientEvent from "../../types/ClientEvent";
import ServerEvent from "../../types/ServerEvent";

// TODO: Handle client disconnect so we can remove from 'connectedClients'
class WilsonClient extends EventEmitter {

    public id: string;
    public socket: WebSocket;

    constructor(socket: WebSocket) {
        super();
        this.id = uuidv4();
        this.socket = socket;
        this.socket.onmessage = this.handleOnMessage.bind(this);
        this.socket.onclose = this.handleOnClose.bind(this);
    }

    private handleOnClose(): void {
        this.emit("close", this);
    }

    private handleOnMessage(message: MessageEvent<string>): void {
        // Try to map the raw websocket message to a client event
        try {

            const clientEvent: ClientEvent = jsonStringToClientEvent(message.data);
            this.emit("event", this, clientEvent);

        } catch (err) {
            this.socket.close(1000, "Malicious activity detected, closing connection");
        }
    }

    public sendEvent(event: ServerEvent): void {
        if (this.socket.OPEN) {
            this.socket.send(JSON.stringify(event));
            return;
        }
    }

}

export default WilsonClient;