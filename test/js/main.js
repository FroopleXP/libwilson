const stateManager = new StateManager({ isAuthenticated: false, messages: [] });

// --- Wilson
const wilsonClient = new WilsonClient("ws://localhost:9000");

const statusBar = new StatusBar("app");

function handleRetryButtonClick(e) {
    e.preventDefault();
    wilsonClient.retry();
}

wilsonClient.on("status", function (_status) {
    statusBar.render(_status.status, handleRetryButtonClick);
});




