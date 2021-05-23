import Conversation from "../common/Conversation";
import ConversationInvite from "../common/ConversationInvite";
import ConversationInviteID from "../common/ConversationInviteID";

interface IWilsonClientConversationManager {
    addNewConversationInvite(conversationInvite: ConversationInvite): void;
    acceptOrRejectConversationInvite(conversationInviteId: ConversationInviteID, accept: boolean): void;
    leaveConversation(conversation: Conversation): void;
    isInConversation(conversation: Conversation): boolean;
}

export default IWilsonClientConversationManager;