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

statusBar.setRetryCallback(function (e) {
    console.log("What?")
    e.preventDefault();
    wilsonClient.retry();
});

wilsonClient.on("status", function (_status) {
    statusBar.setStatus(_status.status);
    statusBar.render();
});



