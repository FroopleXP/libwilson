import EClientAction from "../../../enums/EClientAction";

interface IClientEvent<T, U extends EClientAction> {
    action: U,
    payload: T
}

export default IClientEvent;