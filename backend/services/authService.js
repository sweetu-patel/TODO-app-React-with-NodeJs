const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

class authService {
  static async GetAllUserService(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        res.status(400).send({
          status: 400,
          success: false,
          message: "",
          data: { Error: "Please try to login with correct credentials" },
        });
      }

      res.send({
        status: 200,
        message: "User Data Successfully.",
        success: true,
        data: { user },
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }

  static async CreateUserService(req, res) {
    await Promise.all([
      check("email", "Please provide a valid email").isEmail().run(req),
      check("password", "Password must be at least 6 characters long")
        .isLength({ min: 6 })
        .run(req),
    ]);
    // Collect validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: 400,
        success: false,
        message: "Validation errors",
        data: errors,
      });
    }

    try {
      // check wether user exist already
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "Sorry a user is already exist",
          data: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        salt: salt,
        password: secPassword,
        date: Date.now(),
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.status(200).send({
        status: 200,
        message: "User Created Successfully",
        success: true,
        data: { authToken },
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }

  static async LoginUser(req, res) {
    try {
      await Promise.all([
        check("email", "Enter a valid Email").isEmail().run(req),
        check("password", "Password cannot be blank")
          .trim()
          .notEmpty()
          .escape()
          .run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "Validation errors",
          data: errors.array(),
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "Please try to login with correct credentials",
          data: null,
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res.status(400).send({
          status: 400,
          success: false,
          message: "Please try to login with correct credentials",
          data: null,
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);

      return res.status(200).send({
        status: 200,
        success: true,
        message: "Login successfully",
        data: { authToken },
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).send({
        status: 500,
        message: "Some error occurred",
        success: false,
        data: null,
      });
    }
  }
}

module.exports = authService;
