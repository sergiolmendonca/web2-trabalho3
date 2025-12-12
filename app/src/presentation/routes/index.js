import express from 'express';
import { authRouter } from './noauth/auth-routes.js';
import { pollsRouter } from './auth/polls-router.js';
import { meRouter } from './auth/me.js';
import { userRouter } from './noauth/user-routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use("/polls", pollsRouter);
router.use("/me", meRouter);
router.use("/user", userRouter);

export { router };