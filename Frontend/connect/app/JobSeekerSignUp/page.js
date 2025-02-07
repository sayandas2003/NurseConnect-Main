"use client"; // Make sure it's marked as a Client Component

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

function JobSeekerSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Send a POST request to the backend API
    const response = await fetch("http://localhost:8005/api/jobseeker/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirect to jobseeker page on success
      router.push("/jobseeker");
    } else {
      // Handle error (e.g., user already exists)
      const data = await response.json();
      alert(data.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Signup Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white text-black p-8">
        <h1 className="text-2xl font-bold mb-4">CONNECT</h1>
        <p className="mb-4">Welcome here! Let me help you sign up.</p>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-400 p-2 mb-2 w-full rounded-2xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 p-2 mb-2 w-full rounded-2xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Re-enter your password"
            className="border border-gray-400 p-2 mb-2 w-full rounded-2xl"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex mb-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Sign Up
            </button>
          </div>
        </form>

        <p className="mb-2">
          Already have an account?{" "}
          <span className="text-blue-500 underline cursor-pointer">
            <Link href="/jobseekerlogin">Login</Link>
          </span>
        </p>
      </div>

      {/* Right Section: Image and Text */}
      <div className="flex-1 flex items-center justify-center bg-blue-300 text-white">
        <h1 className="text-3xl mb-4 ml-4">I'm here Seeking Job</h1>
        <img src="http://localhost:3000/service.png" alt="Job Seeker" width={500} height={500} />
      </div>
    </div>
  );
}

export default JobSeekerSignup;

