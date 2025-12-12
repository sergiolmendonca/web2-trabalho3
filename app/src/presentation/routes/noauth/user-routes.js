import express from "express";
import * as userControlller from '../../controllers/user.controller.js';


const userRouter = express.Router();

// POSTS
userRouter.post("/", userControlller.create);

export { userRouter };
