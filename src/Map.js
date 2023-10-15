import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import BuildingIcon from './BuildingIcon';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS


const campusCoordinates = [42.447049, -76.483492]; // Cornell Campus coordinates
const initialZoom = 16; // Initial zoom level

function Map() {
  const mapContainer = useRef(null);
  let map;
  let selectedBuilding = null; // To keep track of the selected building

  const [routeLayer, setRouteLayer] = useState(null);

  useEffect(() => {
    if (!map) {
      // Initialize the map only if it's not already initialized
      map = L.map(mapContainer.current).setView(campusCoordinates, initialZoom);

      // Add a base tile layer (you might want to use a custom map provider)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Create building icons with tooltips
      const buildings = [
        { name: 'Uris Library', coordinates: [42.4472, -76.4822], totalNum: 5, available: 2 },
        { name: 'Cornell Health', coordinates: [42.4454, -76.4855], totalNum: 3, available: 1 },
        { name: 'Rockefeller Hall', coordinates: [42.449, -76.4824], totalNum: 6, available: 2 },
        { name: 'test1', coordinates: [42.4451, -76.483], totalNum: 3, available: 1},
        { name: 'test2', coordinates: [42.4451, -76.485], totalNum: 3, available: 1},
        { name: 'test3', coordinates: [42.44624, -76.487], totalNum: 3, available: 1},
        { name: 'Lyon', coordinates: [42.4476, -76.488], totalNum: 3, available: 1},
        // Add more buildings as needed
      ];
      

      buildings.forEach(building => {
        let icon;
        if (building.name != 'test1' && building.name != 'test2' && building.name != 'test3') {
          icon = L.divIcon({
            className: 'BuildingIcon',
            iconSize: [40, 40],
            html: `<div>${building.name}</div>`,
          });
          const marker = L.marker(building.coordinates, { icon }).addTo(map);
          marker.bindTooltip(`Total: ${building.totalNum}, Available: ${building.available}`);

          marker.on('click', () => handleBuildingClick(building));
        }

        
      });
    }
  }, []);

  const handleBuildingClick = (building) => {
    if (!selectedBuilding) {
      // If no building is selected, select the clicked one
      selectedBuilding = building;
    } else {
      // If a building is already selected, draw a curved path between the two buildings
      drawCurvedPath(selectedBuilding, building);
      selectedBuilding = null;
    }
  };

  const drawCurvedPath = (startBuilding, endBuilding) => {
    // Clear the previous route layer, if any
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }


    const buildings = [
      { name: 'Uris Library', coordinates: [42.4472, -76.4822], totalNum: 5, available: 2 },
      { name: 'Cornell Health', coordinates: [42.4454, -76.4855], totalNum: 3, available: 1 },
      { name: 'Rockefeller Hall', coordinates: [42.449, -76.4824], totalNum: 6, available: 2 },
      { name: 'test1', coordinates: [42.4451, -76.483], totalNum: 3, available: 1},
      { name: 'test2', coordinates: [42.4451, -76.485], totalNum: 3, available: 1},
      { name: 'test3', coordinates: [42.44624, -76.487], totalNum: 3, available: 1},
      { name: 'Lyon', coordinates: [42.4476, -76.488], totalNum: 3, available: 1},
      // Add more buildings as needed
    ];

    const urisLibrary = buildings.find(b => b.name === 'Uris Library');
    const test1 = buildings.find(b => b.name === 'test1');
    const test2 = buildings.find(b => b.name === 'test2');
    const test3 = buildings.find(b => b.name === 'test3');
    const lyon = buildings.find(b => b.name === 'Lyon');

    // Calculate control points for a simple curved path

    const controlPoint1 = [startBuilding.coordinates[0], (startBuilding.coordinates[1] + test1.coordinates[1]) / 2];
    const controlPoint2 = [test1.coordinates[0], (startBuilding.coordinates[1] + test1.coordinates[1]) / 2];
    const controlPoint3 = [test1.coordinates[0], (test1.coordinates[1] + test2.coordinates[1]) / 2];
    const controlPoint4 = [test2.coordinates[0], (test1.coordinates[1] + test2.coordinates[1]) / 2];
    const controlPoint5 = [test2.coordinates[0], (test2.coordinates[1] + test3.coordinates[1]) / 2];
    const controlPoint6 = [test3.coordinates[0], (test2.coordinates[1] + test3.coordinates[1]) / 2];
    const controlPoint7 = [test3.coordinates[0], (test3.coordinates[1] + endBuilding.coordinates[1]) / 2];
    const controlPoint8 = [endBuilding.coordinates[0], (test3.coordinates[1] + endBuilding.coordinates[1]) / 2];
    // Create a path with a simple curve between the two buildings
    const path = L.polyline(
      [startBuilding.coordinates, controlPoint1, controlPoint2, controlPoint3, controlPoint4, controlPoint5, controlPoint6, controlPoint7, controlPoint8, endBuilding.coordinates],
      { color: 'blue' }
    ).addTo(map);

    setRouteLayer(path);
  };


  return <div ref={mapContainer} className="Map" />;
}

export default Map;


