const ws = new WebSocket('ws://localhost:8080');

const messagesDiv = document.getElementById('messages');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

ws.onmessage = event => {
  const msg = document.createElement('div');
  msg.textContent = event.data;
  messagesDiv.appendChild(msg);
};

sendBtn.addEventListener('click', () => {
  if(input.value) {
    ws.send(input.value);
    const myMsg = document.createElement('div');
    myMsg.textContent = `Me: ${input.value}`;
    messagesDiv.appendChild(myMsg);
    input.value = '';
  }
});

input.addEventListener('keypress', e => {
  if(e.key === 'Enter') sendBtn.click();
});
