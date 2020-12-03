function socketMain(io, socket){
    console.log("Client " + socket.id + ' connected!');

    // socket.on('clientType', (key) => {
    //     if(key === 'nodeClient#123456'){
    //         socket.join('nodeClient');
    //     }
    //     else if(key === 'uiClient#123456'){
    //         socket.join('uiClient');
    //     }
    //     else{
    //         socket.disconnect();
    //     }
    // });

    //performance data from client
    socket.on('performanceData', (data) => {
        console.log(data);
    })
}

module.exports = socketMain;