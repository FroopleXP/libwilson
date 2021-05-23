import EClientAction from "../../../enums/EClientAction";
import IClientEvent from "./IClientEvent";
import ClientNewConversationInviteAckEventPayload from "./payloads/client/ClientNewConversationInviteAckEventPayload";
import ClientNewConversationInviteEventPayload from "./payloads/client/ClientNewConversationInviteEventPayload";

export type ClientNewConversationInviteEvent = IClientEvent<ClientNewConversationInviteEventPayload, EClientAction.NEW_CONVERSATION_INVITE>;
export type ClientNewConversationInviteAckEvent = IClientEvent<ClientNewConversationInviteAckEventPayload, EClientAction.NEW_CONVERSATION_INVITE_ACK>;

type ClientEvent = ClientNewConversationInviteEvent | ClientNewConversationInviteAckEvent;

export default ClientEvent;