import { Console } from "console";
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
const URL_LOCAL = "http://localhost:3000";

var urls: string[][] = [
	//GRUPO1
	[
		/*
		"http://localhost:3000/sa/user/add",
		"http://localhost:3000/sa/user/login",
		"http://localhost:3000/sa/product/add",
		"http://localhost:3000/sa/catalogue",
		"http://localhost:3000/sa/product/regcompra",
		*/

		"http://34.125.203.249/sa/user/add",
		"http://34.125.203.249/sa/user/login",
		"http://34.125.203.249/sa/product/add",
		"http://34.125.203.249/sa/catalogue",
		"http://34.125.203.249/sa/product/regcompra"

		
	],

	//GRUPO2
	[
		"http://174.138.109.46/api/users/signup",
		"http://174.138.109.46/api/users/signin",
		"http://174.138.109.46/api/providers/newProduct",
		"http://174.138.109.46/api/providers/allProducts",
		"http://174.138.109.46/api/users/compra"
	],

	//GRUPO3
	[
		"http://sa-g6.herokuapp.com/api/users/signup",
		"http://sa-g6.herokuapp.com/api/users/signin",
		"http://sa-g6.herokuapp.com/api/providers/newProduct",
		"http://sa-g6.herokuapp.com/api/providers/allProducts",
		"http://sa-g6.herokuapp.com/api/users/compra"
	],
	//GRUPO4
	[
		"http://35.192.90.40:4000/api/users/signup",
		"http://35.192.90.40:4000/api/users/signin",
		"http://35.192.90.40:4000/api/providers/newProduct",
		"http://35.192.90.40:4000/api/providers/allProducts",
		"http://35.192.90.40:4000/api/users/compra"
	],
	//GRUPO5
	[
		"http://34.125.95.83:4000/api/users/signup",
		"http://34.125.95.83:4000/api/users/signin",
		"http://34.125.95.83:4000/api/providers/newProduct",
		"http://34.125.95.83:4000/api/providers/allProducts",
		"http://34.125.95.83:4000/api/users/compra"
	],
	//GRUPO6
	[
		"http://34.125.129.171:3000/api/users/signup",
		"http://34.125.129.171:3000/api/users/signin",
		"http://34.125.129.171:3000/api/providers/newProduct",
		"http://34.125.129.171:3000/api/providers/allProducts",
		"http://34.125.129.171:3000/api/users/compra"
	],
	//GRUPO7
	[
		"http://34.125.197.251:3000/api/users/signup",
		"http://34.125.197.251:3000/api/users/signin",
		"http://34.125.197.251:3000/api/providers/newProduct",
		"http://34.125.197.251:3000/api/providers/allProducts",
		"http://34.125.197.251:3000/api/users/compra"
	],
	//GRUPO8
	[
		"http://3.12.103.111:4000/api/users/signup",
		"http://3.12.103.111:4000/api/users/signin",
		"http://3.12.103.111:4000/api/providers/newProduct",
		"http://3.12.103.111:4000/api/providers/allProducts",
		"http://3.12.103.111:4000/api/users/compra"
	],

]



class Bus {

//   //**************************************** comuninicacion con servicios de otros grupos ********************************************//
//   async FGbusDirect(req: Request, res: Response) {
//     try {
//     let rg = new resGen();
//       switch (req.body.grupo) {

//         case 1:
//           //^Pruebas con nuestro back-------------------------------------------------
//           axios.get(`http://34.125.203.249/sa/user/data/${req.body.iduser}`
//           )
//           .then(function(response: any){
//             console.log("data Respuest:",response)
//           })
//           .catch(function (error:any) {
//             // handle error
//             console.log(error);
//           })


//         case 26: //^ Grupos 2 y 6 ----------------------------------------------------------

//           if(req.body.servicio == 1){ //^ registro de usuario
//             await axios({
//               method: 'post',
//               url: 'http://174.138.109.46/api/users/signup',
//               data: {
//                 nombre:req.body.nombre,
//                 apellido:req.body.apellido,
//                 correo:req.body.correo,
//                 password:req.body.password,
//                 tipo:req.body.tipo,
//                 tarjetas:{
//                   titular:req.body.titular,
//                   numero:req.body.numero,
//                   vencimiento:req.body.vencimiento
//                 },
//               },
//               headers: {'Content-Type': 'application/json'},
//             })
//             .then(function(response:any){
//               console.log("Código de respuesta >>",response.status)
//               if (response.status == 201 || response.status == 200){
//                 rg.valid = true
//                 rg.data = response.data
//               }else{
//                 rg.valid=false
//                 rg.message = `Error en registro grupo 2 o 6 -->${ response.statusText}`
//                 res.statusCode = response.status
//               }
//             })
//             .catch(function(error:any){
//               //console.log("trono esa onda >",error.response.status);
//               //console.log("trono esa onda2 >",error.response.statusText);
//               res.statusCode = error.response.status
//               rg.valid = false
//               rg.message =  `Error en registro grupo 2 o 6 -->${ error.response.statusText}`
//             })
//           }
//           else if (req.body.servicio == 2){ //^ Login
//             await axios({
//               method: 'post',
//               url: 'http://174.138.109.46/api/users/signin',
//               data: {
//                 correo:req.body.correo,
//                 password:req.body.password
//               },
//               headers: {'Content-Type': 'application/json'},
//             })
//             .then(function(response:any){
//               if (response.status == 201 || response.status == 200){
//                 rg.valid = true
//                 rg.data = response.data
//               }else{
//                 rg.valid = false
//                 rg.message = response.statusText
//               }
//             })
//             .catch(function(error:any){
//               res.statusCode = error.response.status
//               rg.valid = false
//               rg.message = error.response.statusText
//             })
//           }
//         else if(req.body.servicio == 3){ // ^ Crear producto
//           await axios({

//             method: 'post',
//             url: 'http://174.138.109.46/api/providers/newProduct',
//             data: {
//               nombre:req.body.nombre,
//               descripcion:req.body.descripcion,
//               foto:req.body.foto,
//               precio:req.body.precio,
//               stock:req.body.stock
//             },
//             headers: {
//               'Content-Type': 'application/json',
//               'token':req.headers.authorization},
//           })
//           .then(function(response:any){

//             if (response.status == 201 || response.status == 200){
//               rg.valid = true
//               rg.data = response.data
//             }else{
//               rg.valid = false
//               rg.message = response.statusText
//             }
//           })
//           .catch(function(error:any){
//             res.statusCode = error.response.status
//             rg.valid = false
//             rg.message = error.response.statusText
//           })
//         }
//         else if(req.body.servicio == 4){ // ^ Obtener productos
//           await axios({
//             method: 'get',
//             url: 'http://174.138.109.46/api/providers/products',
//             headers: {
//               'token':req.headers.authorization},
//           })
//           .then(function(response:any){
//             if (response.status == 201 || response.status == 200){
//               rg.valid = true
//               rg.data = response.data
//             }else{
//               rg.valid = false
//               rg.message = response.statusText
//             }
//           })
//           .catch(function(error:any){
//             res.statusCode = error.response.status
//             rg.valid = false
//             rg.message = error.response.statusText
//           })
//         }
//         else if(req.body.servicio == 5){ // ^ Crear tarjeta
//           await axios({

//             method: 'post',
//             url: 'http://174.138.109.46/api/customers/card',
//             data: {
//               titular:req.body.titular,
//               numero:req.body.numero,
//               vencimiento:req.body.vencimiento
//             },
//             headers: {
//               'Content-Type': 'application/json',
//               'token':req.headers.authorization},
//           })
//           .then(function(response:any){

//             if (response.status == 201 || response.status == 200){
//               rg.valid = true
//               rg.data = response.data
//             }else{
//               rg.valid = false
//               rg.message = response.statusText
//             }
//           })
//           .catch(function(error:any){
//             res.statusCode = error.response.status
//             rg.valid = false
//             rg.message = error.response.statusText
//           })
//         }

//           //^ --------------------------------------------------------------------------
//           break;

//         default:
//           break;
//       }


//       //rg = await this.bus(req);

//       if (rg.valid == true) {
//         res.json({
//           statusCode: res.statusCode,
//           message: "OPERATION_SUCCESFULL",
//           data:rg.data,
//         });

//       }else{
//         res.json({
//           statusCode: res.statusCode,
//           message: rg.message,
//         });
//       }
//     } catch (error) {
//       console.log("Error en metodo FGLogin");
//       res.statusCode = 500;
//       res.json({ statusCode: res.statusCode, message: (error as Error).message });
//     }
//   }

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

      }else if ((req.body.categoria || req.body.categorias) && req.body.precio && req.body.stock && req.body.nombre && req.body.descripcion && req.body.foto /*&& req.body.proveedor*/){
        //creacion de un producto
        const product = new Product();
        await product.FGProductAddExt(req, res);

      /*}else if (){
        //modificacion de un producto
        const product = new Product();
        await product.FGProductUpdate(req, res);*/
      /*}else if (req.body.categoria && req.body.nombre && !req.body.precio && !req.body.stock && !req.body.descripcion && !req.body.foto && !req.body.proveedor){
        //eliminacion de un producto
        const product = new Product();
        await product.FGProductDelete(req, res);*/

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
	async FGbusDirect(req: Request, res: Response) {
		try {
			let rg = new resGen();
			console.log("GRUPO " + req.body.grupo + " - servicio " + req.body.servicio)
			switch (Number(req.body.servicio)) {

				//#region REGISTRO
				case 1: // ------------------------------REGISTRO GRUPO 1 ----------------------------------------
					switch (Number(req.body.grupo)) {
						case 1:
							console.log("url by function is : " + this.get_url(req.body.grupo, req.body.servicio))
							console.log("request body: " + req.body)
							//Formato a data
							let data = {
								email: req.body.email,
								_id: req.body._id,
								nombre: req.body.nombre,
								apellido: req.body.apellido,
								password: req.body.password,
								tipo: req.body.tipo,
								foto: req.body.foto,
								tarjetas: req.body.tarjetas,
							};

							await axios({
								method: 'post',
								url: this.get_url(req.body.grupo, req.body.servicio),
								data: data,
								headers: { 'Content-Type': 'application/json' },
							})
							.then(function (response: any) {
								console.log(response);
								res.statusCode = response.status;
								res.json(response.data);
							})
							.catch(function (error: any) {
								// handle error
								console.error(error);
								res.statusCode = error.response.status;
								res.json(error.response.data);
							})
						break;

						default:// ------------------------------REGISTRO GRUPO 2 ----------------------------------------
							//case 6:
							console.log("SERVICIO 1REGISTRO G"+req.body.grupo +" url:"+ this.get_url(req.body.grupo, req.body.servicio))
							console.log(req.body);
							//dando formato a la data:
							let data_registro = {
								nombre: req.body.nombre,
								apellido: req.body.apellido,
								correo: req.body.email,
								password: req.body.password,
								tipo: req.body.tipo,
								tarjetas: req.body.tarjetas[0]
							}
							console.log(data_registro);
							await axios({
								method: 'post',
								url: this.get_url(req.body.grupo, req.body.servicio),
								data: data_registro,
								headers: { 'Content-Type': 'application/json' },
							})
							.then(function (response: any) {
									console.log(response);
									console.log("Código de respuesta >>", response.status)
									if (response.status == 201 || response.status == 200) {
										rg.data = response.data
										rg.message = 'OPERATION_SUCCESSFUL'
									} else {
										rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR:${response.statusText}`;
									}
									res.statusCode = response.status;
									res.json({message:rg.message});

								})
							.catch(function (error: any) {
									res.statusCode = error.response.status;
									rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR: ${error.response.statusText}` + " - >" + error.response.data.errors[0].message;
									res.json({message:rg.message});
							});



						break;

					}



					break;
				//#endregion REGISTRO

				//#region SERVICIO2 LOGIN
				case 2:
					switch (Number(req.body.grupo)) {
						case 1: // ------------------------------LOGIN GRUPO 1 ----------------------------------------
							console.log("SERVICIO 2LOGIN G"+req.body.grupo +" url:"+ this.get_url(req.body.grupo, req.body.servicio));
							console.log("request body: " + req.body)
							//Formato a data
							let data = {
								_id: req.body._id,
								password: req.body.password,
							};


							await axios({
								method: 'post',
								url: this.get_url(req.body.grupo, req.body.servicio),
								data: data,
								headers: { 'Content-Type': 'application/json' },
							})
								.then(function (response: any) {
									// console.log("response");
									// console.log(response);
									res.statusCode = response.status;
									res.json(response.data);

								})
								.catch(function (error: any) {
									console.log("error login");
									console.error(error);
									res.statusCode = error.response.status;
									res.json(error.response.data);
								})
							break;

						default:  // ------------------------------LOGIN GRUPO 2 ----------------------------------------
							//case 6:
							console.log("SERVICIO 2LOGIN G"+req.body.grupo +" url:"+ this.get_url(req.body.grupo, req.body.servicio));
							console.log(req.body);
							//dando formato a la data:
							let data_login = {
								correo: req.body._id,
								password: req.body.password,
							}
							console.log(data_login);
							await axios({
								method: 'post',
								url: this.get_url(req.body.grupo, req.body.servicio),
								data: data_login,
								headers: { 'Content-Type': 'application/json' },
							})
								.then(function (response: any) {
									console.log(response);
									console.log("Código de respuesta >>", response.status)
									if (response.status == 201 || response.status == 200) {
										rg.valid = true
										rg.data = response.data
										rg.message ="OPERATION_SUCCESSFUL"
									} else {
										rg.valid = false
										rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR:${response.statusText}`;
									}
									res.statusCode = response.status
									res.json({
										statusCode: res.statusCode,
										message: rg.message,
										login: {
										  correct: rg.valid,
										  userType: rg.data.tipo,
										  token:rg.data.token
										},
									  });
								})
								.catch(function (error: any) {
									//console.log("trono esa onda >",error.response.status);
									console.log("Error interno: ",error.response.statusText);
									res.statusCode = error.response.status
									rg.valid = false
									rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR: ${error.response.statusText}` + " - >" + error.response.data.errors[0].message;
									console.log(rg.message);
									res.json({message:rg.message});
								})

							break;

					}
					break;
				//#endregion SERVICIO2 LOGIN

				//#region SERVICIO3 CREAR_PRODUCTO
				case 3:
					console.log("SERVICIO 3CREAR_PRODUCTO G"+req.body.grupo +" url:"+ this.get_url(req.body.grupo, req.body.servicio));
					switch (Number(req.body.grupo)) {

						case 1: // ------------------------------CREAR_PRODUCTO GRUPO 1 ----------------------------------------
							console.log("request body: " + req.body)
							//Formato a data
							let data = req.body; //se pasa la misma data (el servicio la filtra)
							await axios({
								method: 'post',
								url: this.get_url(req.body.grupo, req.body.servicio),
								data: data,
								headers: { 'Content-Type': 'application/json' },
							})
								.then(function (response: any) {
									// console.log("response");
									// console.log(response);
									res.statusCode = response.status;
									res.json(response.data);

								})
								.catch(function (error: any) {
									console.log("error login");
									console.error(error);
									res.statusCode = error.response.status;
									res.json(error.response.data);
								})
						break;


						default: // ------------------------------CREAR_PRODUCTO GRUPO 2 ----------------------------------------

							console.log(req.body);
							console.log(req.headers.token);
							//dando formato a la data:
							let data_producto = {
									"precio": Number(req.body.producto.precio),
									"stock": Number(req.body.producto.stock),
									"nombre": req.body.producto.nombre,
									"descripcion": req.body.producto.descripcion,
									"foto": req.body.producto.foto,
									"categorias": [req.body.producto.categoria],
								}

							console.log(data_producto);

								await axios({
									method: 'post',
									url: this.get_url(req.body.grupo, req.body.servicio),
									data: data_producto,
									headers: { 'Content-Type': 'application/json', 'token':req.headers.token}
								})
								.then(function (response: any) {
									console.log(response);
									console.log("Código de respuesta >>", response.status)
									if (response.status == 201 || response.status == 200) {
										rg.data = response.data
										rg.message =response.data.msg
									} else {
										rg.valid = false
										rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR:${response.statusText}`;
									}
									res.statusCode = response.status
									res.json({
										statusCode: res.statusCode,
										message: rg.message,
									  });
								})
								.catch(function (error: any) {
									console.log("error login");
									console.error(error);
									res.statusCode = error.response.status;
									res.json(error.response.data);
								})

							break;

					}
					break;
				//#endregion  SERVICIO3 CREAR_PRODUCTO


				//#region SERVICIO4 CATALOGO
				case 4:
					console.log("SERVICIO 4CATALOGOPRODUCTO G"+req.body.grupo +" url:"+ this.get_url(req.body.grupo, req.body.servicio));
					switch (Number(req.body.grupo)) {

						case 1: // ------------------------------CATALOGO GRUPO 1 ----------------------------------------
							console.log("request body: " + req.body)
							//Formato a data
							let data = req.body; //se pasa la misma data (el servicio la filtra)
							await axios({
								method: 'get',
								url: this.get_url(req.body.grupo, req.body.servicio),
								headers: { 'Content-Type': 'application/json' },
							})
								.then(function (response: any) {
									// console.log("response");
								 console.log(response.data);
									res.statusCode = response.status
									res.json(response.data);

								})
								.catch(function (error: any) {
									console.log("error login");
									console.error(error);
									rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR: ${error.response.statusText}` + " - >" + error.response.data.errors[0].message;
									console.log(rg.message);
									console.log(error);
									res.statusCode = error.response.status;
									res.json({message:rg.message});

								})
						break;


						default: // ------------------------------CATALOGO GRUPO2 ----------------------------------------

							console.log(req.body);
								await axios({
									method: 'get',
									url: this.get_url(req.body.grupo, req.body.servicio),
									headers: { 'Content-Type': 'application/json', 'token':req.headers.token}
								})
								.then(function (response: any) {
									//console.log(response);
									console.log("Código de respuesta >>", response.status)
									res.statusCode = response.status
									res.json({
										message: rg.message,
										data: response.data
									  });
								})
								.catch(function (error: any) {
									console.log("trono esa onda >",error.response.status);
									console.log("Error  : ",error);
									res.statusCode = error.response.status
									//rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR: ${error.response.statusText}` + " - >" + error.response.data.errors[0].message;
									console.log(rg.message);
									//console.log(error);
									res.json({message:rg.message});
								})

							break;

					}
					break;
				//#endregion SERVICIO4 CATALOGO


				//#region SERVICIO5 COMPRA
				case 5:
					console.log("SERVICIO 5COMPRA G"+req.body.grupo +" url:"+ this.get_url(req.body.grupo, req.body.servicio));
					switch (Number(req.body.grupo)) {
						case 1: // ------------------------------CATALOGO GRUPO 1 ----------------------------------------
							console.log("request body: " + req.body)
							//Formato a data
							let data = req.body; //se pasa la misma data (el servicio la filtra)
							await axios({
								method: 'post',
								url: this.get_url(req.body.grupo, req.body.servicio),
								data: data,
								headers: { 'Content-Type': 'application/json' },
							})
								.then(function (response: any) {
									// console.log("response");
									// console.log(response);
									res.statusCode = response.status;
									res.json(response.data);

								})
								.catch(function (error: any) {
									console.log("error login");
									console.error(error);
									res.statusCode = error.response.status;
									res.json(error.response.data);
								})

						break;

						default: // ------------------------------COMPRA GRUPO 2 ----------------------------------------

							console.log(req.body);
							console.log(req.headers.token);
							//dando formato a la data:
							let data_compra = {
									"idUser": req.body.cliente,
									"nombre": req.body.cliente,
									"nit": "92658938",
									"products": [req.body.detalle],
								}

							console.log(data_compra);

								await axios({
									method: 'post',
									url: this.get_url(req.body.grupo, req.body.servicio),
									data: data_compra,
									headers: { 'Content-Type': 'application/json', 'token':req.headers.token}
								})
								.then(function (response: any) {
									console.log(response);
									console.log("Código de respuesta >>", response.status)
									if (response.status == 201 || response.status == 200) {
										rg.data = response.data
										rg.message =response.data.msg
									} else {
										rg.valid = false
										rg.message = 'G' + req.body.grupo + "-S" + req.body.servicio + ` ERROR:${response.statusText}`;
									}
									 res.statusCode = response.status
									 res.json({
									 	statusCode: res.statusCode,
									 	message: rg.message,
									   });
								})
								.catch(function (error: any) {
									console.log("error login");
									console.error(error);
									res.statusCode = error.response.status;
									res.json(error.response.data);
								})

							break;


					}

				//#endregion SERVICIO5 COMPRA
			}

		} catch (error) {
			console.log("Error interno: "+error);
			res.statusCode = 500;
			res.json({ statusCode: res.statusCode, message: (error as Error).message });
		}
	}


	get_url(grupo: string, servicio: string): string {
		console.log("*+*g"+grupo+"  s"+servicio);

		return urls[Number(grupo) - 1][Number(servicio) - 1];

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


