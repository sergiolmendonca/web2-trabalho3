import express from "express";
import { router } from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`ESCUTANDO NA PORTA ${process.env.PORT}`);
});
