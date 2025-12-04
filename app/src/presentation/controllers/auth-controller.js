import { gerarToken } from '../../infrastructure/security/jwt-service.js';

const login = (req, res) => {
    var token = gerarToken({
        name: req.body.name,
        email: req.body.email
    });

    res.json({
        token
    });
}

export { login };