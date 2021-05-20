const stateManager = new StateManager({ isAuthenticated: false, messages: [] });

// --- Wilson
const wilsonClient = new WilsonClient("ws://localhost:9000");

const statusBar = new StatusBar("app");

const body = document.getElementById("app");

const mockAuthButton = document.createElement("button");
mockAuthButton.innerText = "Authenticate";
mockAuthButton.type = "submit";
mockAuthButton.addEventListener("click", function (e) {
    e.preventDefault();
    wilsonClient.authenticate("froople", "letmein123");
});

body.appendChild(mockAuthButton);

// -----------------
const mockBadMessageButton = document.createElement("button");
mockBadMessageButton.innerText = "Send BAD Message";
mockBadMessageButton.type = "submit";
mockBadMessageButton.addEventListener("click", function (e) {
    e.preventDefault();
    wilsonClient.sendBadMessage();
});

body.appendChild(mockBadMessageButton);

// ----- Mock messaging
const mockMessageFieldsetEl = document.createElement("fieldset");
const mockMessageLegendEl = document.createElement("legend");
const mockMessageFormEl = document.createElement("form");
const mockMessageFormMessageInputEl = document.createElement("input");
const mockMessageFormUserInputEl = document.createElement("input");
const mockMessageFormSubmitButtonEl = document.createElement("button");

mockMessageFormEl.on("submit", function (e) {
    e.preventDefault();
    wilsonClient.sendMessage(mockMessageFormUserInputEl.value, mockMessageFormMessageInputEl.value);
});

// -------

statusBar.setRetryCallback(function (e) {
    console.log("What?")
    e.preventDefault();
    wilsonClient.retry();
});

wilsonClient.on("status", function (_status) {
    statusBar.setStatus(_status.status);
    statusBar.render();
});




