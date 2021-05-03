import EServerAction from "../enums/EServerAction"
import IServerEvent from "../interfaces/IServerEvent"
import IServerWelcomeEventPayload from "../interfaces/IServerWelcomeEventPayload"

export type ServerWelcomeEvent = IServerEvent<IServerWelcomeEventPayload, EServerAction.WELCOME>;

type ServerEvent = ServerWelcomeEvent

export default ServerEvent;