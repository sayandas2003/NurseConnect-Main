// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cookieParser = require("cookie-parser");
// // const jobseekerRoutes = require("./routes/jobseekerRoutes");
// // const recruiterRoutes = require("./routes/recruiterRoutes");
// // const cors = require('cors');


// // const app = express();
// // const PORT = 8005;

// // // Allow requests from all origins (or specify your frontend URL)
// // app.use(cors());

// // // MongoDB connection
// // mongoose.connect("mongodb://localhost:27017/recruiter", { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log("MongoDB connected"))
// //     .catch(err => console.error("MongoDB connection failed:", err));

// // // Middleware
// // app.use(express.json());
// // app.use(cookieParser());

// // // Routes
// // app.use("/api/jobseeker", jobseekerRoutes);
// // app.use("/api/recruiter", recruiterRoutes);
// // app.use("/api/user-details", jobseekerRoutes)

// // // Start server
// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jobseekerRoutes = require("./routes/jobseekerRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");

const app = express();
const PORT = 8005;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/recruiter", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent across origins
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/jobseeker", jobseekerRoutes);
app.use("/api/recruiter", recruiterRoutes);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

