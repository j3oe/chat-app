// --- WEBSOCKET SETUP ---
const ws = new WebSocket('ws://localhost:8080');

// --- USERNAME HANDLING ---
let username = localStorage.getItem('username');
if (!username) {
    username = prompt("Enter your chat name:");
    if (!username || username.trim() === "") username = "Guest";
    localStorage.setItem('username', username);
}

// Optional: show your username in chat
const messagesDiv = document.getElementById('messages');
const usernameDisplay = document.createElement('div');
usernameDisplay.textContent = `You are: ${username}`;
usernameDisplay.style.fontWeight = 'bold';
usernameDisplay.style.marginBottom = '10px';
messagesDiv.prepend(usernameDisplay);

// --- DOM ELEMENTS ---
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// --- RECEIVE MESSAGES ---
ws.onmessage = event => {
    const msg = document.createElement('div');
    msg.textContent = event.data;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// --- SEND MESSAGES ---
function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Send message with username
    ws.send(`${username}: ${text}`);

    // Show locally as "Me"
    const myMsg = document.createElement('div');
    myMsg.textContent = `Me: ${text}`;
    messagesDiv.appendChild(myMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    input.value = '';
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

// --- CLEAR USERNAME ON APP CLOSE (optional) ---
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('username');
});
