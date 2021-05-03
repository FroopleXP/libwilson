import EServerAction from "../enums/EServerAction";

interface IServerEvent<T, U extends EServerAction> {
    action: U,
    payload: T
}

export default IServerEvent;