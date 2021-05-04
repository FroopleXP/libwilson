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

const mockMessageButton = document.createElement("button");
mockMessageButton.innerText = "Send Message";
mockMessageButton.type = "submit";
mockMessageButton.addEventListener("click", function (e) {
    e.preventDefault();
    wilsonClient.sendMessage("froople", "Hi there, are you online?");
});

body.appendChild(mockMessageButton);

const mockBadMessageButton = document.createElement("button");
mockBadMessageButton.innerText = "Send BAD Message";
mockBadMessageButton.type = "submit";
mockBadMessageButton.addEventListener("click", function (e) {
    e.preventDefault();
    wilsonClient.sendBadMessage();
});

body.appendChild(mockBadMessageButton);

statusBar.setRetryCallback(function (e) {
    console.log("What?")
    e.preventDefault();
    wilsonClient.retry();
});

wilsonClient.on("status", function (_status) {
    statusBar.setStatus(_status.status);
    statusBar.render();
});




