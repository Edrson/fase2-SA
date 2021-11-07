import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const axios = require('axios')

class Bus {
  
  //^Verifica las credenciales de un usuario para permitirlo ingresar al sistema
  async FGbusDirect(req: Request, res: Response) {
    try {
      let rg = new resGen();
      
      rg = await this.bus(req);

      if (rg.valid == true) {
            
        res.json({
          statusCode: res.statusCode,
          message: "OPERATION_SUCCESFULL",
          data:rg.data,
        });
       
      }else{
        res.json({
          statusCode: res.statusCode,
          message: rg.message,
          login: {
            correct: false,
            userType: null,
            token: null
          },
        });
      }
    } catch (error) {
      console.log("Error en metodo FGLogin");
      res.statusCode = 500;
      res.json({ statusCode: res.statusCode, message: (error as Error).message });
    }
  }

   async bus(req: Request): Promise<any> {
    const rg = new resGen();
    try {
      //console.log();
       rg.valid = true;
        rg.data = {"res":"ok"};
    } catch (error) {
      rg.valid = false;
      rg.message = (error as Error).message;
    } finally {
      return rg;
    }
  } 

}

export default Bus;
