const path = require("path");

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const docsRoutes = require("./routes/docsRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorRoutes = require("./routes/errorRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//routes
app.use(docsRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);
app.use(errorRoutes);
//routes end

app.all("*", (req, res, next) => {
  res.status(404).json({ status: "error", message: "404! sorry not found" });
  next();
});

app.use((error, req, res, next) => {
  res.status(501).json({
    status: "error",
    message: "server error, we are working on resolving the issue",
  });
});

mongoose
  .connect(process.env.MONGO_URL_PROD)
  .then((result) => {
    console.log("database connected");

    app.listen(PORT, () => {
      console.log(`server running at ${process.env.URL}`);
    });
  })
  .catch((err) => {
    console.error("could not connect to the database");
  });
