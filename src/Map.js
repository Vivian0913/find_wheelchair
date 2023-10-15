import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import BuildingIcon from './BuildingIcon';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const campusCoordinates = [42.447049, -76.483492]; // Cornell Campus coordinates
const initialZoom = 16; // Initial zoom level

function Map() {
  const mapContainer = useRef(null);
  let map;

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
        { name: 'Uris Library', coordinates: [42.447, -76.482], totalNum: 5, available: 2 },
        { name: 'Cornell Health', coordinates: [42.445, -76.482], totalNum: 3, available: 1 },
        { name: 'Carpenter Library', coordinates: [42.448, -76.483], totalNum: 4, available: 3 },
        { name: 'Willard Straight Hall', coordinates: [42.449, -76.482], totalNum: 6, available: 2 },
        // Add more buildings as needed
      ];

      buildings.forEach(building => {
        const icon = L.divIcon({
          className: 'BuildingIcon',
          iconSize: [40, 40],
          html: `<div>${building.name}</div>`,
        });

        const marker = L.marker(building.coordinates, { icon }).addTo(map);
        marker.bindTooltip(`Total: ${building.totalNum}, Available: ${building.available}`).openTooltip();
      });
    }
  }, []);

  return <div ref={mapContainer} className="Map" />;
}

export default Map;
