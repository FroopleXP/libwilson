import ServerEvent from "../types/ServerEvent";

declare interface IWilsonServer {
    on(event: "undeliverable", listener: (event: ServerEvent) => void): this;
    emit(event: "undeliverable", payload: ServerEvent): boolean;
}

interface IWilsonServer {
    sendEvent(event: ServerEvent, clientUuid: string): void;
}

export default IWilsonServer;