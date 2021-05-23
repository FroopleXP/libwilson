import ConversationInviteID from "../../../ConversationInviteID";

interface ClientNewConversationInviteAckEventPayload {
    invite_id: ConversationInviteID
    accept: boolean;
}

export default ClientNewConversationInviteAckEventPayload;