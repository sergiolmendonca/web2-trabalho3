import { validaeAndupdateStatus } from "../controllers/polls-controller.js";

const updateStatus = async (req, res, next) => {
    await validaeAndupdateStatus(req, res);
    next();
};

export { updateStatus };