import { AppError } from "../errors/app-error.js";

export class LoginUseCase {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Email inválido.", 401);

    user.validPassword(password);

    const token = this.jwtService.gerarToken(user);

    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}