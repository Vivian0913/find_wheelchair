import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Block">
        <div className="HelpIcon">?</div>
      </div>
      <div className="Block">
        <button className="ReserveButton">Reserve</button>
      </div>
    </div>
  );
}

export default Sidebar;
