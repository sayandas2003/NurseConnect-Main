"use client"; // Marking this file as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RecruiterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Error state to manage login errors
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // setError(null); // Reset any previous error messages

    
      // Send POST request to login
      const response = await fetch("http://localhost:8005/api/recruiter/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse response data
        localStorage.setItem("isFormFilled", data.isFormFilled);
    
        if (data.isFormFilled) {
          router.push("/map");
        } else {
          router.push("/recruiter");
        }
      } else {
        const data = await response.json();
        alert(data.message || "Login failed. Please try again.");
      }
    //  catch (err) {
    //   console.error("Login error:", err);
    //   setError("An error occurred. Please try again later.");
    // }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-blue-500 text-white p-8">
        <h1 className="text-3xl mb-4 ml-4">I'm here for Hiring</h1>
        <img
          src="/customer.png"
          alt="Recruiter"
          width={500}
          height={500}
          className="mb-4"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white text-black p-8">
        <h1 className="text-2xl font-bold mb-4">CONNECT</h1>
        <p className="mb-4">Welcome here! Let me help you.</p>

        <form onSubmit={handleLogin} className="w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email id."
            className="border border-gray-400 p-2 mb-2 w-full rounded-2xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password."
            className="border border-gray-400 p-2 mb-4 w-full rounded-2xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/RecruiterSignUp">
            <span className="text-blue-500 underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
