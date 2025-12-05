import { UserRepository } from '../../infrastructure/repositories/user-repository.js'

export class createUserUseCase {
    create(user) {
        new UserRepository().create(user);
    }
}