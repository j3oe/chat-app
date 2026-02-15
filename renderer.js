// --- WEBSOCKET SETUP ---
const ws = new WebSocket('ws://localhost:8080');

// --- USERNAME HANDLING ---
let username = localStorage.getItem('username');
if (!username) {
    username = prompt("Enter your chat name:");
    if (!username || username.trim() === "") username = "Guest";
    localStorage.setItem('username', username);
}

// --- ELEMENTS ---
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// --- SHOW USERNAME ---
const usernameDisplay = document.createElement('div');
usernameDisplay.textContent = `You are: ${username}`;
usernameDisplay.style.fontWeight = 'bold';
usernameDisplay.style.marginBottom = '10px';
messagesDiv.prepend(usernameDisplay);

// --- RECEIVE MESSAGES ---
ws.onmessage = event => {
    const msg = document.createElement('div');
    msg.textContent = event.data; // Already includes username
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// --- SEND MESSAGES ---
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Send with username
    ws.send(`${username}: ${text}`);
    input.value = '';
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

// --- OPTIONAL: CLEAR USERNAME ON APP CLOSE ---
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('username');
});
