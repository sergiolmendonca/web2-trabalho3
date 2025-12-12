

export class ExtendPollUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute({ pollId, endAt, expectedVotes, user }) {
    const poll = await this.pollRepository.findById(pollId);

    poll.extend(endAt, expectedVotes, user.id);

    return await this.pollRepository.update(
      {
        endAt: poll.endAt,
        expectedVotes: poll.expectedVotes
      },
      poll.id
    );
  }
}