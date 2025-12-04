import express from 'express';
import * as pollsController from "../../controllers/polls-controller.js"
import { isAutenticado } from "../../middlewares/auth-middleware.js";

const pollsRouter = express.Router();

// GETS
pollsRouter.get("/:id/results", isAutenticado, pollsController.mostrarResultado);
pollsRouter.get("/:id", isAutenticado, pollsController.visualizar);
pollsRouter.get("/", isAutenticado, pollsController.listar);

//POSTS
pollsRouter.post("/:id/votes", isAutenticado, pollsController.criar);
pollsRouter.post("/:id/close", isAutenticado, pollsController.criar);
pollsRouter.post("/", isAutenticado, pollsController.criar);

//PATCHS
pollsRouter.patch("/:id/extend", isAutenticado, pollsController.estender);

export {
    pollsRouter
};