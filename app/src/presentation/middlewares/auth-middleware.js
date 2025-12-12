import * as tokenService from '../../infrastructure/security/jwt-service.js';

const isAutenticado = (req, res, next) => {
    var token = req.headers.authorization?.split(" ")[1];

    try {
        const { data } = tokenService.isTokenValido(token);

        req.user = {
          id: data.id,
          name: data.name,
          email: data.email,
        };
        
        next();
    } catch(err) {
        res.status(401).json("Não autorizado parceiro!");
    }
};

export {
    isAutenticado
};