
import EClientAction from "../../enums/EClientAction";
import ClientNewConversationInviteAckEventPayload from "./payloads/client/ClientNewConversationInviteAckEventPayload";
import ClientNewConversationInviteEventPayload from "./payloads/client/ClientNewConversationInviteEventPayload";

interface IClientEvent<T, U extends EClientAction> {
    action: U,
    payload: T
}

export type ClientNewConversationInviteEvent = IClientEvent<ClientNewConversationInviteEventPayload, EClientAction.NEW_CONVERSATION_INVITE>;
export type ClientNewConversationInviteAckEvent = IClientEvent<ClientNewConversationInviteAckEventPayload, EClientAction.NEW_CONVERSATION_INVITE_ACK>;

type ClientEvent = ClientNewConversationInviteEvent | ClientNewConversationInviteAckEvent;

export default ClientEvent;