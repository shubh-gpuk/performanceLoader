import CPU from './Cpu';
import Memory from './Memory';
import Info from './Info';

function Widget(props){

    //Destructure the 'data' object 
    const {freeMem, totalMem, memUsage, OSType, upTime, cpuType, cpuCores, cpuSpeed, cpuLoad_percent} = props.data;
    
    //Create objects and pass as props to respective components
    const cpu = {cpuLoad_percent};
    const memory = {freeMem, totalMem, memUsage};
    const info = {OSType, upTime, cpuType, cpuCores, cpuSpeed};

    return (
        <div>
            <CPU cpuData={cpu} />
            <Memory memoryData = {memory} />
            <Info infoData = {info} />
        </div>
    );
}

export default Widget;