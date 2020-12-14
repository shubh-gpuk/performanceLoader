import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConn';
import Widget from './Widget'

function App() {

  const [performanceData, setPerformanceData] = useState({});

  console.log(performanceData);

  useEffect(() => {
    //On getting performance data from the server, set it in react app 
    socket.on('performanceData', (data) => {
      setPerformanceData(data);
    });
  }, []);

  let perfData_array = [performanceData];
  //Iterate over all array elements, create a 'Widget' for every one of them.
  //Then store the result in 'widgets' array
  const widgets = perfData_array.map((data) => {
    return <Widget key={data.macAddr} data={data} />;
  });
  console.log('widgets:');
  console.log(widgets);

  return (
    <div className="App">
      {widgets}
    </div>
  );
}

export default App;
