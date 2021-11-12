import { Console } from "console";
import { Request, Response } from "express";
import { resGen } from "../models/resGen";
//paquete de mongodb
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const axios = require('axios')
const URL_LOCAL = "http://localhost:3000";

var urls: string[][] = [
	//GRUPO1 
	[
		"http://localhost:3000/sa/user/add",
		"http://localhost:3000/sa/user/login",
		"http://localhost:3000/sa/product/add",
		"http://localhost:3000/sa/catalogue",
	],

	//GRUPO2 
	[
		"http://174.138.109.46/api/users/signup",
		"http://174.138.109.46/api/users/signin",
		"http://174.138.109.46/api/providers/newProduct",
		"http://174.138.109.46/api/providers/allProducts"
	],

	//GRUPO3
	[
		"/api/users/signup",
		"/api/users/signin",
		"/api/providers/newProduct",
		"/api/providers/allProducts"
	],
	//GRUPO4 
	[
		"/api/users/signup",
		"/api/users/signin",
		"/api/providers/newProduct",
		"/api/providers/allProducts"
	],
	//GRUPO5 
	[
		"/api/users/signup",
		"/api/users/signin",
		"/api/providers/newProduct",
		"/api/providers/allProducts"
	],
	//GRUPO6
	[
		"http://sa-g6.herokuapp.com/api/users/signup",
		"http://sa-g6.herokuapp.com/api/users/signin",
		"http://sa-g6.herokuapp.com/api/providers/newProduct",
		"http://sa-g6.herokuapp.com/api/providers/allProducts"
	],
	//GRUPO7
	[
		"http://34.125.197.251:3000/api/users/signup",
		"http://34.125.197.251:3000/api/users/signin",
		"http://34.125.197.251:3000/api/providers/newProduct",
		"http://34.125.197.251:3000/api/providers/allProducts"
	],
	//GRUPO8 
	[
		"http://3.12.103.111:4000/api/users/signup",
		"http://3.12.103.111:4000/api/users/signin",
		"http://3.12.103.111:4000/api/providers/newProduct",
		"http://3.12.103.111:4000/api/providers/allProducts"
	],

]


class Bus {

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
				//#endregion  SERVICIO3 CREAR_PRODUCTO
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


