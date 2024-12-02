const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const authController = require("../controller/authController");

//ROUTE 1: Create a User using post methos POST "/api/auth/createuser"
router.post("/createuser", authController.CreateUser);

//ROUTE 2: Authenticate a User using post methos POST "/api/auth/login"
router.post("/login", authController.LoginUser);

//ROUTE 3: Get loggedin user details POST "/api/auth/getuser"
router.post("/getuser", fetchuser, authController.GetAllUser);

module.exports = router;
