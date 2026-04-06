import type { Request, Response } from "express";
import type { IUserRole } from "../interfaces/user.interface.js";
import UserService from "../services/user.service.js";

class AuthController {
  private userService = new UserService();
  constructor() {}

  register(req: Request, res: Response) {
    const role = req.query.role as IUserRole;

    if (!role) {
      return res
        .status(400)
        .send({ status: "error", message: "Role is required" });
    }

    if (this.userService.verifyUserExistByEmail(req.body.email)) {
      return res
        .status(400)
        .send({ status: "error", message: "User already exists" });
    }

    this.userService.createUser({ ...req.body, role });

    return res
      .status(201)
      .send({ status: "success", message: "User created successfully" });
  }

  login(req: Request, res: Response) {
    if (!this.userService.verifyUserExistByEmail(req.body.email)) {
      return res
        .status(400)
        .send({ status: "error", message: "User does not exist" });
    }

    //Todo: Validate password

    return res
      .status(200)
      .send({ status: "success", message: "Login successful" });
  }
}

export default AuthController;
