import EServerAction from "../enums/EServerAction"
import IServerEvent from "../interfaces/IServerEvent"
import IServerNewMessageEventPayload from "../interfaces/events/payloads/server/IServerNewMessageEventPayload";
import IServerWelcomeEventPayload from "../interfaces/events/payloads/server/IServerWelcomeEventPayload"

export type ServerWelcomeEvent = IServerEvent<IServerWelcomeEventPayload, EServerAction.WELCOME>;
export type ServerNewMessageEvent = IServerEvent<IServerNewMessageEventPayload, EServerAction.NEW_MESSAGE>;

type ServerEvent = ServerWelcomeEvent | ServerNewMessageEvent;

export default ServerEvent;