import React from 'react';
import Map from './Map';
import './App.css';
import './Sidebar.css';
// import Sidebar from './Sidebar';

function App() {
  return (

    <div className="App">
      <h1>Cornell WheelChair Availability</h1>

      <div className="Sidebar">
        <div className="HelpBlock">
          <span role="img" aria-label="Help Icon" className="HelpIcon">
            ❓
          </span>
        </div>
        <div className="ReserveBlock">
          <button className="ReserveButton">Reserve</button>
        </div>
      </div>
      <Map />
    </div>
  );
}

export default App;
