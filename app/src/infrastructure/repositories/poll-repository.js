import { abstractPollRepository } from "../../domain/repositories/abstract-poll-repository.js";

export class pollRepository extends abstractPollRepository {
    create(){
        return false;
    };

    list(){
        return false;
    };

    findById(){
        return false;
    };

    update(){
        return false;
    };
}