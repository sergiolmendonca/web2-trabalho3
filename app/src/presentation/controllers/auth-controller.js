import { gerarToken } from '../../infrastructure/security/jwt-service.js';
import { createUserUseCase } from '../../application/use-cases/create-user-use-case.js';
import { User } from '../../domain/entities/user.js';

const login = (req, res) => {
    var token = gerarToken({
        name: req.body.name,
        email: req.body.email
    });

    res.json({
        token
    });
}

const create = (req, res) => {
  new createUserUseCase().create(new User({
    name: "sergio",
    email: "teste@teste.com",
    password: "123bolinha"
  }));

  res.json("ok");
};

export { 
    login, 
    create 
};