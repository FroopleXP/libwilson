import EClientAction from "../enums/EClientAction";
import IClientAuthenticationEventPayload from "../interfaces/IClientAuthenticationEventPayload";
import IClientEvent from "../interfaces/IClientEvent";
import IClientMessageEventPayload from "../interfaces/IClientMessagePayload";

export type ClientAuthenticationEvent = IClientEvent<IClientAuthenticationEventPayload, EClientAction.AUTHENTICATE_USER>;
export type ClientMessageEvent = IClientEvent<IClientMessageEventPayload, EClientAction.NEW_MESSAGE>;

type ClientEvent = ClientAuthenticationEvent | ClientMessageEvent

export default ClientEvent;