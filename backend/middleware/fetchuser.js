const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

let resArr = {
  status: 400,
  success: false,
  message: "",
  data: null,
};

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to request object
  const token = req.header("Authorization");

  if (!token) {
    resArr = {
      status: 401,
      success: false,
      message: "Please authencate using valid token",
      data: null,
    };
    res.status(401).send(resArr);
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error.message);
    resArr = {
      status: 401,
      message: "Please authencate using valid token",
      success: false,
      data: null,
    };
    return res.status(401).send(resArr);
  }
};

module.exports = fetchuser;
