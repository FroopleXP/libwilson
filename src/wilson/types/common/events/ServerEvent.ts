import EServerAction from "../enums/EServerAction";
import ServerNewConversationInviteEventPayload from "./common/events/payloads/server/ServerNewConversationInviteEventPayload";
import ServerNewMessageEventPayload from "./common/events/payloads/server/ServerNewMessageEventPayload";
import ServerWelcomeEventPayload from "./common/events/payloads/server/ServerWelcomeEventPayload";
import IServerEvent from "./common/events/IServerEvent";

export type ServerWelcomeEvent = IServerEvent<ServerWelcomeEventPayload, EServerAction.WELCOME>;
export type ServerNewMessageEvent = IServerEvent<ServerNewMessageEventPayload, EServerAction.NEW_MESSAGE>;
export type ServerNewConversationInviteEvent = IServerEvent<ServerNewConversationInviteEventPayload, EServerAction.NEW_CONVERSATION_INVITE>;

type ServerEvent = ServerWelcomeEvent | ServerNewMessageEvent | ServerNewConversationInviteEvent;

export default ServerEvent;