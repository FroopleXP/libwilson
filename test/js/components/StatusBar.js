const StatusBar = function (parentId) {

    this._parent = document.getElementById(parentId);

    // Props
    this._props = {
        status: "",
    }

    // Container
    this._elDiv = document.createElement("div");
    this._elDiv.id = "statusBar";

    // Spinner
    this._elSpinner = document.createElement("img");
    this._elSpinner.className = "spinner";
    this._elSpinner.src = "images/small_loader.gif";

    // Text display
    this._elP = document.createElement("p");
    this._elP.innerText = "Loading...";

    // Retry link
    this._elButton = document.createElement("a");
    this._elButton.innerText = "Retry";

    // Render to parent
    this._elDiv.appendChild(this._elSpinner);
    this._elDiv.appendChild(this._elP);
    this._elDiv.appendChild(this._elButton);
    this._parent.appendChild(this._elDiv);

}

StatusBar.prototype.setRetryCallback = function (retryCallback) {
    this._elButton.addEventListener("click", retryCallback);
}

StatusBar.prototype.setStatus = function (status) {
    this._props.status = status;
}

StatusBar.prototype.render = function () {

    this._elSpinner.hidden = true;
    this._elButton.hidden = true;

    // Update display based on socket status
    switch (this._props.status) {

        case CLIENT_STATES.CONNECTED:
            this._elDiv.className = "statusConnected";
            this._elP.innerText = "Connected";
            break;

        case CLIENT_STATES.CONNECTING:
            this._elDiv.className = "statusConnecting";
            this._elP.innerText = "Connecting...";
            this._elSpinner.hidden = false;
            break;

        case CLIENT_STATES.FAILED_TO_CONNECT:
            this._elDiv.className = "statusFailedToConnect";
            this._elP.innerText = "Failed to connect.";
            this._elButton.hidden = false;
            break;

        case CLIENT_STATES.NOT_CONNECTED:
            this._elDiv.className = "statusNotConnected";
            this._elP.innerText = "Not connected";
            break;

        case CLIENT_STATES.RETRYING_TO_CONNECT:
            this._elDiv.className = "statusConnecting";
            this._elP.innerText = "Trying to connect...";
            this._elSpinner.hidden = false;
            break;

    }

}

