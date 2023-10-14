// Popup.js

import React from 'react';
import './App.css';

function Popup({ buildingName, wheelchairData }) {
  return (
    <div className="Popup">
      <h2>{buildingName}</h2>
      <p>Total Number of Wheelchairs: {wheelchairData.totalNum}</p>
      <p>Available Wheelchairs: {wheelchairData.available}</p>
    </div>
  );
}

export default Popup;
