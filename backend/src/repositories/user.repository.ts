import type { IRegisteredUser, IUser } from "../interfaces/user.interface.js";

export default class UserRepository {
  private users: IRegisteredUser[] = [];

  constructor() {}

  createUser(user: IUser) {
    this.users.push({
      id: this.users.length.toString() + 1,
      ...user,
      createdAt: new Date().toISOString(),
    });
    return user;
  }

  verifyUserExistByEmail(email: string) {
    return this.users.some((user) => user.email === email);
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getUsers() {
    console.log(this.users)
    return this.users;
  }
}
