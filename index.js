import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dataBaseConnection } from "./db/connection.js";
import { eventRouter } from "./routes/event.js";
import { userRouter } from "./routes/auth.js";

const app = express();
const port = 8300;
app.use(cors());
app.use(bodyParser.json({ limit: "3mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/user", userRouter);
dataBaseConnection();
app.listen(port, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${port}`);
});
