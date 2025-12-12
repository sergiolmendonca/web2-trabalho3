
export class UpdateStatusUseCase {
  constructor(pollRepository) {
    this.pollRepository = pollRepository;
  }

  async execute(pollId) {
    const poll = await this.pollRepository.findById(pollId);

    const originalStatus = poll.status;
    
    poll.updateStatus();

    if (poll.status == originalStatus) return poll;


    return await this.pollRepository.update(
      {
        status: poll.status,
      },
      poll.id
    );
  }
}