import EServerAction from "../enums/EServerAction";
import ServerNewConversationInviteEventPayload from "./events/payloads/server/ServerNewConversationInviteEventPayload";
import ServerNewMessageEventPayload from "./events/payloads/server/ServerNewMessageEventPayload";
import ServerWelcomeEventPayload from "./events/payloads/server/ServerWelcomeEventPayload";
import IServerEvent from "./events/ServerEvent";

export type ServerWelcomeEvent = IServerEvent<ServerWelcomeEventPayload, EServerAction.WELCOME>;
export type ServerNewMessageEvent = IServerEvent<ServerNewMessageEventPayload, EServerAction.NEW_MESSAGE>;
export type ServerNewConversationInviteEvent = IServerEvent<ServerNewConversationInviteEventPayload, EServerAction.NEW_CONVERSATION_INVITE>;

type ServerEvent = ServerWelcomeEvent | ServerNewMessageEvent | ServerNewConversationInviteEvent;

export default ServerEvent;