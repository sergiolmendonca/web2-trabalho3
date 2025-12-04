import express from "express";
import * as meController from '../../controllers/me-controller.js';
import { isAutenticado } from '../../middlewares/auth-middleware.js';

const meRouter = express.Router();

// GETS
meRouter.get("/polls/voted", isAutenticado, meController.listarEnquetesVotadas);
meRouter.get("/polls/created", isAutenticado, meController.listarEnquetesCriadas);

export {
    meRouter
};