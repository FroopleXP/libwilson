import ConversationID from "./ConversationID";
import UserID from "./UserID";

interface Conversation {
    id: ConversationID;
    participants: UserID[];
}

export default Conversation;