
import { UserRepository } from '../../../infrastructure/repositories/user-repository.js'
import { User } from '../../../domain/entities/user.js';
import { AppError } from '../../errors/app-error.js';

export class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {

    var user;
    try{
        user = await this.userRepository.findByEmail(email);
    } catch (err){ console.log(err); }

    if (user) throw new AppError("Já existe um usuário com este email.", 400);

    const newUser = new User({ name, email, password });

    newUser.hashPassword();

    return await this.userRepository.create(newUser);

    
  }
}