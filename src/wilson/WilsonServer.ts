import EventEmitter from "events";
import { Server } from "ws";
import WilsonClient from "./domain/entities/WilsonClient";
import EClientAction from "./enums/EClientAction";
import EServerAction from "./enums/EServerAction";
import jsonStringToClientEvent from "./mappers/jsonStringToClientEvent";
import ClientEvent from "./types/ClientEvent";
import ServerEvent from "./types/ServerEvent";

export interface IWilsonServerProps {
    server: Server,
    name: string
}

class WilsonServer {

    private readonly wss: Server;
    private readonly name: string;
    private connectedClients: WilsonClient[];

    constructor(deps: IWilsonServerProps) {

        this.name = deps.name;
        this.wss = deps.server;
        this.connectedClients = [];

        this.wss.on("connection", this.handleOnClientConnect.bind(this));

    }

    private handleIncomingClientEvent(client: WilsonClient, event: ClientEvent): void {
        console.log(`New client event ${event.action}`);
    }

    private handleOnClientConnect(ws: WebSocket): void {

        // On a client connect, create a new WilsonClient
        const newClient: WilsonClient = new WilsonClient(ws);

        newClient.on("event", this.handleIncomingClientEvent);

        this.connectedClients.push(newClient);

        // On connect, send welcome message
        const serverWelcomeEvent: ServerEvent = {
            action: EServerAction.WELCOME,
            payload: {
                server_name: this.name
            }
        };

        newClient.sendEvent(serverWelcomeEvent);

    }

}

export default WilsonServer;