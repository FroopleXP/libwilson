import EServerAction from "../../../enums/EServerAction";

interface IServerEvent<T, U extends EServerAction> {
    to: string,
    action: U,
    payload: T
}

export default IServerEvent;