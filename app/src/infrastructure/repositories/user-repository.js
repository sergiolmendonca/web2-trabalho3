import { abstractUserRepository } from "../../domain/repositories/abstract-user-repository.js";

export class userRepository extends abstractUserRepository {
    findByEmail(){
        return false;
    }
}