import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const axios = require('axios')

class Bus {
  
  async FGbusDirect(req: Request, res: Response) {
    try { 
    let rg = new resGen();
      switch (req.body.grupo) {

        case 1:
          //^Pruebas con nuestro back-------------------------------------------------
          axios.get(`http://34.125.203.249/sa/user/data/${req.body.iduser}`
          )
          .then(function(response: any){
            console.log("data Respuest:",response)
          })
          .catch(function (error:any) {
            // handle error
            console.log(error);
          })

    
        case 26: //^ Grupos 2 y 6 ----------------------------------------------------------

          if(req.body.servicio == 1){ //^ registro de usuario
            await axios({
              method: 'post',
              url: 'http://174.138.109.46/api/users/signup',
              data: {
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                correo:req.body.correo,
                password:req.body.password,
                tipo:req.body.tipo,
                tarjetas:{
                  titular:req.body.titular,
                  numero:req.body.numero,
                  vencimiento:req.body.vencimiento
                },  
              },
              headers: {'Content-Type': 'application/json'},
            })
            .then(function(response:any){
              console.log("Código de respuesta >>",response.status)
              if (response.status == 201 || response.status == 200){
                rg.valid = true
                rg.data = response.data
              }else{
                rg.valid=false
                rg.message = `Error en registro grupo 2 o 6 -->${ response.statusText}`
                res.statusCode = response.status
              }
            })
            .catch(function(error:any){
              //console.log("trono esa onda >",error.response.status);
              //console.log("trono esa onda2 >",error.response.statusText);
              res.statusCode = error.response.status
              rg.valid = false
              rg.message =  `Error en registro grupo 2 o 6 -->${ error.response.statusText}`
            })
          }
          else if (req.body.servicio == 2){ //^ Login
            await axios({
              method: 'post',
              url: 'http://174.138.109.46/api/users/signin',
              data: {
                correo:req.body.correo,
                password:req.body.password  
              },
              headers: {'Content-Type': 'application/json'},
            })
            .then(function(response:any){
              if (response.status == 201 || response.status == 200){
                rg.valid = true
                rg.data = response.data
              }else{
                rg.valid = false
                rg.message = response.statusText
              }
            })
            .catch(function(error:any){
              res.statusCode = error.response.status
              rg.valid = false
              rg.message = error.response.statusText
            })
          }
        else if(req.body.servicio == 3){ // ^ Crear producto
          await axios({
           
            method: 'post',
            url: 'http://174.138.109.46/api/providers/newProduct',
            data: {
              nombre:req.body.nombre,
              descripcion:req.body.descripcion,
              foto:req.body.foto,
              precio:req.body.precio,
              stock:req.body.stock  
            },
            headers: {
              'Content-Type': 'application/json',
              'token':req.headers.authorization},
          })
          .then(function(response:any){

            if (response.status == 201 || response.status == 200){
              rg.valid = true
              rg.data = response.data
            }else{
              rg.valid = false
              rg.message = response.statusText
            }
          })
          .catch(function(error:any){
            res.statusCode = error.response.status
            rg.valid = false
            rg.message = error.response.statusText
          })
        }
        else if(req.body.servicio == 4){ // ^ Obtener productos       
          await axios({         
            method: 'get',
            url: 'http://174.138.109.46/api/providers/products',
            headers: {
              'token':req.headers.authorization},
          })
          .then(function(response:any){
            if (response.status == 201 || response.status == 200){
              rg.valid = true
              rg.data = response.data
            }else{
              rg.valid = false
              rg.message = response.statusText
            }
          })
          .catch(function(error:any){
            res.statusCode = error.response.status
            rg.valid = false
            rg.message = error.response.statusText
          })
        }
        else if(req.body.servicio == 5){ // ^ Crear tarjeta
          await axios({
           
            method: 'post',
            url: 'http://174.138.109.46/api/customers/card',
            data: {
              titular:req.body.titular,
              numero:req.body.numero,
              vencimiento:req.body.vencimiento
            },
            headers: {
              'Content-Type': 'application/json',
              'token':req.headers.authorization},
          })
          .then(function(response:any){

            if (response.status == 201 || response.status == 200){
              rg.valid = true
              rg.data = response.data
            }else{
              rg.valid = false
              rg.message = response.statusText
            }
          })
          .catch(function(error:any){
            res.statusCode = error.response.status
            rg.valid = false
            rg.message = error.response.statusText
          })
        }

          //^ --------------------------------------------------------------------------
          break;
      
        default:
          break;
      }

  
      //rg = await this.bus(req);

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
        });
      }
    } catch (error) {
      console.log("Error en metodo FGLogin");
      res.statusCode = 500;
      res.json({ statusCode: res.statusCode, message: (error as Error).message });
    }
  }

/*    async bus(req: Request): Promise<any> {
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
  }  */

}

export default Bus;

