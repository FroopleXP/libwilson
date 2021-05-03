class InvalidClientEventException implements Error {

    name: string;
    message: string;

    constructor(_message: string) {
        this.name = "invalid_client_event";
        this.message = _message;
    }

}

export default InvalidClientEventException;