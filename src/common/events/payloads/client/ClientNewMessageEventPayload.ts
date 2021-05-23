import UserID from "../../../UserID";

interface ClientNewMessageEventPayload {
    to: UserID;
    message: string
}

export default ClientNewMessageEventPayload;