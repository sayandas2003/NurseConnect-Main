"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Deciding() {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    aadharNumber: "",
      address: "",
       pincode: "",
  });
  const router = useRouter();

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every((field) => field.trim());
    if (!allFieldsFilled) {
        alert("Please fill in all the fields.");
        return;
    }
    // Get the token from cookies
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("uid="))
        ?.split("=")[1];
    try {
        const response = await fetch("http://localhost:8005/api/jobseeker/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Send token in Authorization header
            },
            credentials: "include", // Necessary to send cookies
            body: JSON.stringify(formData),
        });
        console.log("Response:", response);
        if (response.ok) {
            router.push("/map"); // Redirect on success
        } 
        else {
            const errorData = await response.json();
            console.error("Error Response:", errorData);
            alert(errorData.message || "Failed to save details.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("An error occurred. Please try again.");
    }
};
  // Updated WorkForm component to use handleSubmit and handleChange
  const WorkForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your name"
        // additional styling attributes
      />
      <input
        name="aadharNumber"
        value={formData.aadharNumber}
        onChange={handleChange}
        required
        placeholder="Enter your Aadhar no."
        // additional styling attributes
      />
       <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        placeholder="Enter your address."
        // additional styling attributes
      />
       <input
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
        placeholder="Enter your pincode."
        // additional styling attributes
      />
      {/* Additional fields for each form input... */}
      <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800">
        Submit
      </button>
    </form>
  );
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            {["Medical", "Others (inactive)"].map((service) => (
              <li
                key={service}
                className={`p-4 mb-4 bg-gray-300 rounded-lg cursor-pointer text-center ${selectedService === service ? 'bg-gray-400' : ''}`}
                onClick={() => handleServiceClick(service)}
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
        {selectedService && (
          <div className="w-1/2 p-4 bg-gray-[50]">
            <h2 className="text-xl font-semibold mb-4">Form</h2>
            <WorkForm />
          </div>
        )}
      </div>
    </div>
  );
}


   



