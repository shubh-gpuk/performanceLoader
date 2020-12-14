function Info(props) {
    return (
        <div className="col-sm-3 col-sm-offset-1 cpu-info">
          <h3>Operating System</h3>
          <div className="widget-text">{props.infoData.OSType}</div>
          <h3>Time Online</h3>
          <div className="widget-text">{props.infoData.upTime}</div>
          <h3>Processor information</h3>
          <div className="widget-text"><strong>Type:</strong> {props.infoData.cpuType}</div>
          <div className="widget-text"><strong>Number of Cores:</strong> {props.infoData.cpuCores}</div>
          <div className="widget-text"><strong>Clock Speed:</strong> {props.infoData.cpuSpeed}</div>
        </div>
    );
}

export default Info;