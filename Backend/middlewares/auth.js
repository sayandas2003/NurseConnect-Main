// const { getUser } = require("../service/auth");

// async function restrictToLoggedinRecruiterOnly(req, res, next) {
//     // Retrieve token from cookies or Authorization header
//     const token =
//         req.cookies?.uid ||
//         req.headers['authorization']?.split(' ')[1]; // Extract Bearer token

//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     const recruiter = getUser(token); // Verify the token
//     if (!recruiter) return res.status(401).json({ message: "Unauthorized" });

//     req.recruiter = recruiter;
//     next();
// }

// module.exports = {
//     restrictToLoggedinRecruiterOnly,
// };

// const jwt = require("jsonwebtoken");
// const secret = "your_secret_key";

// async function restrictToLoggedinRecruiterOnly(req, res, next) {
//     const token = req.cookies?.uid;

//     if (!token) return res.status(401).json({ message: "You must be logged in." });

//     try {
//         const recruiter = jwt.verify(token, secret); // Verify token
//         req.recruiter = recruiter;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: "Invalid token." });
//     }
// }

// async function checkAuth(req, res, next) {                       // this things didnt force you have to logged in
//     const userUid = req.cookies?.uid;

//     const user = getUser(userUid);

//     req.user = user;
//     next();
// }

// module.exports = {
//     restrictToLoggedinRecruiterOnly,
//     checkAuth,
// };


const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {                       // this things didnt force you have to logged in
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,                                    //we have to check only you are authenticated or not
};