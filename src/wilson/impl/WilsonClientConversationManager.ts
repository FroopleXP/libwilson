import Logger from "../../logger/impl/Logger";
import Conversation from "../types/common/Conversation";
import IWilsonClientConversationManager from "../interfaces/IWilsonClientConversationManager";
import ConversationInviteID from "../types/common/ConversationInviteID";
import ConversationInvite from "../types/common/ConversationInvite";

class WilsonClientConversationManager implements IWilsonClientConversationManager {

    private conversations: Conversation[];
    private invitations: Map<ConversationInviteID, Conversation>;
    private logger: Logger;

    constructor() {
        this.logger = new Logger("Wilson Client Conversation Manager", process.env.NODE_ENV === "development");
        this.conversations = [];
        this.invitations = new Map<ConversationInviteID, Conversation>()
    }

    addNewConversationInvite(conversationInvite: ConversationInvite): void {
        this.invitations.set(conversationInvite.id, conversationInvite.conversation);
    }

    acceptOrRejectConversationInvite(conversationInviteId: string, accept: boolean): void {

        const conversation: Conversation | undefined = this.invitations.get(conversationInviteId);

        if (conversation) {

            // Check if we've accepted it or rejected it
            if (accept) {
                this.logger.debug(`Invite ${conversationInviteId} accepted`);
                this.conversations.push(conversation);
            }

            this.invitations.delete(conversationInviteId);
        }

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