const Logger = function (caller, debug) {
    this._caller = caller.toLowerCase();
    this._debug = debug || false;
}

Logger.prototype.info = function (message) {
    if (this._debug) console.info("[" + this._caller + "] " + message);
}

Logger.prototype.error = function (message) {
    if (this._debug) console.error("[" + this._caller + "] " + message);
}