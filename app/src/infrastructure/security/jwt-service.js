import jwt from 'jsonwebtoken';

const gerarToken = (user) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: user
    }, process.env.JWT_SECRET);
}

const isTokenValido = (token) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export {
    gerarToken,
    isTokenValido
};