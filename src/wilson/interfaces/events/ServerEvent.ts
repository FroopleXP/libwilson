import EServerAction from "../../enums/EServerAction";

interface ServerEvent<T, U extends EServerAction> {
    to: string,
    action: U,
    payload: T
}

export default ServerEvent;