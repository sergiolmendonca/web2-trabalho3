import { Poll } from '../../domain/entities/poll.js';
import { PollRepository } from '../../infrastructure/repositories/poll-repository.js';
import { CreatePollUseCase } from '../../application/use-cases/create-poll-user-case.js';
import { ClosePollUseCase } from '../../application/use-cases/polls/close-poll-use-case.js';
import { ExtendPollUseCase } from '../../application/use-cases/polls/extend-poll-use-case.js';
import { VoteOptionUseCase } from '../../application/use-cases/polls/vote-option-use-case.js';
import { UserRepository } from '../../infrastructure/repositories/user-repository.js';
import { ShowResultUseCase } from '../../application/use-cases/polls/show-result-use-case.js';
import { UpdateStatusUseCase } from '../../application/use-cases/polls/update-status-use-case.js';
import { ListPollsUseCase } from '../../application/use-cases/polls/list-polls-use-case.js';
import { BlackListService } from '../../infrastructure/services/BlackListService.js';

const pollRepository = new PollRepository();
const userRepository = new UserRepository();
const blacklistService = new BlackListService();

const criar = async (req, res) => {
  const createPollUseCase = new CreatePollUseCase(pollRepository, blacklistService);
  
  var poll = req.body;
  
  poll.createdBy = {
    id: req.user.id,
    name: req.user.name,
  };

  const result = await createPollUseCase.execute(new Poll(poll));

  res.status(201).json(result);
};

const visualizar = (req, res) => {
  res.json("visualização de enquete");
};

const mostrarResultado = async (req, res) => {
  const showResultUseCase = new ShowResultUseCase(pollRepository);

  const result = await showResultUseCase.execute({
    pollId: req.params.id, 
    user: req.user
  });

  res.status(200).json(result);
};

const listar = async (req, res) => {
  const listPollsUseCase = new ListPollsUseCase(pollRepository);

  const result = await listPollsUseCase.execute(req.query, req.user);

  res.status(200).json(result);
};

const votar = async (req, res) => {
  const voteOptionUseCase = new VoteOptionUseCase(
    pollRepository,
    userRepository
  );
  console.log("ta caindo aqui ou não???: ");
  const result = await voteOptionUseCase.execute({
    pollId: req.params.id,
    optionId: req.body.optionId,
    user: req.user
  });

  res.status(200).json(result);
};

const estender = async (req, res) => {
  const extendPollUseCase = new ExtendPollUseCase(pollRepository);

  const result = await extendPollUseCase.execute({
    pollId: req.params.id,
    endAt: req.body.endAt,
    expectedVotes: req.body.expectedVotes,
    user: req.user,
  });

  res.status(200).json(result);
};

const encerrar = async (req, res) => {
  const closePollUseCase = new ClosePollUseCase(pollRepository);

  const result = await closePollUseCase.execute({
    pollId: req.params.id, 
    user: req.user
  });

  res.json(result);
};

const validaeAndupdateStatus = async (req, res) => {
  const updateStatusUseCase = new UpdateStatusUseCase(pollRepository);

  const result = await updateStatusUseCase.execute(req.params.id);

  return result;
};


export {
  criar,
  visualizar,
  mostrarResultado,
  listar,
  votar,
  estender,
  encerrar,
  validaeAndupdateStatus,
};