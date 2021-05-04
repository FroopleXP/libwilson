const CLIENT_STATES = {
    CONNECTING: "connecting",
    CONNECTED: "connected",
    NOT_CONNECTED: "not_connected",
    FAILED_TO_CONNECT: "failed_to_connect",
    RETRYING_TO_CONNECT: "retrying_to_connect"
}

const SocketHandler = function (serverUrl, debug) {

    // Client constants
    this._MAX_CONNECTION_RETRIES = 15;
    this._CONNECTION_RETRY_INTERVAL_MS = 5000; // 15 tries at 5 secs = 1min 15s timeout
    this._MAX_EVENT_LISTENERS = 5;

    this._serverUrl = serverUrl;
    this._logger = new Logger("SocketHandler", debug || false);
    this._activeSocket = null;
    this._connectionRetries = 0;

    this._eventEmitter = new EventEmitter();

    // Creating a state manager
    this._stateManager = new StateManager({
        status: CLIENT_STATES.NOT_CONNECTED
    });

    // When the state changes, update listeners
    this._stateManager.on("update", function (_update) {
        this._eventEmitter.emit("update", _update);
    }.bind(this));

    // Creating inital connection
    this._connect(this._serverUrl);

}

SocketHandler.prototype._getStatus = function () {
    return this._stateManager.get("status");
}

SocketHandler.prototype._setStatus = function (status) {
    this._stateManager.update("status", status);
}

SocketHandler.prototype._connect = function (serverUrl) {

    if (this._getStatus() === CLIENT_STATES.CONNECTED) {
        return;
    }

    if (this._getStatus() !== CLIENT_STATES.RETRYING_TO_CONNECT) {
        this._setStatus(CLIENT_STATES.CONNECTING);
    }

    const newSocket = new WebSocket(serverUrl);
    newSocket.onopen = this._handleSocketOnOpen.bind(this);
    newSocket.onclose = this._handleSocketOnClose.bind(this);
    newSocket.onerror = this._handleSocketOnError.bind(this);
    newSocket.onmessage = this._handleSocketOnMessage.bind(this);
    this._activeSocket = newSocket;

}

SocketHandler.prototype._handleSocketOnMessage = function (message) {
    this._eventEmitter.emit("message", message);
}

SocketHandler.prototype._handleSocketOnOpen = function () {

    this._setStatus(CLIENT_STATES.CONNECTED);
    this._connectionRetries = 0;

    this._logger.info("Connected to live services");

}

SocketHandler.prototype._handleSocketOnClose = function (e) {

    this._setStatus(CLIENT_STATES.NOT_CONNECTED);

    // If the connection was unexpected, try to reconnect
    if (!e.reason || e.code === 1006) {
        this._retryConnection();
        return;
    }

    this._logger.error("Lost connection to live services: " + e.reason);

}

SocketHandler.prototype._retryConnection = function () {

    this._connectionRetries++;

    this._setStatus(CLIENT_STATES.RETRYING_TO_CONNECT);

    if (this._connectionRetries >= this._MAX_CONNECTION_RETRIES) {
        this._setStatus(CLIENT_STATES.FAILED_TO_CONNECT);
        this._connectionRetries = 0;
        return;
    }

    this._logger.info(
        "Reconnecting to live services in " + this._CONNECTION_RETRY_INTERVAL_MS / 1000 +
        " seconds. Attempt [" + this._connectionRetries + "/" + this._MAX_CONNECTION_RETRIES + "]");

    setTimeout(function () { this._connect(this._serverUrl) }.bind(this), this._CONNECTION_RETRY_INTERVAL_MS);

}

SocketHandler.prototype._handleSocketOnError = function (e) {
    this._logger.error("Something went wrong");
}

SocketHandler.prototype.on = function (event, cb) {
    this._eventEmitter.on(event, cb);
}

SocketHandler.prototype.send = function (message) {
    if (this._getStatus() !== CLIENT_STATES.CONNECTED) return;
    this._activeSocket.send(message);
}

SocketHandler.prototype.retryConnection = function () {
    if (this._getStatus() === CLIENT_STATES.CONNECTED) return;
    this._retryConnection();
}