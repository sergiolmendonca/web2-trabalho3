import { AbstractPollRepository } from "../../domain/repositories/abstract-poll-repository.js";

export class PollRepository extends AbstractPollRepository {
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