const StateManager = function (init) {
    this._state = Object.assign({}, init);
    this._stateKeys = Object.keys(this._state);
    this._eventEmitter = new EventEmitter();
}

StateManager.prototype.on = function (event, cb) {
    this._eventEmitter.on(event, cb);
}

StateManager.prototype.update = function (key, value) {

    // Make sure the key to update exists and the updated type is the same
    if (!this._stateKeys.includes(key) || typeof this._state[key] !== typeof value) {
        throw new Error("Key " + key + " does not exist in state");
    };

    // Take a copy of the state, update it and set the state
    const cpState = Object.assign({}, this._state);
    cpState[key] = value;
    this._state = cpState;

    // Calling listeners
    this._eventEmitter.emit("update", Object.freeze(this._state));

}

StateManager.prototype.get = function (key) {
    if (!this._stateKeys.includes(key)) return;
    return Object.freeze(this._state[key]);
}