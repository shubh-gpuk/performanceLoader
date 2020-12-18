 import drawCircle from "./utilities/canvasLoadAnimation";

function Memory(props) {

    const {freeMem, totalMem, memUsage, memCanvasID} = props.memoryData;

    const memCanvas = document.querySelector('.' + memCanvasID);
    drawCircle(memCanvas, memUsage*100);

    const factor_ByteToGB = Math.pow(2, 30);
    console.log(factor_ByteToGB);
    const freeMemInGB = freeMem/factor_ByteToGB;
    const totalMemInGB = totalMem/factor_ByteToGB;

    return (
        <div className='col-sm-3 mem'>
            <h1>Memory Usage</h1>
            <div className='canvas-wrapper'>
                <canvas className={memCanvasID} height='200' width='200'></canvas>
                <div className='mem-text'>
                    {memUsage*100}%
                </div>
            </div>
            <div>
                Free Memory : {Math.floor(freeMemInGB*100)/100}GB
            </div>
            <div>
                Total Memory : {Math.floor(totalMemInGB*100)/100}GB
            </div>
        </div>
    );
}

export default Memory;