import express from 'express';
import * as pollsController from "../../controllers/polls-controller.js"

const pollsRouter = express.Router();

// GETS
pollsRouter.get("/:id/results", pollsController.mostrarResultado);
pollsRouter.get("/:id", pollsController.visualizar);
pollsRouter.get("/", pollsController.listar);

//POSTS
pollsRouter.post("/:id/votes", pollsController.criar);
pollsRouter.post("/:id/close", pollsController.criar);
pollsRouter.post("/", pollsController.criar);

//PATCHS
pollsRouter.patch("/:id/extend", pollsController.estender);

export {
    pollsRouter
};