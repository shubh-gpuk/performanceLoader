const cluster = require('cluster');
const net = require('net');
const http = require('http');
const os = require('os');
const farmhash = require('farmhash');

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
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello Shubham!');
        console.log(`Worker ${process.pid} used`);
    }).listen(5000);

    console.log(`Worker ${process.pid} is running`)
}