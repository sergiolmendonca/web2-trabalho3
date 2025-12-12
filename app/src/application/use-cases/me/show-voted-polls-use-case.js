

export class ShowVotedPollsUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute({ userId, page, limit }) {
    const polls = await this.pollRepository.listVotedPolls(userId, page-1, limit);

    return polls;
  }
}