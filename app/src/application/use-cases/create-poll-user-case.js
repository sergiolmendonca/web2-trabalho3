import { AppError } from "../errors/app-error.js";

export class CreatePollUseCase {

    constructor (pollRepository, blacklistService) {
        this.pollRepository = pollRepository;
        this.blacklistService = blacklistService;
    }

    async execute(poll) {
        var blacklistResult = await this.blacklistService.containsListedWords(poll.title);

        if (blacklistResult.contains) 
            throw new AppError("O titulo da sua enquete contém palavra(s) imprópria(s).", 400);

        var blacklistResult = await this.blacklistService.containsListedWords(
          poll.description
        );

        if (blacklistResult.contains)
          throw new AppError(
            "A descrição da sua enquete contém palavra(s) imprópria(s).",
            400
          );


        for (const option of poll.options) {
            blacklistResult = await this.blacklistService.containsListedWords(
              option.text
            );

            if (blacklistResult.contains)
              throw new AppError(
                `A opção "${option.text}" possui palavra(s) imprópria(s).`,
                400
              );
        }

        return await this.pollRepository.create(poll);
    }

}