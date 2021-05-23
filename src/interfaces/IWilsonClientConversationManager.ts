import ConversationInviteID from "../types/common/ConversationInviteID";
import Conversation from "../types/common/Conversation";
import ConversationInvite from "../types/common/ConversationInvite";

interface IWilsonClientConversationManager {
    addNewConversationInvite(conversationInvite: ConversationInvite): void;
    acceptOrRejectConversationInvite(conversationInviteId: ConversationInviteID, accept: boolean): void;
    leaveConversation(conversation: Conversation): void;
    isInConversation(conversation: Conversation): boolean;
}

export default IWilsonClientConversationManager;