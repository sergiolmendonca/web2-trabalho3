import { PrismaClient } from "@prisma/client";
import { AbstractUserRepository } from "../../domain/repositories/abstract-user-repository.js";


const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export class UserRepository extends AbstractUserRepository {
  findByEmail(email) {
    return prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    });
  }

  async create(user) {
    return await prisma.user.create({
      data: user,
    });
  }
}
