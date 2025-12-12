

export class ListPollsUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute(params, user) {

    const skip = params.page ? Number(params.page) - 1 : 0;
    const limit = params.limit ? Number(params.limit) : 10;

    const polls = await this.pollRepository.list(
      params,
      skip,
      limit,
      user
    );

    return polls;
  }
}