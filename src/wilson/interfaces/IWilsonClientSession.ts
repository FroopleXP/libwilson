import ClientEvent from "../types/ClientEvent";
import ServerEvent from "../types/ServerEvent";

declare interface IWilsonClientSession {
    on(event: "event", listener: (event: ClientEvent) => void): this;
    emit(event: "undeliverable", payload: ClientEvent): boolean;
}

interface IWilsonClientSession {
    sendEvent(event: ServerEvent): void;
}

export default IWilsonClientSession;