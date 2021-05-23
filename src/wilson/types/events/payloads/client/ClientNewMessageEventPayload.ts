import UserID from "../../../../types/common/UserID";

interface ClientNewMessageEventPayload {
    to: UserID;
    message: string
}

export default ClientNewMessageEventPayload;