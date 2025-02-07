"use client";
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Custom map style to remove unwanted markers
const mapStyle = [
  {
    featureType: "poi", // Hide Points of Interest (restaurants, etc.)
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit", // Hide transit stations
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative", // Hide administrative labels
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road", // Hide road labels
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export default function GoogleMapComponent() {
  const [center, setCenter] = useState({ lat: 28.549507, lng: 77.203613 }); // Initial coordinates
  const [nurseLocations, setNurseLocations] = useState([]); // State to store nurse locations

  // Fetch coordinates for the customer
  useEffect(() => {
    const fetchCustomerCoordinates = async () => {
      try {
        const response = await fetch('/api/getCustomerCoordinates'); // Replace with your actual API endpoint
        const data = await response.json();
        setCenter({ lat: data.lat, lng: data.lng });
      } catch (error) {
        console.error("Error fetching customer coordinates:", error);
      }
    };

    // Fetch nurse locations based on pincode
    const fetchNurseLocations = async () => {
      try {
        const response = await fetch('/api/getNurseLocations'); // Replace with your actual API endpoint
        const data = await response.json();
        setNurseLocations(data); // Assuming data is an array of { lat, lng }
      } catch (error) {
        console.error("Error fetching nurse locations:", error);
      }
    };

    fetchCustomerCoordinates();
    fetchNurseLocations();
  }, []);

  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBdgpPCT941Wbg9NmltKgaDAmerPxUdM4Y">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        options={{ styles: mapStyle }}
      >
        {/* Marker for the customer */}
        <Marker position={center} />

        {/* Render multiple markers for nurses */}
        {nurseLocations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}