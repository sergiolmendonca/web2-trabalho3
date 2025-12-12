import { PrismaClient } from "@prisma/client";
import { AbstractUserRepository } from "../../domain/repositories/abstract-user-repository.js";
import { User } from "../../domain/entities/user.js";


const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export class UserRepository extends AbstractUserRepository {
  async findByEmail(email) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });

    return new User({ ...user });
  }

  async create(user) {
    return await prisma.user.create({
      data: user,
    });
  }

  async update(data, id) {
    return await prisma.user.update({
      where: {
        id: id
      },
      data: data,
    });
  }
}
