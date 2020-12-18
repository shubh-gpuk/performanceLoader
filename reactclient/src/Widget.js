import CPU from './Cpu';
import Memory from './Memory';
import Info from './Info';
import './widget.css';

function Widget(props){

    //Destructure the 'data' object 
    const {freeMem, totalMem, memUsage, OSType, upTime, cpuType, cpuCores, cpuSpeed, cpuLoad_percent, macAddr} = props.data;
    
    const cpuCanvasID = `cpu-canvas-${macAddr}`;
    const memCanvasID = `mem-canvas-${macAddr}`;

    //Create objects and pass as props to respective components
    const cpu = {cpuLoad_percent, cpuCanvasID};
    const memory = {freeMem, totalMem, memUsage, memCanvasID};
    const info = {OSType, upTime, cpuType, cpuCores, cpuSpeed};

    return (
        <div className='widget'>
            <CPU cpuData={cpu} />
            <Memory memoryData = {memory} />
            <Info infoData = {info} />
        </div>
    );
}

export default Widget;