const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/Recruiter");
const { setUser } = require("../service/auth");

async function handleRecruiterSignup(req, res) {
  const { email, password } = req.body;

  // if (password !== confirmPassword) {
  //   return res.status(400).json({ message: "Passwords do not match" });
  // }

  try {
    // Check if the user already exists
    const existingUser = await Recruiter.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists. Redirecting to login." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new recruiter with default isDetailsFilled: false
    const newRecruiter = new Recruiter({ email, password: hashedPassword, isDetailsFilled: false });
    await newRecruiter.save();

    // Create JWT token and send response
    const token = setUser(newRecruiter);
    res.cookie("uid", token, { httpOnly: true });

    res.status(201).json({ message: "Signup successful" });

} catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
}
};
  

async function handleRecruiterLogin(req, res) {
  const { email, password } = req.body;

  try {
      // Find recruiter by email
      const recruiter = await Recruiter.findOne({ email });
      if (!recruiter) {
          console.log("No recruiter found with email:", email); // Debugging log
          return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the entered password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, recruiter.password);
      if (!isPasswordMatch) {
          console.log("Password does not match"); // Debugging log
          return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create JWT token and set it in cookies
      const token = setUser({ email });
      res.cookie("uid", token, { httpOnly: true });

      // Send success response
      res.status(200).json({ 
        message: "Login successful", 
        isDetailsFilled: recruiter.isDetailsFilled // Send status to frontend
    });
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}


const updateRecruiterDetails = async (req, res) => {
    try {
        // Decode JWT token to extract user ID
        const token = req.cookies.uid;
        const decoded = jwt.verify(token, 'simple_secret'); // Replace with your JWT secret

        const userId = decoded._id;
        const { name, aadharNumber, address, pincode,} = req.body;

        // Update recruiter details and set isDetailsFilled to true
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'details.name': name,
                    'details.aadhaar': aadharNumber,
                    'details.address': address,
                    'details.pincode': pincode,
                    'isDetailsFilled': true // Mark details as filled
                },
            },
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedRecruiter) {
            return res.status(404).json({ error: 'Recruiter not found' });
        }

        res.status(200).json(updatedRecruiter);
    } catch (error) {
        console.error('Error updating recruiter:', error);
        res.status(500).json({ error: 'Failed to update recruiter details' });
    }
};


module.exports = {
    handleRecruiterSignup,
    handleRecruiterLogin,
    updateRecruiterDetails,
};
