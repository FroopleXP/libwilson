import EServerAction from "../enums/EServerAction"
import IServerEvent from "../interfaces/events/ServerEvent"
import ServerNewMessageEventPayload from "../interfaces/events/payloads/server/ServerNewMessageEventPayload";
import ServerWelcomeEventPayload from "../interfaces/events/payloads/server/ServerWelcomeEventPayload"
import ServerNewConversationEventPayload from "../interfaces/events/payloads/server/ServerNewConversationEventPayload";

export type ServerWelcomeEvent = IServerEvent<ServerWelcomeEventPayload, EServerAction.WELCOME>;
export type ServerNewMessageEvent = IServerEvent<ServerNewMessageEventPayload, EServerAction.NEW_MESSAGE>;
export type ServerNewConversationEvent = IServerEvent<ServerNewConversationEventPayload, EServerAction.NEW_CONVERSATION_REQ>;

type ServerEvent = ServerWelcomeEvent | ServerNewMessageEvent | ServerNewConversationEvent;

export default ServerEvent;