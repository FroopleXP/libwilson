const WilsonClient = function (serverUrl) {

    this._state = new StateManager({
        server: {
            url: serverUrl,
            name: ""
        },
        socket: {
            status: ""
        }
    });

    this._socketHandler = new SocketHandler(serverUrl, true);
    this._socketHandler.on("message", this._onSocketMessage.bind(this));
    this._socketHandler.on("status", this._onSocketStatusUpdate.bind(this));

    this._logger = new Logger("wilson client", true);

    // TODO: I've written this a few times, maybe port into its own package
    this._events = ["message", "error", "status"];
    this._eventListeners = [[], [], []];

    this._state.onUpdate(function () {
        this._callEventListeners("status", { status: this._state.get("socket").status });
    }.bind(this));

}

WilsonClient.prototype._onSocketStatusUpdate = function (_update) {

    // Checking the socket
    this._state.update("socket", { status: _update.status });

}

WilsonClient.prototype._callEventListeners = function (event, payload) {

    if (!this._events.includes(event)) return;
    if (!this._eventListeners[this._events.indexOf(event)].length) return;

    this._eventListeners[this._events.indexOf(event)].forEach(function (_listener) {
        _listener(payload);
    });

}

WilsonClient.prototype._onSocketMessage = function (event) {

    const parsed = JSON.parse(event.data);

    if (!parsed.action || !parsed.payload) return;

    switch (parsed.action) {
        case "WELCOME":
            this._logger.info("Welcome from server '" + parsed.payload.server_name + "'");
            break;
    }

}

WilsonClient.prototype.on = function (event, cb) {
    if (!event || !cb || typeof cb !== "function") return;
    if (!this._events.includes(event)) return;
    this._eventListeners[this._events.indexOf(event)].push(cb);
}

WilsonClient.prototype.authenticate = function (username, password) {

    const event = {
        action: "AUTHENTICATE_USER",
        payload: {
            username: username,
            password: password
        }
    };

    this._socketHandler.send(JSON.stringify(event));

}

WilsonClient.prototype.retry = function () {
    this._socketHandler.retryConnection();
}

