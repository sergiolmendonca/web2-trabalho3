import express from "express";
import { router } from "../src/presentation/routes/index.js";
import dotenv from 'dotenv';
import { errorHandler } from "./presentation/middlewares/error-middleware.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from "../docs/swagger.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`ESCUTANDO NA PORTA ${process.env.PORT}`);
});