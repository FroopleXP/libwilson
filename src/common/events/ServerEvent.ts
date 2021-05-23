import ServerNewConversationInviteEventPayload from "./payloads/server/ServerNewConversationInviteEventPayload";
import ServerNewMessageEventPayload from "./payloads/server/ServerNewMessageEventPayload";
import ServerWelcomeEventPayload from "./payloads/server/ServerWelcomeEventPayload";
import EServerAction from "../../enums/EServerAction";

interface IServerEvent<T, U extends EServerAction> {
    to: string,
    action: U,
    payload: T
}

export type ServerWelcomeEvent = IServerEvent<ServerWelcomeEventPayload, EServerAction.WELCOME>;
export type ServerNewMessageEvent = IServerEvent<ServerNewMessageEventPayload, EServerAction.NEW_MESSAGE>;
export type ServerNewConversationInviteEvent = IServerEvent<ServerNewConversationInviteEventPayload, EServerAction.NEW_CONVERSATION_INVITE>;

type ServerEvent = ServerWelcomeEvent | ServerNewMessageEvent | ServerNewConversationInviteEvent;

export default ServerEvent;