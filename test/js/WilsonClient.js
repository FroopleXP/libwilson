const WilsonClient = function (serverUrl) {
    this._serverUrl = serverUrl;
    this._socketHandler = new SocketHandler(this._serverUrl, true);
    this._socketHandler.on("message", this._onSocketMessage.bind(this));
    this._socketHandler.on("status", this._onSocketStatus.bind(this));

    // TODO: I've written this a few times, maybe port into its own package
    this._events = ["message", "status"]
    this._eventListeners = [[], []];

}

WilsonClient.prototype._onSocketStatus = function (event) {
    console.log(event);
}

WilsonClient.prototype._onSocketMessage = function (event) {
    console.log(event);
}

WilsonClient.prototype.on = function (event, cb) {
    if (!event || !cb || typeof cb !== "function") return;
    if (!this._events.includes(event)) return;
    this._eventListeners[this._events.indexOf(event)].push(cb);
}

