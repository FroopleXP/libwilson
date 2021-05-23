import Conversation from "./Conversation";
import ConversationInviteID from "./ConversationInviteID";

interface ConversationInvite {
    id: ConversationInviteID,
    conversation: Conversation
}

export default ConversationInvite;