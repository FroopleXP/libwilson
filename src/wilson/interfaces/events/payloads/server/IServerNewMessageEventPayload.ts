// TODO: In the future, I'd like group convos. Update this to be the conversation ID instead.
interface IServerNewMessageEventPayload {
    from: string,
    message: string
}

export default IServerNewMessageEventPayload;