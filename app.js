const express = require("express");

const { config } = require("dotenv");

const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://d505-103-225-244-6.ngrok-free.app",
    ],
  })
  // cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: `${err.message}`,
  });
});

const listener = app.listen(
  process.env.API_PORT,
  process.env.API_HOST,
  async () => {
    console.log(
      `Server is starting at ${listener.address().address}:${
        listener.address().port
      }`
    );
    try {
      await mongoose.connect(
        `mongodb+srv://raolgins:swoyambhu@mernprac1.us3h31r.mongodb.net/?retryWrites=true&w=majority&appName=mernprac1`
      );
      console.log(`Db connected`);
    } catch (error) {
      console.log(`Db failed to connect ${error.message}`);
    }
  }
);
