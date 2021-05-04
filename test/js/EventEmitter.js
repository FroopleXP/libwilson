const MAX_LISTENERS = 15;

const EventEmitter = function () {
    this._listeners = {};
};

EventEmitter.prototype.on = function (event, cb) {
    if (!cb || typeof cb !== "function") return;
    if (!Object.keys(this._listeners).includes(event)) {
        this._listeners[event] = [];
    }
    if (Object.keys(this._listeners).length >= MAX_LISTENERS) return;
    this._listeners[event].push(cb);
}


EventEmitter.prototype.emit = function (event, data) {
    if (!Object.keys(this._listeners).includes(event)) return;
    this._listeners[event].forEach(function (_listener) {
        _listener(data);
    })
}



