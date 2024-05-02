const express = require("express");
const connectToMongo = require("./database/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { deleteUserAfterDelay } = require("./utils/deleteUnverifiedUser");

require("dotenv").config({ path: "./.env" });

connectToMongo();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = process.env.PORT;

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/predictions", require("./routes/predictions.route"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

cron.schedule("*/60 * * * *", deleteUserAfterDelay, {
  scheduled: true,
});
