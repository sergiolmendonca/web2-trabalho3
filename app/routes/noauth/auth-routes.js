import express from 'express';
import * as authControlller from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.get("/login", authControlller.login);

export { authRouter };