const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/perfData', {useNewUrlParser: true});
const Machine = require("./models/Machine");

function socketMain(io, socket){
    let macAddr = "";
    console.log("Client " + socket.id + ' connected!');

    socket.on('clientType', (key) => {
        if(key === 'nodeClient#123456'){
            socket.join('nodeClient');
        }
        else if(key === 'uiClient#123456'){
            socket.join('uiClient');
            console.log("A UI client joined");
        }
        else{
            socket.disconnect();
        }
    });
    
    socket.on('initPerformanceData', async (data) => {
        //set mac address from the received data
        macAddr = data.macAddr;

        //check if macAddr is  already is the DB
        const mongooseResponse  = await checkAndAdd(macAddr);
        console.log(mongooseResponse);
    })

    //performance data from client
    socket.on('performanceData', (data) => {
        console.log(data);
        socket.to('uiClient').emit('performanceData', data);
    })
}

function checkAndAdd(macAddr){
    return new Promise((resolve, reject) => {
        Machine.findOne({macAddr : macAddr}, 
            (err, doc) => {
                if(err){
                    throw err;
                    reject(err);
                }
                else if(doc === null){
                    //add macAddr to the DB
                    let newMachine = new Machine({macAddr: macAddr});
                    console.log('maccc');
                    console.log(macAddr);
                    console.log({macAddr});
                    newMachine.save();
                    resolve('Added');
                }
                else{
                    resolve('Found');
                }
            })
    })
}

module.exports = socketMain;