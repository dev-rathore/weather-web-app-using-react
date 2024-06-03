import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from 'prop-types';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';

import './map-display.css';

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapDisplayProps {
  lat: number;
  lon: number;
  zoom: number;
  setLatLon: (lat: number, lon: number) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ lat, lon, zoom, setLatLon }) => {
  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      map.setView([lat, lon], zoom);
    }, [lat, lon, zoom, map]);

    useMapEvents({
      click: (e) => {
        setLatLon(e.latlng.lat, e.latlng.lng);
      },
    });

    return <Marker position={[lat, lon]} icon={markerIcon} />;
  };

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={zoom}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        flexGrow: 1,
        borderRadius: '4.5rem !important',
        overflow: 'hidden',
      }}>
      {/* <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      /> */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

MapDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  setLatLon: PropTypes.func.isRequired,
};

export default MapDisplay;
