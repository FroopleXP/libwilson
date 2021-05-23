import Conversation from "../interfaces/Conversation";
import IWilsonClientConversationManager from "../interfaces/IWilsonClientConversationManager";

class WilsonClientConversationManager implements IWilsonClientConversationManager {

    private conversations: Conversation[];

    constructor() {
        this.conversations = [];
    }

    addNewConversation(conversation: Conversation): void {
        this.conversations.push(conversation);
    }

    leaveConversation(conversation: Conversation): void {
        this.conversations = this.conversations.filter((_conversation) => {
            return _conversation.id !== conversation.id;
        });
    }

    isInConversation(conversation: Conversation): boolean {
        return this.conversations.includes(conversation);
    }

}

export default WilsonClientConversationManager;