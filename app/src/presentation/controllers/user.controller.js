import * as jwtService from '../../infrastructure/security/jwt-service.js';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user-use-case.js';
import { UserRepository } from '../../infrastructure/repositories/user-repository.js';

const create = async (req, res) => {

    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);
    
    const retorno = await createUserUseCase.execute(req.body);

    res.status(201).json("Usuário criado com sucesso.");
}

export { 
    create
};