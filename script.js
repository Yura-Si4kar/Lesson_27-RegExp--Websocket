const SOCKET_URL = 'wss://fep-app.herokuapp.com';
const inputName = document.querySelector('.name');
const inputMesssage = document.querySelector('.message');
const sendBtn = document.querySelector('.send_btn');
const messageContainer = document.querySelector('.message_box');
let socket;

sendBtn.addEventListener('click', onSendMessage);

initConnection();

function onSendMessage() {
    sendMessage();
    cleanMessageInput();
}

function initConnection() {
    socket = new WebSocket(SOCKET_URL);
    socket.onmessage = onMessage;

    socket.onclose = () => {
        initConnection();
    };
    
    socket.onerror = () => {
        initConnection();
    };
}

function onMessage({ data }) {
    const {
        payload: { author, message },

    } = JSON.parse(data);

    messageContainer.insertAdjacentHTML(
        'beforeend',
        `<div class="message_elements">${author}: ${message}</div>`
    );
}

function sendMessage() {
    const mes = {
        action: 'message',
        payload: {
            author:getAuthorName(),
            message:getMessage(),
        },
    };

    socket.send(JSON.stringify(mes));
}

function getAuthorName() {
    return inputName.value;
}

function getMessage() {
    return inputMesssage.value;
}

function cleanMessageInput() {
    inputMesssage.value = '';
}