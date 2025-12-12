import crypto from "node:crypto";
import { AppError } from "../../application/errors/app-error.js";


export class User {
    constructor({ id, name, email, password, votes }) {
        if (!name) throw new Error("O campo nome é obrigatório.");
        if (!email) throw new Error("O campo email é obrigatório.");
        if (!password) throw new Error("O campo password é obrigatório.");

        this.id = id ?? crypto.randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.votes = votes ?? [];
    }

    validPassword(password) {
        const salt = process.env.SALT;

        password = crypto
          .pbkdf2Sync(password, salt, 100_000, 64, "sha256")
          .toString("hex");

          console.log(password);
          
        if (this.password !== password)
          throw new AppError("Senha inválida.", 401);
    }

    hashPassword() {
        const salt = process.env.SALT;

        this.password = crypto
            .pbkdf2Sync(this.password, salt, 100_000, 64, "sha256")
            .toString("hex");
    }
}