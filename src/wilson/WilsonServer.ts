import EventEmitter from "events";
import { Server } from "ws";
import WilsonClient from "./domain/entities/WilsonClient";
import EClientAction from "./enums/EClientAction";
import EServerAction from "./enums/EServerAction";
import IClientAuthenticationEventPayload from "./interfaces/events/payloads/client/IClientAuthenticationEventPayload";
import IClientMessageEventPayload from "./interfaces/events/payloads/client/IClientMessagePayload";
import IClientRegisterEventPayload from "./interfaces/events/payloads/client/IClientRegsterEventPayload";
import ClientEvent, { ClientMessageEvent } from "./types/ClientEvent";
import ServerEvent, { ServerNewMessageEvent } from "./types/ServerEvent";

declare interface WilsonServer {

    on(event: "authenticate", listener: (client: WilsonClient, payload: IClientAuthenticationEventPayload) => void): this;
    on(event: "message", listener: (client: WilsonClient, event: IClientMessageEventPayload) => void): this;
    on(event: "register", listener: (client: WilsonClient, event: IClientRegisterEventPayload) => void): this;

    emit(event: "authenticate", client: WilsonClient, payload: IClientAuthenticationEventPayload): boolean;
    emit(event: "message", client: WilsonClient, payload: IClientMessageEventPayload): boolean;
    emit(event: "register", client: WilsonClient, payload: IClientRegisterEventPayload): boolean;

}

export interface IWilsonServerProps {
    server: Server,
    name: string
}

class WilsonServer extends EventEmitter {

    private readonly wss: Server;
    private readonly name: string;
    private connectedClients: Map<string, WilsonClient>;

    constructor(deps: IWilsonServerProps) {

        super();

        this.name = deps.name;
        this.wss = deps.server;
        this.connectedClients = new Map<string, WilsonClient>();

        this.wss.on("connection", this.handleOnClientConnect.bind(this));

    }

    private handleIncomingClientEvent(client: WilsonClient, event: ClientEvent): void {

        switch (event.action) {

            case EClientAction.AUTHENTICATE_USER:
                this.emit("authenticate", client, event.payload);
                break;

            case EClientAction.NEW_MESSAGE:
                this.handleClientMessageEvent(client, event);
                break;

            case EClientAction.REGISTER_USER:
                this.emit("register", client, event.payload);
                break;

        }

    }

    private handleClientMessageEvent(client: WilsonClient, event: ClientMessageEvent): void {

        if (client.id === event.payload.to) {
            console.log(`${client.id} are messaging themself, what a loser!`);
        } else {
            console.log(`New message from ${client.id} to ${event.payload.to}`);
        }

        /*
            Check if the user is connected to this server, if so send the message
            otherwise send the message to the listener to send the message.
        */
        const recipientClient: WilsonClient | undefined = this.connectedClients.get(event.payload.to);

        if (!recipientClient) {
            this.emit("message", client, event.payload);
            return;
        }

        const serverNewMessageEvent: ServerEvent = {
            action: EServerAction.NEW_MESSAGE,
            payload: {
                message: event.payload.message,
                from: client.id
            }
        }

        recipientClient.sendEvent(serverNewMessageEvent);

    }

    private handleOnClientDisconnect(client: WilsonClient): void {

        console.log(`Client ${client.id} has disconnected`)

        // When a client disconnects, remove them from the connectedClients map
        this.connectedClients.delete(client.id);

    }

    private handleOnClientConnect(ws: WebSocket): void {

        // On a client connect, create a new WilsonClient
        const newClient: WilsonClient = new WilsonClient(ws);
        newClient.on("event", this.handleIncomingClientEvent.bind(this));
        newClient.on("close", this.handleOnClientDisconnect.bind(this));

        this.connectedClients.set(newClient.id, newClient);

        console.log("New connection from: " + newClient.id + "\n\tTotal clients: " + this.connectedClients.size);

        // On connect, send welcome message
        const serverWelcomeEvent: ServerEvent = {
            action: EServerAction.WELCOME,
            payload: {
                server_name: this.name
            }
        };

        newClient.sendEvent(serverWelcomeEvent);

        /*
            Once we've sent the welcome event, send the new client
            a message that will show in their inbox.
        */
        const welcomeMessage: ServerEvent = {
            action: EServerAction.NEW_MESSAGE,
            payload: {
                from: "Wilson",
                message: `
Greetings!

Wilson is an anonymous private messaging platform. Think of WhatsApp
with UUID's instead of MSISDNs. We know nothing about you nor do we
ever want to! Messages and contacts are store in your browser only
and it's you that personally identifies each other user - we know
nothing!

ATB,
Wilson.
               `
            }
        }

        newClient.sendEvent(welcomeMessage);

    }

    public isConnected(id: string): boolean {
        return this.connectedClients.has(id);
    }

    public sendEventToClient(id: string, event: ServerEvent): void {

        const client: WilsonClient | undefined = this.connectedClients.get(id);

        if (!client) throw new Error("User does not exist on this server. Call 'isConnected()' to check.");

        client.sendEvent(event);

    }

}

export default WilsonServer;