

export class ShowCreatedPollsUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute({ userId, page, limit }) {
    const polls = await this.pollRepository.listCreatedPolls(userId, page - 1, limit);

    return polls;
  }
}