import WilsonClient from "../domain/entities/WilsonClient";

interface IWilsonClientManager {
    addClient(client: WilsonClient): void;
    removeClient(uuid: string): void;
    clientExists(uuid: string): boolean;
    getClient(uuid: string): WilsonClient | undefined;
}

export default IWilsonClientManager;