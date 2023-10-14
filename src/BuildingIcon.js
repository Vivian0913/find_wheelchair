import React from 'react';

function BuildingIcon({ name, onBuildingClick }) {
  const handleClick = () => {
    onBuildingClick(name);
  };

  return (
    <div className="BuildingIcon" onClick={handleClick}>
      {name}
    </div>
  );
}

export default BuildingIcon;
