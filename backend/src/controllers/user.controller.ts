import type { Request, Response } from "express";
import UserService from "../services/user.service.js";

export default class UserController {
  private userService = new UserService();
  constructor() {}

  getUserById(req: Request, res: Response) {
    const id = req.params.id as string;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", message: "User ID is required" });
    }

    const user = this.userService.getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.json({ status: "success", data: user });
  }


  getUsers(req: Request, res: Response){
    const users = this.userService.getUsers();
    return res.json({ status: "success", data: users });
  }
}
