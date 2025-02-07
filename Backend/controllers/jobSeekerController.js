const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/Seeker");
const { setUser } = require("../service/auth");
const {getUser} = require("../service/auth");

// JobSeeker Signup Controller
const jobSeekerSignUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await JobSeeker.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists. Redirecting to login." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new job seeker in the database with hashed password
        const newJobSeeker = new JobSeeker({ email, password: hashedPassword });
        await newJobSeeker.save();

        // Create JWT token and send response
        const token = setUser(newJobSeeker);
        res.cookie("uid", token, { httpOnly: true });
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// JobSeeker Login Controller
const jobSeekerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for existing user
        const jobSeeker = await JobSeeker.findOne({ email });
        if (!jobSeeker) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare hashed password
        const isPasswordMatch = await bcrypt.compare(password, jobSeeker.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token and send response
        const token = setUser(jobSeeker);
        res.cookie("uid", token, { httpOnly: true, secure: false, sameSite: 'lax', });
        res.status(200).json({ message: "Login successful",
          additionalDetailsCompleted: jobSeeker.additionalDetailsCompleted,
          // Include user details to use on frontend if necessary
          user: {
              email: jobSeeker.email,
              name: jobSeeker.details?.name || "",
              aadharNumber: jobSeeker.details?.aadhaar || "",
              address: jobSeeker.details?.address || "",
              pincode: jobSeeker.details?.pincode || "",
          }
        });
        // console.log("Received Cookies:", req.cookies);

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// // Assuming getUser decodes JWT from cookies
// const updateJobSeekerDetails = async (req, res) => {
//     console.log("Request Cookies:", req.cookies); // Debug cookies
//     console.log("Request Body:", req.body); // Debug request data
    
//     try {
//         const token = req.cookies.uid;
//         if (!token) {
//             console.error("No token found in cookies");
//             return res.status(401).json({ message: "Unauthorized" });
//         }
        
//         const userData = getUser(token);
//         console.log("Decoded User Data:", userData);
//         if (!userData) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }
        
//         const updatedJobSeeker = await JobSeeker.findOneAndUpdate(
//             { email: userData.email },                                                       
//             { ...req.body },
//             { new: true }
//         );
//         console.log("Updated Job Seeker:", updatedJobSeeker);
//         if (!updatedJobSeeker) {
//             return res.status(404).json({ message: "Job seeker not found" });
//         }
//         res.status(200).json({ message: "Details updated successfully" });
//     } catch (error) {
//         console.error("Error updating job seeker details:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
//   };


async function updateJobSeekerDetails(req, res) {
  try {
    // Decode JWT token to extract user ID
    const token = req.cookies.uid;
    const decoded = jwt.verify(token, 'simple_secret'); // Replace with your JWT secret

    const userId = decoded._id;
    const { name, aadharNumber,address,pincode } = req.body;

    // Ensure the details object is properly structured in the update
    const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
      userId,
      {
        $set: {
          'details.name': name,
          'details.aadhaar': aadharNumber,
          'details.address': address,
          'details.pincode': pincode,
          'additionalDetailsCompleted':true,
        },
      },
      { new: true, runValidators: true } // Returns the updated document
    );

    if (!updatedJobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }

    res.status(200).json(updatedJobSeeker);
  } catch (error) {
    console.error('Error updating job seeker:', error);
    res.status(500).json({ error: 'Failed to update job seeker details' });
  }
}

module.exports = { updateJobSeekerDetails };
  

// // Controller to handle second-page form submission
// const updateJobSeekerDetails = async (req, res) => {
//   const { email, name, aadhaar, phone, address, skills, experience } = req.body;

//   try {
//     // Find the user by email and update their details
//     const updatedSeeker = await JobSeeker.findOneAndUpdate(
//       { email }, // Match user by email
//       {
//         $set: {
//           'details.name': name,
//           'details.aadhaar': aadhaar,
//           'details.phone': phone,
//           'details.address': address,
//           'details.skills': skills,
//           'details.experience': experience,
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedSeeker) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'Details updated successfully', seeker: updatedSeeker });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating details', error });
//   }
// };

// module.exports = { updateJobSeekerDetails };


module.exports = {
    jobSeekerSignUp,
    jobSeekerLogin,
    updateJobSeekerDetails,
};
