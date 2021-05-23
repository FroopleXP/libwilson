import UserID from "../../../../types/common/UserID";

interface ClientNewConversationInviteEventPayload {
    participants: UserID[]
}

export default ClientNewConversationInviteEventPayload;