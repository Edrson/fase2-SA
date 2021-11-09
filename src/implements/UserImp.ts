import { Request, Response } from "express";
import { IAddUser } from "../interfaces/IAddUser";
import { resGen } from "../models/resGen";

class UserImp {
  protected AddUser: IAddUser;
  constructor(Adduser: IAddUser) {
    this.AddUser = Adduser;
  }

  async FGUserAdd(req: Request, res: Response) {
    let rg = new resGen();
    try {
      rg = await this.AddUser.DB_AddUser(req.body);
      if (rg.valid == true) {
        res.json({ statusCode: res.statusCode, message: "OPERATION_SUCCESFULL", body: req.body });
        return;
      } else {
        res.statusCode = 500;
        res.json({ statusCode: res.statusCode, message: rg.message });
        return;
      }
    } catch (error) {
      res.statusCode = 500;
      res.json({ statusCode: res.statusCode, message: rg.message });
      return;
    }
  }

  //para el consumo de los otros grupos
  async FGUserAddExt(req: Request, res: Response) {
    let rg = new resGen();
    try {
      rg = await this.AddUser.DB_AddUser(req.body);
      if (rg.valid == true) {
        res.json({ data: req.body });
        return;
      } else {
        res.statusCode = 500;
        res.json({ statusCode: res.statusCode, message: rg.message });
        return;
      }
    } catch (error) {
      res.statusCode = 500;
      res.json({ statusCode: res.statusCode, message: rg.message });
      return;
    }
  }
}
export default UserImp;
