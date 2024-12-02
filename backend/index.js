const connectToMongo = require("./db");
const express = require("express");
const path = require("path");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotbook backend app listening on port ${port}`);
});
