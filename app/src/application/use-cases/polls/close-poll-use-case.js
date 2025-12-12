
export class ClosePollUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute({ pollId, user }) {
    const poll = await this.pollRepository.findById(pollId);

    poll.close(user.id);

    return await this.pollRepository.update({
        status: poll.status
    }, poll.id);
  }
}