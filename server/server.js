const cluster = require('cluster');
const net = require('net');
const http = require('http');
const os = require('os');
const farmhash = require('farmhash');
const express = require('express');

const numCPUs = os.cpus().length;
const port = 9000;

if(cluster.isMaster){

    console.log(`Master ${process.pid} is running`);

    let workers = [];

    //spawn a worker process and store at index i
    function spawn(i){
        workers[i] = cluster.fork();

        workers[i].on('exit', (code, signal) => {
            spawn(i);
        });
    }

    for(let i = 0; i < numCPUs; i++){
        spawn(i);
    }
    //console.log(workers);

    //function to attach an IP to a worker.
    function worker_index(source_ip, len){
        return farmhash.fingerprint32(source_ip) %  len;
    }

    const server = net.createServer({pauseOnConnect:true}, (connection) => {
        let worker = workers[worker_index(connection.remoteAddress, numCPUs)];
        worker.send('sticky-session:connection', connection);
    })
    server.listen(port);
    console.log(`Master listening on ${port}`);
}
else{
    const app = express();

    //Don't expose interval express server to the outside world
    const server = app.listen(0, 'localhost');

    //Listen to message event ONLY
    process.on('message', (message, connection) => {
        if(message !== 'sticky-session:connection'){
            return;
        }

        //Emulate a connection event on the server, by sending the same connection back
        server.emit('connection', connection);

        connection.resume();

    });

    console.log(`Worker ${process.pid} is running`);
}