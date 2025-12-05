import crypto from "node:crypto";


export class User {
    constructor({ id, name, email, password }) {
        if (!name) throw new Error("O campo nome é obrigatório.");
        if (!email) throw new Error("O campo email é obrigatório.");
        if (!password) throw new Error("O campo password é obrigatório.");

        this.id = id ?? crypto.randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}