import ClientEvent from "../common/events/ClientEvent";
import ServerEvent from "../common/events/ServerEvent";


declare interface IWilsonClientSession {
    on(event: "event", listener: (event: ClientEvent) => void): this;
    emit(event: "undeliverable", payload: ClientEvent): boolean;
}

interface IWilsonClientSession {
    sendEvent(event: ServerEvent): void;
}

export default IWilsonClientSession;