import type { IUser } from "../interfaces/user.interface.js";
import UserRepository from "../repositories/user.repository.js";

export default class UserService {
  private userRepository = new UserRepository();
  constructor() {}

  createUser(user: IUser) {
    return this.userRepository.createUser(user);
  }

  verifyUserExistByEmail(email: string): boolean {
    return this.userRepository.verifyUserExistByEmail(email);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  getUsers() {
    return this.userRepository.getUsers();
  }
}
