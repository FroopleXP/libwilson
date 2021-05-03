import InvalidClientEventException from "../exceptions/InvalidClientEventException";
import ClientEvent from "../types/ClientEvent";

export default function jsonStringToClientEvent(json: string): ClientEvent {

    try {

        const parsed: ClientEvent = JSON.parse(json);

        if (!parsed.action || !parsed.payload) {
            throw new Error("'action' or 'payload' missing from event");
        }

        return parsed;

    } catch (err) {
        throw new InvalidClientEventException(err.message);
    }

}