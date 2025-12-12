import { ShowCreatedPollsUseCase } from "../../application/use-cases/me/show-created-polls-use-case.js";
import { ShowVotedPollsUseCase } from "../../application/use-cases/me/show-voted-polls-use-case.js";
import { PollRepository } from "../../infrastructure/repositories/poll-repository.js";

const pollRepository = new PollRepository();

const listarEnquetesCriadas = async (req, res) => {
  const showCreatedPollsUseCase = new ShowCreatedPollsUseCase(pollRepository);

  const page = req.params.page ?? 1;
  const limit = req.params.limit ?? 10;

  const result = await showCreatedPollsUseCase.execute({
    userId: req.user.id,
    page: page,
    limit: limit,
  });

  res.status(200).json(result);
};

const listarEnquetesVotadas = async (req, res) => {
  const showCreatedPollsUseCase = new ShowVotedPollsUseCase(pollRepository);

  const page = req.params.page ?? 1;
  const limit = req.params.limit ?? 10;

  const result = await showCreatedPollsUseCase.execute({
    userId: req.user.id,
    page: page,
    limit: limit,
  });

  res.status(200).json(result);
};

export { 
    listarEnquetesCriadas,
    listarEnquetesVotadas
 };