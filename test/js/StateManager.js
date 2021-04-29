const StateManager = function (init) {

    this._MAX_LISTENERS = 5;

    this._state = Object.assign({}, init);

    this._stateKeys = Object.keys(this._state);
    this._listeners = [];

}

StateManager.prototype.onUpdate = function (cb) {

    if (!cb || typeof cb !== "function") return;

    if (this._listeners.length >= this._MAX_LISTENERS) return;
    this._listeners.push(cb);
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

    if (!this._listeners.length) return;

    // Calling listeners
    this._listeners.forEach(function (cb) { cb(Object.freeze(this._state)); }.bind(this));

}

StateManager.prototype.get = function (key) {
    if (!this._stateKeys.includes(key)) return;
    return Object.freeze(this._state[key]);
}