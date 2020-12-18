import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConn';
import Widget from './Widget'

function App() {

  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    
    //On getting performance data from the server, set it in react app 
    socket.on('performanceData', (data) => {
      const newData = {}
      newData[data.macAddr] = data
      setPerformanceData(previousData => {
        return {...previousData, ...newData};
      });
    });

  }, []);

  const widgets = Object.entries(performanceData).map(([key, value]) => {
    return <Widget key={key} data={value} />;
  });
  
  return (
    <div className="App">
      {widgets}
    </div>
  );
}

export default App;
