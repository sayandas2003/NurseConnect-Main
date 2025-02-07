"use client"


import React from "react";
import Link from 'next/link';

function HomePage() {
  // const handleRecruiterSignup = () => {
  //   navigateToRecruiterSignup();
  // };

  // const handleJobSeekerSignup = () => {
  //   navigateToJobSeekerSignup();
  // };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl mb-4">I'm here for Hiring</h1>
        <img src="http://localhost:3000/customer.png" alt="Recruiter" width={500} height={500} className="mb-4 " />
        <button
          // onClick={handleRecruiterSignup}
          className="bg-white text-blue-500 px-4 py-2 rounded-full mb-2"
        >
          <Link href="/RecruiterSignUp">
            SIGNUP AS RECRUITER
          </Link>
        </button>
        <p>
          Already have an account?{" "}
          <span className="text-white underline cursor-pointer">
          <Link href="/recruiterlogin">
              Login here
          </Link>
          </span>
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-300 text-white">
        <h1 className="text-3xl mb-4">I'm here Seeking Job</h1>
        <img src="http://localhost:3000/service.png" alt="Job Seeker" width={500} height={500} className="mb-4" />
        <button
          // onClick={handleJobSeekerSignup}
          className="bg-white text-blue-500 px-4 py-2 rounded-full mb-2"
        >
          <Link href="/JobSeekerSignUp">
            SIGNUP AS A JOB SEEKER
          </Link>
        </button>
        <p>
          Already have an account?{" "}
          <span className="text-white underline cursor-pointer">
            <Link href="/jobseekerlogin">
              Login here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default HomePage;