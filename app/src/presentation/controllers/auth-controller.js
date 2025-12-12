import * as jwtService from '../../infrastructure/security/jwt-service.js';
import { LoginUseCase } from '../../application/use-cases/login-use-case.js';
import { UserRepository } from '../../infrastructure/repositories/user-repository.js';

const login = async (req, res) => {

  const password = req.body.password;
  const email = req.body.email;

  if (!email || !password) return res.status(401).json({ mensagem: "Campos email e password são obrigatórios."});
  
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository, jwtService);
    const retorno = await loginUseCase.execute({ email, password });

    res.status(200).json(retorno);
}

export { 
    login
};