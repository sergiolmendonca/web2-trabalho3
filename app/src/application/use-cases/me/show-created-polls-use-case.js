

export class ShowCreatedPollsUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute({ userId, page, limit }) {
    const polls = await this.pollRepository.list({
        createdBy: {
            is: {
                id: userId
            }
        }
    }, (page - 1), limit);

    return polls;
  }
}