import ServerEvent from "../types/ServerEvent";

interface IWilsonServer {
    sendEvent(event: ServerEvent, clientUuid: string): void;
}

export default IWilsonServer;