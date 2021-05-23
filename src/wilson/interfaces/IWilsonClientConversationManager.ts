import Conversation from "./Conversation";

interface IWilsonClientConversationManager {
    addNewConversation(conversation: Conversation): void;
    leaveConversation(conversation: Conversation): void;
    isInConversation(conversation: Conversation): boolean;
}

export default IWilsonClientConversationManager;