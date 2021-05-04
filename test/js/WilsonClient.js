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

    this._eventEmitter = new EventEmitter();

    this._state.on("update", function () {
        this._eventEmitter.emit("status", { status: this._state.get("socket").status });
    }.bind(this));

}

WilsonClient.prototype._onSocketStatusUpdate = function (_update) {

    // Checking the socket
    this._state.update("socket", { status: _update.status });

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

WilsonClient.prototype.on = function (event, cb) {
    this._eventEmitter.on(event, cb);
}

WilsonClient.prototype.sendMessage = function (userTo, message) {

    const event = {
        action: "NEW_MESSAGE",
        payload: {
            authentication: {
                token: "1234-5678-ABCDEF"
            },
            message: message,
            to: userTo
        }
    }

    this._socketHandler.send(JSON.stringify(event));

}

// TODO: Remove, this is just for testing...
WilsonClient.prototype.sendBadMessage = function () {

    const event = "BAD_MESSUGE";

    this._socketHandler.send(event);

}

WilsonClient.prototype.retry = function () {
    this._socketHandler.retryConnection();
}

