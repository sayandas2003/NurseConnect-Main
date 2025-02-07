const express = require("express");
const { handleRecruiterSignup, handleRecruiterLogin, updateRecruiterDetails} = require("../controllers/recruiterController");

const router = express.Router();

router.post("/signup", handleRecruiterSignup);
router.post("/login", handleRecruiterLogin);
router.post("/details", updateRecruiterDetails);

module.exports = router;

