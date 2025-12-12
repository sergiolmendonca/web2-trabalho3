import { AppError } from "../../application/errors/app-error.js";


export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}
