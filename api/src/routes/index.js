import express from "express";
import * as blacklistController from "../controllers/blacklist-controller.js";

const router = express.Router();

router.get("/", blacklistController.containsListedWords);

export { router };
