import express from "express";
import * as meController from '../../controllers/me-controller.js';

const meRouter = express.Router();

// GETS
meRouter.get("/polls/voted", meController.listarEnquetesVotadas);
meRouter.get("/polls/created", meController.listarEnquetesCriadas);

export {
    meRouter
};