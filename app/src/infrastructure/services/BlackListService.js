import { AppError } from "../../application/errors/app-error.js";

export class BlackListService {
    constructor () {
        this.baseUrl = process.env.BLACKLIST_ULR;
    }

    async containsListedWords(text) {
        const response = await fetch(`${this.baseUrl}?texto=${text}`);

        if (!response.ok) throw new AppError("Houve um erro ao validar a enquete. tente mais tarde.", 500);

        return await response.json();
    }
}