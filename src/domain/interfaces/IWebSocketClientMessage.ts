import WebSocketClientAction from "../enums/WebSocketClientAction";

export default interface IWebSocketClientMessage {
    action: WebSocketClientAction,
    payload: any
}