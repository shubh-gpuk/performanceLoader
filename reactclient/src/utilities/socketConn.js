import io from 'socket.io-client';
let socket = io('http://127.0.0.1:9000');

socket.on('connect', () => {
    console.log(socket.id);
    socket.emit('clientType', 'uiClient#123456');
});


export default socket;
