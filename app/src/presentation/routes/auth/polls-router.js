import express from 'express';
import * as pollsController from "../../controllers/polls-controller.js"
import { isAutenticado } from "../../middlewares/auth-middleware.js";
import { updateStatus } from '../../middlewares/poll-middleware.js';

const pollsRouter = express.Router();

// GETS
pollsRouter.get("/:id/results", isAutenticado, updateStatus, pollsController.mostrarResultado);
pollsRouter.get("/:id", isAutenticado, updateStatus, pollsController.visualizar);
pollsRouter.get("/", isAutenticado, pollsController.listar);

//POSTS
pollsRouter.post("/:id/votes", isAutenticado, updateStatus, pollsController.votar);
pollsRouter.post("/:id/close", isAutenticado, updateStatus, pollsController.encerrar);
pollsRouter.post("/", isAutenticado, pollsController.criar);

//PATCHS
pollsRouter.patch("/:id/extend", isAutenticado, updateStatus, pollsController.estender);

export {
    pollsRouter
};