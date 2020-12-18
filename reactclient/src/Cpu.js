import drawCircle from './utilities/canvasLoadAnimation';

function CPU(props) {

    const cpuCanvas = document.querySelector('.' + props.cpuData.cpuCanvasID);
    drawCircle(cpuCanvas, props.cpuData.cpuLoad_percent);

    return (
        <div className='col-sm-3 cpu'>
            <h1>CPU Load</h1>
            <div className='canvas-wrapper'>
                <canvas className={props.cpuData.cpuCanvasID} height='200' width='200'></canvas>
                <div className='cpu-text'>
                    {props.cpuData.cpuLoad_percent}%
                </div>
            </div>
        </div>
    );
}

export default CPU;