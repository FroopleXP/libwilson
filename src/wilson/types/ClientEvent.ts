import EClientAction from "../enums/EClientAction";
import IClientEvent from "../interfaces/events/IClientEvent";
import ClientNewConversationPayload from "../interfaces/events/payloads/client/ClientNewConversationPayload";
import IClientMessageEventPayload from "../interfaces/events/payloads/client/IClientMessagePayload";

export type ClientMessageEvent = IClientEvent<IClientMessageEventPayload, EClientAction.NEW_MESSAGE>;
export type ClientNewConversationEvent = IClientEvent<ClientNewConversationPayload, EClientAction.NEW_CONVERSATION>;

type ClientEvent = ClientMessageEvent | ClientNewConversationEvent;

export default ClientEvent;