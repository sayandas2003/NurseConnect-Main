"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Deciding() {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    aadharNumber: "",
    // mobileNumber: "",
    address: "",
    pincode: "",
    // dob: "",
    // currentRole: ""
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
        const response = await fetch("http://localhost:8005/api/recruiter/details", {
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
        } else {
            const errorData = await response.json();
            console.error("Error Response:", errorData);
            alert(errorData.message || "Failed to save details.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("An error occurred. Please try again.");
    }
};

 

  // Form for Work
  const WorkForm = () => (
    <form onSubmit={handleSubmit}className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
        <input
        name="aadharNumber"
        value={formData.aadharNumber}
        onChange={handleChange}
        required
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your mobile no."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your address"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">PinCode</label>
        <input
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        required

          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your pincode"
        />
      </div>
      
      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="h-screen flex flex-col">
      
      {/* Main Content Area */}
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
        

        {/* Form Section */}
        {selectedService && (
          <div className="w-1/2 p-4 bg-gray-[50]">
            <h2 className="text-xl font-semibold mb-4">Form</h2>
            {selectedService === "Customer" ? <CustomerForm /> : <WorkForm />}
          </div>
        )}
      </div>
    </div>
  );
}