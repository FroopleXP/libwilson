import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";
import EClientAction from "../enums/EClientAction";
import EServerAction from "../enums/EServerAction";
import WilsonClientConversationManager from "./WilsonClientConversationManager";
import jsonStringToClientEvent from "../mappers/jsonStringToClientEvent";
import ClientEvent, { ClientNewConversationInviteAckEvent } from "../types/common/events/ClientEvent";
import ConversationInviteID from "../types/common/ConversationInviteID";
import ServerEvent, { ServerNewConversationInviteEvent } from "../types/common/events/ServerEvent";
import IWilsonClientSession from "../interfaces/IWilsonClientSession";
import ConversationInvite from "../types/common/ConversationInvite";

class WilsonClientSession extends EventEmitter implements IWilsonClientSession {

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

            switch (clientEvent.action) {

                case EClientAction.NEW_CONVERSATION_INVITE_ACK:
                    this.handleIncomingNewConversationInviteAckEvent(clientEvent);
                    break;

                default:
                    this.emit("event", this, clientEvent);
                    break;
            }

        } catch (err) {
            this.socket.close(1000, "Malicious activity detected, closing connection");
        }
    }

    private handleIncomingNewConversationInviteAckEvent(event: ClientNewConversationInviteAckEvent): void {

        const inviteId: ConversationInviteID = event.payload.invite_id;
        const isAccept: boolean = event.payload.accept;

        this.conversations.acceptOrRejectConversationInvite(inviteId, isAccept);

    }

    // TODO: This is essentially middleware, could we handle middleware differently?
    private handleIncomingNewConversationInviteEvent(event: ServerNewConversationInviteEvent): ServerEvent {
        const conversationInvite: ConversationInvite = event.payload.invite;
        this.conversations.addNewConversationInvite(conversationInvite);
        return event;
    }

    private handleIncomingServerEvents(event: ServerEvent): ServerEvent | undefined {

        switch (event.action) {

            case EServerAction.NEW_CONVERSATION_INVITE:
                return this.handleIncomingNewConversationInviteEvent(event);

            default:
                return event;

        }

    }

    public sendEvent(event: ServerEvent): void {

        const forwardServerEvent: ServerEvent | undefined = this.handleIncomingServerEvents(event);

        if (forwardServerEvent) {
            if (this.socket.OPEN) {
                this.socket.send(JSON.stringify(forwardServerEvent));
                return;
            }
        }

    }

}

export default WilsonClientSession;