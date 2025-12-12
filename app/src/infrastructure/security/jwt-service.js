import jwt from 'jsonwebtoken';

const gerarToken = (user) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }, process.env.JWT_SECRET);
}

const isTokenValido = (token) => {
      return jwt.verify(token, process.env.JWT_SECRET);
}

export {
    gerarToken,
    isTokenValido
};