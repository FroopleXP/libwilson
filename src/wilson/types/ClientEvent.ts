import EClientAction from "../enums/EClientAction";
import IClientAuthenticationEventPayload from "../interfaces/events/payloads/client/IClientAuthenticationEventPayload";
import IClientEvent from "../interfaces/events/IClientEvent";
import IClientMessageEventPayload from "../interfaces/events/payloads/client/IClientMessagePayload";
import IClientRegisterEventPayload from "../interfaces/events/payloads/client/IClientRegsterEventPayload";

export type ClientAuthenticationEvent = IClientEvent<IClientAuthenticationEventPayload, EClientAction.AUTHENTICATE_USER>;
export type ClientMessageEvent = IClientEvent<IClientMessageEventPayload, EClientAction.NEW_MESSAGE>;
export type ClientRegisterEvent = IClientEvent<IClientRegisterEventPayload, EClientAction.REGISTER_USER>;

type ClientEvent = ClientAuthenticationEvent | ClientMessageEvent | ClientRegisterEvent;

export default ClientEvent;