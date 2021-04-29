const StatusBar = function (parentId) {

    this._parent = document.getElementById(parentId);

    console.log(this._parent);

    // Container
    this._elDiv = document.createElement("div");
    this._elDiv.style.width = "100%";
    this._elDiv.style.height = "auto";
    this._elDiv.style.textAlign = "center";
    this._elDiv.style.padding = "5px";
    this._elDiv.style.backgroundColor = "grey";

    // Text display
    this._elP = document.createElement("p");
    this._elP.innerText = "Loading...";
    this._elP.style.padding = "0px";
    this._elP.style.margin = "0px";
    this._elP.style.fontWeight = "bold";

    // Retry button
    this._elButton = document.createElement("button");
    this._elButton.innerText = "Retry";
    this._elButton.style.marginLeft = "5px";
    this._elButton.setAttribute("type", "submit");

}

StatusBar.prototype.render = function (status, retryCb) {

    console.log("I've been called!");

    // Update display based on socket status
    switch (status) {

        case CLIENT_STATES.CONNECTED:
            this._elP.innerText = "Connected";
            break;

        case CLIENT_STATES.CONNECTING:
            this._elP.innerText = "Connecting...";
            break;

        case CLIENT_STATES.FAILED_TO_CONNECT:
            this._elP.innerText = "Failed to connect";
            this._elButton.addEventListener("click", retryCb);
            this._elP.appendChild(this._elButton);
            break;

        case CLIENT_STATES.NOT_CONNECTED:
            this._elP.innerText = "Not connected";
            break;

        case CLIENT_STATES.RETRYING_TO_CONNECT:
            this._elP.innerText = "Retrying connection...";
            break;

    }

    this._parent.appendChild(
        this._elDiv.appendChild(
            this._elP
        )
    )

}

