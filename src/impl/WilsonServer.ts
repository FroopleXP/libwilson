import { v4 as uuidv4 } from "uuid";
import EventEmitter from "events";
import { Server } from "ws";
import WilsonClient from "./WilsonClientSession";
import EClientAction from "../enums/EClientAction";
import EServerAction from "../enums/EServerAction";
import WilsonClientManager from "./WilsonClientSessionManager";
import IWilsonServer from "../interfaces/IWilsonServer";
import ClientEvent, { ClientNewConversationInviteEvent } from "../common/events/ClientEvent";
import ConversationInvite from "../common/ConversationInvite";
import ServerEvent from "../common/events/ServerEvent";

export interface IWilsonServerProps {
    server: Server,
    name: string
}


class WilsonServer extends EventEmitter implements IWilsonServer {

    private readonly wss: Server;
    private readonly name: string;
    private clientManager: WilsonClientManager;

    constructor(deps: IWilsonServerProps) {

        super();

        this.name = deps.name;
        this.wss = deps.server;
        this.clientManager = new WilsonClientManager();

        this.wss.on("connection", this.handleOnClientConnect.bind(this));

    }

    /*
        All client sent events are processed here.
    */
    private handleIncomingClientEvent(client: WilsonClient, event: ClientEvent): void {
        switch (event.action) {

            case EClientAction.NEW_CONVERSATION_INVITE:
                this.handleIncomingClientNewConversationInviteEvent(client, event);
                break;

            default:
                break;
        }

    }

    private handleIncomingClientNewConversationInviteEvent(client: WilsonClient, event: ClientNewConversationInviteEvent): void {

        if (!event.payload.participants) {
            throw new Error("No participants in new conversation invite request");
        }

        // Create an invite
        const newConversationInvite: ConversationInvite = {
            id: uuidv4(),
            conversation: {
                id: uuidv4(),
                participants: [...event.payload.participants, client.id]
            }
        }

        // For every participant, send the new conversation invitation
        for (let i = 0; i < event.payload.participants.length; i++) {

            const participant: string = event.payload.participants[i];

            const newConversationRequest: ServerEvent = {
                to: participant,
                action: EServerAction.NEW_CONVERSATION_INVITE,
                payload: {
                    invite: newConversationInvite
                }
            }

            this.sendEvent(newConversationRequest);

        }

    }

    // private handleIncomingClientMessageEvent(client: WilsonClient, event: ClientMessageEvent): void {

    //     /*
    //         On a message event from the client, construct a server 'NEW_MESSAGE' 
    //         event to be sent to the recipient client. Let 'sendEvent' handle the 
    //         actual sending of the event.
    //     */
    //     const serverNewMessageEvent: ServerEvent = {
    //         to: event.payload.to,
    //         action: EServerAction.NEW_MESSAGE,
    //         payload: {
    //             message: event.payload.message,
    //             from: client.id
    //         }
    //     }

    //     this.sendEvent(serverNewMessageEvent);

    // }

    private handleOnClientDisconnect(client: WilsonClient): void {

        // When a client disconnects, remove them from the connectedClients map
        // TODO: Perhaps pass a reference to the whole client obj.?
        this.clientManager.removeClient(client.id);

    }

    private handleOnClientConnect(ws: WebSocket): void {

        // On a client connect, create a new WilsonClient
        const newClient: WilsonClient = new WilsonClient(ws);
        newClient.on("event", this.handleIncomingClientEvent.bind(this));
        newClient.on("close", this.handleOnClientDisconnect.bind(this));

        this.clientManager.addClient(newClient);

        // On connect, send welcome message
        const serverWelcomeEvent: ServerEvent = {
            to: newClient.id,
            action: EServerAction.WELCOME,
            payload: {
                server_name: this.name,
                client_id: newClient.id
            }
        };

        newClient.sendEvent(serverWelcomeEvent);

        /*
            Once we've sent the welcome event, send the new client
            a message that will show in their inbox.
        */
        const welcomeMessage: ServerEvent = {
            to: newClient.id,
            action: EServerAction.NEW_MESSAGE,
            payload: {
                from: "Wilson",
                message: `
Greetings, ${newClient.id}!

Wilson is an anonymous private messaging platform. Think of WhatsApp
with UUID's instead of MSISDNs. We know nothing about you nor do we
ever want to! Messages and contacts are stored in your browser only
and it's you that personally identifies each other user - we know
nothing!

ATB,
Wilson.
               `
            }
        }

        newClient.sendEvent(welcomeMessage);

    }

    public sendEvent(event: ServerEvent): void {

        const client: WilsonClient | undefined = this.clientManager.getClient(event.to);

        if (!client) {
            this.emit("undeliverable", event);
            return;
        }

        client.sendEvent(event);

    }

}

export default WilsonServer;