import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConn';

function App() {

  const [performanceData, setPerformanceData] = useState({});

  console.log(performanceData);

  useEffect(() => {
    //On getting performance data from the server, set it in react app 
    socket.on('performanceData', (data) => {
      setPerformanceData(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello Shubham</h1>
    </div>
  );
}

export default App;
