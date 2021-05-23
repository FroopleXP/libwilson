import EClientAction from "../enums/EClientAction";
import IClientEvent from "../interfaces/events/ClientEvent";
import ClientNewConversationPayload from "../interfaces/events/payloads/client/ClientNewConversationPayload";
import ClientMessageEventPayload from "../interfaces/events/payloads/client/ClientNewMessageEventPayload";

export type ClientMessageEvent = IClientEvent<ClientMessageEventPayload, EClientAction.NEW_MESSAGE>;
export type ClientNewConversationEvent = IClientEvent<ClientNewConversationPayload, EClientAction.NEW_CONVERSATION>;

type ClientEvent = ClientMessageEvent | ClientNewConversationEvent;

export default ClientEvent;