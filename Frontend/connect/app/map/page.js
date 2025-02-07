import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";


export default function Map(){
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl p-4 bg-gray-100 shadow-lg rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-4">Our Location</h1>
        <GoogleMapComponent />
      </div>
    </div>
  );
};


