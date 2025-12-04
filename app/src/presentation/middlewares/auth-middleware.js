import * as tokenService from '../../infrastructure/security/jwt-service.js';

const isAutenticado = (req, res, next) => {
    var token = req.headers.authorization?.split(" ")[1];

    if (tokenService.isTokenValido(token))
        next();
    else
        res.status(401).json("Não autorizado parceiro!");
};

export {
    isAutenticado
};