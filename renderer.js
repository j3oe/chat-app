const ws = new WebSocket('ws://localhost:8080');

// --- USERNAME HANDLING ---
let username = localStorage.getItem('username');
if (!username) {
    username = prompt("Enter your chat name:");
    if (!username || username.trim() === "") username = "Guest";
    localStorage.setItem('username', username);
}

// --- DOM ELEMENTS ---
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

    ws.send(`${username}: ${text}`);
    input.value = '';
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

// Optional: clear username on app close
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('username');
});
