import EServerAction from "../enums/EServerAction"
import IServerEvent from "../interfaces/events/IServerEvent"
import IServerNewMessageEventPayload from "../interfaces/events/payloads/server/IServerNewMessageEventPayload";
import IServerWelcomeEventPayload from "../interfaces/events/payloads/server/IServerWelcomeEventPayload"
import ServerNewConversationEventPayload from "../interfaces/events/payloads/server/ServerNewConversationEventPayload";

export type ServerWelcomeEvent = IServerEvent<IServerWelcomeEventPayload, EServerAction.WELCOME>;
export type ServerNewMessageEvent = IServerEvent<IServerNewMessageEventPayload, EServerAction.NEW_MESSAGE>;
export type ServerNewConversationEvent = IServerEvent<ServerNewConversationEventPayload, EServerAction.NEW_CONVERSATION_REQ>;

type ServerEvent = ServerWelcomeEvent | ServerNewMessageEvent | ServerNewConversationEvent;

export default ServerEvent;