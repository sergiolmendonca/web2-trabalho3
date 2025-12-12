

export class VoteOptionUseCase {
  constructor(pollRepository, userRepository) {
    this.pollRepository = pollRepository;
    this.userRepository = userRepository;
  }

  async execute({ pollId, optionId, user }) {
    console.log("ta caindo aqui tmb?????????? ", pollId);
    const poll = await this.pollRepository.findById(pollId);
    console.log("ta caindo aqui é? poll : ", poll);

    const vote = poll.addVote(user.id, optionId);

    await this.userRepository.update(
      {
        votes: {
          push: {
            poll_id: poll.id,
            option_id: optionId,
            votedAt: vote.votedAt,
          },
        }
      },
      user.id
    );

    return await this.pollRepository.update(
      {
        votes: {
          push: vote,
        },
        votesCount: { increment: 1 },
      },
      poll.id
    );
  }
}