import express from "express";
import { router } from "../routes/index.js";


const app = express();

app.use("/", router);

app.listen(3000, () => {
  console.log("ESCUTANDO NA PORTA 3000");
});