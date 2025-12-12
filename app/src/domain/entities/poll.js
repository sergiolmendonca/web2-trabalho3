import crypto from "node:crypto";
import { AppError } from "../../application/errors/app-error.js";

export class Poll {
  constructor({
    id,
    title,
    description,
    visibility,
    startAt,
    endAt,
    expectedVotes,
    categories,
    options,
    votes,
    votesCount,
    createdBy,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.votes = votes ?? [];
    this.votesCount = votesCount ?? 0;
    this.#setTitle(title);
    this.#setDescription(description);
    this.#setVisibility(visibility);
    this.#setStartAt(startAt);
    this.#setEndAtOrExpectedVotes(endAt, expectedVotes);
    this.#setCategories(categories);
    this.#setOptions(options);
    this.#setCreatedBy(createdBy);
    this.#setStatus(status);
  }

  showResult(user) {
    if (this.visibility != "PUBLIC" && this.createdBy.id !== user.id)
      throw new AppError("Não autorizado.", 400);

    var optionsStats = [];

    this.options.forEach(option => {
        const qtdOptionVotes = this.votes.filter(x => x.option_id === option.id).length;
        const totalVotes = this.votes.length;
        const optionPercentage = this.votes.length > 0 ? `${(qtdOptionVotes*100)/totalVotes}%` : 'SEM VOTOS'

        optionsStats.push({
            id: option.id,
            text: option.text,
            votes: qtdOptionVotes,
            percentage: optionPercentage
        })
    });

    return {
        pollId: this.id,
        title: this.title,
        totalVotes: this.votes.length,
        options: optionsStats,
        status: this.status
    };
  }

  addVote(userId, optionId) {
    if (this.votes.some(o => o.user_id === userId))
        throw new AppError("Usuário já votou nesta enquete.", 400);

    if (this.startAt > new Date())
      throw new AppError("A enquete ainda não está aberta para votação.", 400);

    console.log("passou 2");
    if (this.endAt < new Date() || this.expectedVotes <= this.votes.length || this.status === "CLOSED")
      throw new AppError("A enquete já foi encerrada", 400);

    console.log("passou 3");
    const vote = {
      user_id: userId,
      option_id: optionId,
      votedAt: new Date(),
    };

    this.votes.push(vote);

    console.log("passou votos :", this.votes );
    return vote;
  }

  extend(endAt, expectedVotes, userId) {
    if (this.createdBy.id != userId)
      throw new AppError("Usuário não autorizado a encerrar a enquete.", 401);

    if (endAt < new Date() || endAt < this.endAt)
        throw new AppError("A data não pode ser menor que a atual ou anterior a hoje.", 400);

    if (expectedVotes < this.expectedVotes)
        throw new AppError("O número de votos não pode ser menor que o atual.", 400)

    this.endAt = endAt;
    this.expectedVotes = expectedVotes;
  }

  close(userId) {
    if (this.createdBy.id != userId)
      throw new AppError("Usuário não autorizado a encerrar a enquete.", 401);

    this.status = "CLOSED";
  }

  updateStatus() {
    if (this.status == "SCHEDULE" && this.startAt >= new Date())
      this.status = "OPEN";

    if (this.endAt < new Date())
      this.status = "CLOSED";
  }

  #setTitle(title) {
    if (!title) throw new AppError("Título é obrigatório.", 400);

    this.title = title;
  }

  #setDescription(description) {
    if (!description) throw new AppError("A descrição é obrigatório.", 400);

    this.description = description;
  }

  #setVisibility(visibility) {
    if (!visibility) this.visibility = "PUBLIC";
    else this.visibility = visibility;
  }

  #setStartAt(startAt) {
    if (!startAt) this.startAt = new Date();
    else this.startAt = startAt;
  }

  #setEndAtOrExpectedVotes(endAt, expectedVotes) {
    if (!endAt && !expectedVotes)
      throw new AppError(
        "A data de encerramento ou a quantidade de votos esperados é obrigatório.",
        400
      );

    if (endAt) this.#setEndAt(endAt);

    if (expectedVotes) this.#setExpectedVotes(expectedVotes);
  }

  #setEndAt(endAt) {
    if ((!endAt || endAt < new Date()) && !this.createdAt)
      throw new AppError(
        "A data de encerramento é obrigatória e deve ser maior que a data atual.",
        400
      );

    this.endAt = endAt;
  }

  #setExpectedVotes(expectedVotes) {
    if (!expectedVotes || expectedVotes.length < 0) this.expectedVotes = 0;
    else this.expectedVotes = expectedVotes;
  }

  #setCategories(categories) {
    if (!categories || categories.length < 1)
      throw new AppError(
        "É obrigatória a adição de pelo menos uma categoria.",
        400
      );

    this.categories = categories;
  }

  #setOptions(options) {
    if (!options || options.length < 2)
      throw new AppError(
        "É obrigatória a adição de pelo menos duas opções.",
        400
      );

    var optionList = [];

    options.forEach((option) => {
      optionList.push({
        id: option.id ?? crypto.randomUUID(),
        text: option.text,
      });
    });

    this.options = optionList;
  }

  #setCreatedBy(createdBy) {
    if (!createdBy)
      throw new AppError("Erro ao carregar usuário criador da enquete.", 400);

    this.createdBy = {
      id: createdBy.id,
      name: createdBy.name,
    };
  }

  #setStatus(status) {
    if (!status) {
      if (this.startAt <= new Date()) this.status = "OPEN";
      else this.status = "SCHEDULED";
    } else this.status = status;
  }
}