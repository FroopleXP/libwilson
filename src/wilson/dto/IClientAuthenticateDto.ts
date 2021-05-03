interface IClientAuthenticateDto {
    action: string,
    payload: {
        username: string,
        password: string
    }
}

export default IClientAuthenticateDto;