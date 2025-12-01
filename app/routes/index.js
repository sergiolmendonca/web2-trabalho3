import express from 'express';
import { authRouter } from './noauth/auth-routes.js';

const router = express.Router();

router.use('/auth', authRouter);

export { router };