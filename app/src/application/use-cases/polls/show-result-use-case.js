
export class ShowResultUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute({ pollId, user }) {
    const poll = await this.pollRepository.findById(pollId);

    return poll.showResult(user);
  }
}