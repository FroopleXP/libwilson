import WilsonClient from "../domain/entities/WilsonClient";
import IWilsonClientManager from "../interfaces/IWilsonClientManager";

class WilsonClientManager implements IWilsonClientManager {

    private clients: Map<string, WilsonClient>;

    constructor() {
        this.clients = new Map<string, WilsonClient>();
    }

    clientExists(uuid: string): boolean {
        return this.clients.has(uuid);
    }

    getClient(uuid: string): WilsonClient | undefined {
        return this.clients.get(uuid);
    }

    addClient(client: WilsonClient): void {
        this.clients.set(client.id, client);
        console.log(`New client! ${client.id} | ${this.clients.size}`)
    }

    removeClient(uuid: string): void {
        this.clients.delete(uuid);
        console.log(`Client ${uuid} has disconnected | ${this.clients.size}`)
    }

}

export default WilsonClientManager;