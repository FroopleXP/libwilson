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
    }

    removeClient(uuid: string): void {
        // TODO: It may be faster to just run the delete but an error may be thrown
        if (uuid in this.clients) {
            this.clients.delete(uuid);
        }
    }

}

export default WilsonClientManager;