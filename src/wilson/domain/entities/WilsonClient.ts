import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";
import WilsonClientConversationManager from "../../impl/WilsonClientConversationManager";
import Conversation from "../../interfaces/Conversation";
import jsonStringToClientEvent from "../../mappers/jsonStringToClientEvent";
import ClientEvent from "../../types/ClientEvent";
import ServerEvent from "../../types/ServerEvent";

// TODO: Handle client disconnect so we can remove from 'connectedClients'
class WilsonClient extends EventEmitter {

    public id: string;
    public socket: WebSocket;
    private conversations: WilsonClientConversationManager;

    constructor(socket: WebSocket) {
        super();
        this.id = uuidv4();
        this.conversations = new WilsonClientConversationManager();
        this.socket = socket;
        this.socket.onmessage = this.handleOnMessage.bind(this);
        this.socket.onclose = this.handleOnClose.bind(this);
    }

    private handleOnClose(): void {
        this.emit("close", this);
    }

    /*
        This handles raw socket messages, not to be confused to conversation messages
    */
    private handleOnMessage(message: MessageEvent<string>): void {
        try {

            const clientEvent: ClientEvent = jsonStringToClientEvent(message.data);
            this.emit("event", this, clientEvent);

        } catch (err) {
            this.socket.close(1000, "Malicious activity detected, closing connection");
        }
    }

    public acceptConversation(conversation: Conversation): void {
        this.conversations.addNewConversation(conversation);
    }

    public sendEvent(event: ServerEvent): void {
        if (this.socket.OPEN) {
            this.socket.send(JSON.stringify(event));
            return;
        }
    }

}

export default WilsonClient;