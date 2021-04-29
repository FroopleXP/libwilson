const stateManager = new StateManager({ isAuthenticated: false, messages: [] });

// --- Wilson
const wilsonClient = new WilsonClient("ws://localhost:9000");

const statusBar = new StatusBar("app");

statusBar.setRetryCallback(function (e) {
    console.log("What?")
    e.preventDefault();
    wilsonClient.retry();
});

wilsonClient.on("status", function (_status) {
    statusBar.setStatus(_status.status);
    statusBar.render();
});




