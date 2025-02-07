const mongoose = require('mongoose');

const RecruiterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  details: {
    name: {
      type: String,
      required: false, // Captured on the second page
    },
    aadhaar: {
      type: String,
      required: false, // Captured on the second page
    },
    address: {
      type: String,
      required: false,
    },
    pincode: {
      type: [String], // Array of skills
      required: false,
    },
  },
  isDetailsFilled: {
    type: Boolean,
    default: false, // Initially false, updated to true once details are filled
  },
}, { timestamps: true });

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);

module.exports = Recruiter;
