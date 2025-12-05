import express from 'express';
import * as authControlller from "../../controllers/auth-controller.js";

const authRouter = express.Router();

// POSTS
authRouter.post("/login", authControlller.login);
authRouter.post("/cadastro", authControlller.create);

export { authRouter };