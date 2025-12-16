import express from "express";
import * as userControlller from '../../controllers/user.controller.js';


const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um usuário no sistema
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *           example:
 *             name: "nome de exemplo"
 *             email: "email@teste.com"
 *             password: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário criado com sucesso."
 */
userRouter.post("/", userControlller.create);

export { userRouter };
