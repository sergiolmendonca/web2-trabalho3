
export class AbstractUserRepository {
  findByEmail(email) {
    throw new Error("classe não implementada.");
  }

  create(user) {
    throw new Error("classe não implementada.");
  }
}