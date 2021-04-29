const stateManager = new StateManager({ isAuthenticated: false, messages: [] });

// --- Status bar
const statusBarEl = document.getElementById("statusBar");
const statusBarMarqueeEl = document.getElementById("statusBar_marquee");

// --- Wilson
const wilsonClient = new WilsonClient("ws://localhost:9000");

// const retryButton = document.createElement("button");
// retryButton.innerText = "Retry";
// retryButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     wilsonClient.retryConnection();
// });

// const failedHeader = document.createElement("p");
// failedHeader.innerText = "Failed to connect ";

// failedHeader.appendChild(retryButton);

// // On change, update the display
// wilsonClient.on("status", function (_status) {

//     switch (_status.connectionStatus) {

//         case CLIENT_STATES.CONNECTED:
//             statusBarMarqueeEl.innerText = "Connected";
//             statusBarEl.style.backgroundColor = "green";
//             break;

//         case CLIENT_STATES.NOT_CONNECTED:
//             statusBarMarqueeEl.innerText = "Not Connected";
//             statusBarEl.style.backgroundColor = "yellow";
//             break;

//         case CLIENT_STATES.FAILED_TO_CONNECT:
//             statusBarEl.style.backgroundColor = "red";
//             statusBarEl.appendChild(failedHeader);
//             break;

//         case CLIENT_STATES.RETRYING_TO_CONNECT:
//             statusBarMarqueeEl.innerText = "Lost connection, retrying...";
//             statusBarEl.style.backgroundColor = "blue";
//             break;

//         case CLIENT_STATES.CONNECTING:
//             statusBarMarqueeEl.innerText = "Connecting...";
//             statusBarEl.style.backgroundColor = "blue";
//             break;
//         default:
//             statusBarMarqueeEl.innerText = "Loading...";

//     }

// });


// // --- Login screen
// function handleLoginEvent(e) {
//     e.preventDefault();
//     stateManager.update("isAuthenticated", true);
// }

// const loginScreenEl = document.getElementById("loginScreen");

// stateManager.onUpdate("isAuthenticated", function (isAuthenticated) {
//     if (isAuthenticated) {
//         loginScreenEl.hidden = true;
//     } else {
//         loginScreenEl.hidden = false;
//     }
// });

// const authForm = document.getElementById("authForm");

// authForm.addEventListener("submit", handleLoginEvent);

// // --- Chat screen
// const chatScreenEl = document.getElementById("chatScreen");

// stateManager.onUpdate("isAuthenticated", function (isAuthenticated) {
//     if (isAuthenticated) {
//         chatScreenEl.hidden = false;
//     } else {
//         chatScreenEl.hidden = true;
//     }
// });




