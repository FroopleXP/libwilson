import { Server } from "ws";
import EClientAction from "./enums/EClientAction";
import EServerAction from "./enums/EServerAction";
import jsonStringToClientEvent from "./mappers/jsonStringToClientEvent";
import ClientEvent from "./types/ClientEvent";

export interface IWilsonServerProps {
    server: Server,
    name: string,
    uuid: string
}

class WilsonServer {

    private wss: Server;
    private name: string;
    private uuid: string;

    constructor(deps: IWilsonServerProps) {
        this.name = deps.name;
        this.uuid = deps.uuid;
        this.wss = deps.server
        this.wss.on("connection", this.handleOnClientConnect.bind(this));
    }

    private handleClientMessage(event: MessageEvent<string>): void {

        const clientEvent: ClientEvent = jsonStringToClientEvent(event.data);

        switch (clientEvent.action) {

            case EClientAction.AUTHENTICATE_USER:
                console.log(`Auth Event: Username = ${clientEvent.payload.username}, Password = ${clientEvent.payload.password}`);
                break;

            default:
                console.error(`Action ${clientEvent.action} not valid`)

        }

    }

    private handleOnClientConnect(ws: WebSocket): void {

        ws.onmessage = this.handleClientMessage;

        // On connect, send welcome message
        const serverWelcomeEvent: any = {
            action: EServerAction.WELCOME,
            payload: {
                server_name: this.name
            }
        };

        ws.send(JSON.stringify(serverWelcomeEvent));

    }

}

export default WilsonServer;