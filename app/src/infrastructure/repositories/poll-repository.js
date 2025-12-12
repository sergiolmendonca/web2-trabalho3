import { PrismaClient } from "@prisma/client";
import { AbstractPollRepository } from "../../domain/repositories/abstract-poll-repository.js";
import { Poll } from "../../domain/entities/poll.js";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export class PollRepository extends AbstractPollRepository {
  async create(poll) {
    return await prisma.poll.create({
      data: poll,
    });
  }

  async listVotedPolls(userId, skip, take) {
    return await prisma.poll.findMany({
      where: {
        votes: {
          some: {
            user_id: userId,
          },
        },
      },
      skip,
      take,
    });
  }

  async listCreatedPolls(userId, skip, take) {
    return await prisma.poll.findMany({
      where: {
        createdBy: {
          is: {
            id: userId,
          },
        },
      },
      skip,
      take,
    });
  }

  async list(params, skip, take, user) {
    const where = {
      OR: [
        {
          visibility: "PUBLIC",
        },
        {
          createdBy: {
            is: { id: user.id },
          },
        },
      ],
      ...(params.status
        ? {
            status: params.status,
          }
        : {}),
      ...(params.category
        ? {
            categories: { has: params.category },
          }
        : {}),
      ...(params.minVotes || params.maxVotes
        ? {
            votesCount: {
              ...(params.minVotes ? { gte: Number(params.minVotes) } : {}),
              ...(params.maxVotes ? { lte: Number(params.maxVotes) } : {}),
            },
          }
        : {}),
      ...(params.createdFrom || params.createdTo
        ? {
            createdAt: {
              ...(params.createdFrom
                ? { gte: new Date(params.createdFrom) }
                : {}),
              ...(params.createdTo ? { lte: new Date(params.createdTo) } : {}),
            },
          }
        : {}),
    };

    const data = await prisma.poll.findMany({
      where,
      skip,
      take,
    });

    const total = await prisma.poll.count({
      where,
    });

    return {
      data,
      page: skip + 1,
      limit: take,
      total,
    };
  }

  async findById(id) {
    const poll = await prisma.poll.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    return new Poll({ ...poll });
  }

  async update(data, pollId) {
    return await prisma.poll.update({
      where: {
        id: pollId,
      },
      data: data,
    });
  }
}
