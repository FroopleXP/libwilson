import ConversationInviteID from "../../../../types/common/ConversationInviteID";

interface ClientNewConversationInviteAckEventPayload {
    invite_id: ConversationInviteID
    accept: boolean;
}

export default ClientNewConversationInviteAckEventPayload;