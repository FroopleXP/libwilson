import IWilsonClientSessionManager from "../interfaces/IWilsonClientSessionManager";
import WilsonClientSession from "./WilsonClientSession";

class WilsonClientSessionManager implements IWilsonClientSessionManager {

    private clients: Map<string, WilsonClientSession>;

    constructor() {
        this.clients = new Map<string, WilsonClientSession>();
    }

    clientExists(uuid: string): boolean {
        return this.clients.has(uuid);
    }

    getClient(uuid: string): WilsonClientSession | undefined {
        return this.clients.get(uuid);
    }

    addClient(client: WilsonClientSession): void {
        this.clients.set(client.id, client);
        console.log(`New client! ${client.id} | ${this.clients.size}`)
    }

    removeClient(uuid: string): void {
        this.clients.delete(uuid);
        console.log(`Client ${uuid} has disconnected | ${this.clients.size}`)
    }

}

export default WilsonClientSessionManager;