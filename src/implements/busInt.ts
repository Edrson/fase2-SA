import { Request, Response } from "express";
import { resGen } from "../models/resGen";
import UserDB from "../implements/UserDB";
import UserImp from "../implements/UserImp";
import UserLogin from "../implements/UserLogin";
import Product from "../implements/Product";
import Compra from "../implements/Compra";
import { request } from "http";

//paquete de mongodb
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const axios = require('axios')


class Bus {

  //**************************************** comuninicacion con servicios de otros grupos ********************************************//
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

  //************************************** comunicacion de los otros grupos con nuestros servicios *****************************************//
  async FGBusServiciosPropios(req: Request, res: Response) { //identifica el servicio solicitado y redirecciona
    const rg = new resGen();

    try{
      if(req.body._id && req.body.nombre && req.body.apellido && req.body.foto && req.body.password && req.body.tipo && req.body.tarjetas){
        //es registro de usuario
        const userDB = new UserDB();
        const user = new UserImp(userDB);
        await user.FGUserAdd(req, res);

      }else if (req.body._id && req.body.password && !req.body.nombre && !req.body.apellido && !req.body.foto && !req.body.tipo && !req.body.tarjetas){
        //login de usuario
        const userLogin = new UserLogin();
        await userLogin.FGLogin(req, res);
  
      }else if (req.body.categoria && req.body.precio && req.body.stock && req.body.nombre && req.body.descripcion && req.body.foto && req.body.proveedor){
        //creacion de un producto
        const product = new Product();
        await product.FGProductAdd(req, res);

      /*}else if (){
        //modificacion de un producto
        const product = new Product();
        await product.FGProductUpdate(req, res);*/
      }else if (req.body.categoria && req.body.nombre && !req.body.precio && !req.body.stock && !req.body.descripcion && !req.body.foto && !req.body.proveedor){
        //eliminacion de un producto
        const product = new Product();
        await product.FGProductDelete(req, res);

      }else if (req.body.cliente && req.body.tarjeta && req.body.monto && req.body.total && req.body.fecha && req.body.detalle){
        //compra de un producto
        const compra = new Compra();
        await compra.FGRegistraCompra(req, res);

      }else{
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: "No se encuentra el Servicio, revise los parametros",
        });
      }
    }catch (error){
      rg.valid = false;
      rg.message = (error as Error).message;
      console.log('error');
    } finally {
      return rg;
    }
  }

  async FGBusServiciosPropios2(req: Request, res: Response) { //identifica el servicio solicitado y redirecciona
    const rg = new resGen();

    try{
      if(req.body.nombre && req.body.apellido && req.body.correo && req.body.password && req.body.tipo /*&& req.body.tarjetas*/){
        //es registro de usuario
        const userDB = new UserDB();
        const user = new UserImp(userDB);
        await user.FGUserAddExt(req, res);

      }else if (req.body.correo && req.body.password && !req.body.nombre && !req.body.apellido && !req.body.tipo && !req.body.tarjetas){
        //login de usuario
        const userLogin = new UserLogin();
        await userLogin.FGLoginExt(req, res);
  
      }else if (req.body.categoria && req.body.precio && req.body.stock && req.body.nombre && req.body.descripcion && req.body.foto && req.body.proveedor){
        //creacion de un producto
        const product = new Product();
        await product.FGProductAddExt(req, res);

      /*}else if (){
        //modificacion de un producto
        const product = new Product();
        await product.FGProductUpdate(req, res);*/
      }else if (req.body.categoria && req.body.nombre && !req.body.precio && !req.body.stock && !req.body.descripcion && !req.body.foto && !req.body.proveedor){
        //eliminacion de un producto
        const product = new Product();
        await product.FGProductDelete(req, res);

      }else if (req.body.idUser && req.body.nombre && req.body.nit && req.body.products){
        //compra de un producto
        const compra = new Compra();
        await compra.FGRegistraCompraExt(req, res);

      }else{
        res.statusCode = 500;
        res.json({
          statusCode: res.statusCode,
          message: "No se encuentra el Servicio, revise los parametros",
        });
      }
    }catch (error){
      rg.valid = false;
      rg.message = (error as Error).message;
      console.log('error');
    } finally {
      return rg;
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


