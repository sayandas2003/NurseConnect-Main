

const mongoose = require('mongoose');

const JobSeekerSchema = new mongoose.Schema(
  {
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
        type: String,
        required: false,
      },
    },
    // detailsCompleted: {
    //   type: Boolean,
    //   default: false, // Initially set to false
    // },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const JobSeeker = mongoose.model('JobSeeker', JobSeekerSchema);

module.exports = JobSeeker;
