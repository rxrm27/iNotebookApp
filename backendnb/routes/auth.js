const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

//webtokensignature - JWT authenticator- secret key
const JWT_SECRET = "jaishivshankar";

//create a user using: POST >endpoint "localhost:5000/api/auth/createuser". doesnt require authentication
//End-point 1 : create a user
router.post(
  "/createuser",
  [
    body("name", "add custom message").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password must be of 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //Express Validator: if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check user with same email or not
    try {
      let user = await User.findOne({ email: req.body.email });
      //console.log({ user }, "this is the user");
      if (user) {
        return res.status(400).json({ error: "user with same email exists" });
      }
      //Generate password and ad salt with npm package bcrypt
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //jwt token
      const data = {
        user: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(authToken); //generated-token
      res.json({ authToken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//endpoint-2 ( Authenticate a user)
//logging a user with cridentials >endpoint "localhost:5000/api/auth/login"   . doesnt require authentication
router.post(
  "/login",
  [
    //body("name", "add custom message").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //Express Validator: if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check user with same email or not
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      //console.log({ user }, "this is the user");
      if (!user) {
        return res.status(400).json({ error: "Log correct Email" });
      }
      //check password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please login with correct password" });
      }

      //jwt token
      const data = {
        user: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(authToken); //generated-token
      res.json({ authToken: authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//endpoint-3 ( Get user Details) - login Required
//logging a user with cridentials >endpoint "localhost:5000/api/auth/getuser"   .  require authentication

//middleware- it is function which is called everytime if there is any request sent to getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userID = req.user;
    console.log({userID});
    const user = await User.findById(userID).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
