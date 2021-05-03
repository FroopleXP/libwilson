import IClientAuthenticationHeaderEventPayload from "./IClientAuthenticationHeaderPayload";

interface IClientNewMessageEventPayload {
    authentication: IClientAuthenticationHeaderEventPayload,
    message: string,
    to: string
}

export default IClientNewMessageEventPayload;