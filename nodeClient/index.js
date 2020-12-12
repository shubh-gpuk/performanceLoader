//Node program to capture performance data

//Parameters to be captured :
    // CPU load
    // Memory usage -
        // free
        // total
    // OS type
    // Uptime
    // CPU info - 
        // Type
        // Number of cores
        // Clock speed

const os = require('os');
const io = require('socket.io-client');

let socket = io('http://127.0.0.1:9000');

socket.on('connect', () => {
    console.log('Connected to server.');

    //socket.emit('clientType', 'nodeClient#123456');

    //send data to the server every second
    const sendDataPerSecond = setInterval(()=> {
        performanceData().then((data) => {
            //console.log(data);
            socket.emit('performanceData', data);
        });
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(sendDataPerSecond);
    });

});


const netInterfaces = os.networkInterfaces();
//console.log(netInterfaces);
let macAddr;
for(let type in netInterfaces){
    if(!netInterfaces[type][0].internal)
        macAddr = netInterfaces[type][0].mac
        break;
}

function performanceData(){
    return new Promise(async (resolve, reject) => {
        //Free memory
        const freeMem = os.freemem();

        //Total memory
        const totalMem = os.totalmem();

        const memUsage = Math.floor((totalMem - freeMem)*100 / totalMem)/100;

        // OS type
        let OSType = os.type()
        if(OSType == 'Darwin')
            OSType = 'Mac';
        else if(OSType == 'Windows_NT')
            OSType = 'Windows';

        // Uptime
        const upTime = os.uptime();

        //CPU type
        const cpuType = os.cpus()[0]['model'];

        //CPU number of cores
        const cpuCores = os.cpus().length;

        //CPU speed
        const cpuSpeed = os.cpus()[0]['speed'];

        // CPU load
        const cpuLoad_percent = await getcpuLoad();


        //return all data
        resolve({freeMem, totalMem, memUsage, OSType, upTime, cpuType, cpuCores, cpuSpeed, cpuLoad_percent});
    });
}


//CPU load
function cpuAverage(){
    let idle_ms = 0;
    let total_ms = 0;
    const cpus = os.cpus()
    //iterate over all cores
    cpus.forEach((core) => {
        //iterate over every property in "times" object
        for(type in core.times){
            total_ms += core.times[type];
        }
        idle_ms += core.times.idle;
    });
    return {idle : idle_ms / cpus.length,
            total : total_ms / cpus.length};
}

//get CPU load after a delay of 100ms
function getcpuLoad(){
    return new Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(()=> {
            const end = cpuAverage();
            const idleDiff_ms = end.idle - start.idle;
            const totalDiff_ms = end.total - start.total;
            const cpuLoad_percent = Math.floor((totalDiff_ms - idleDiff_ms)*100 / totalDiff_ms);
            resolve(cpuLoad_percent);
        }, 100);
    });
}
