const socket = new WebSocket('ws://localhost:8080');

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to send a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        console.log('Sending message:', message); // Log the message being sent
        socket.send(message);
        messageInput.value = '';

        // Display the user's message
        displayMessage(`You: ${message}`);
    }
});

// Function to receive messages
socket.addEventListener('message', (event) => {
    event.data.text().then((message) => {
        console.log('Received message:', message); // Log the received message
        displayMessage(`AI: ${message}`);
    });
});

// Handle connection open
socket.addEventListener('open', () => {
    console.log('Connected to the WebSocket server');
});

// Handle connection close
socket.addEventListener('close', () => {
    console.log('Disconnected from the WebSocket server');
});

// Handle connection error
socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});

// Function to display a message in the chat box
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
}