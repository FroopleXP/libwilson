import WilsonClientSession from "../impl/WilsonClientSession";


interface IWilsonClientSessionManager {
    addClient(client: WilsonClientSession): void;
    removeClient(uuid: string): void;
    clientExists(uuid: string): boolean;
    getClient(uuid: string): WilsonClientSession | undefined;
}

export default IWilsonClientSessionManager;