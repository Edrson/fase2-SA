"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resGen_1 = require("../models/resGen");
//paquete de mongodb
//uri de la BD, user, pass en mongodb
const uri = "mongodb+srv://admin:451432@cluster0.1fct6.mongodb.net/retryWrites=true&w=majority";
const axios = require('axios');
class Bus {
    FGbusDirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                switch (req.body.grupo) {
                    case 1:
                        //^Pruebas con nuestro back-------------------------------------------------
                        axios.get(`http://34.125.203.249/sa/user/data/${req.body.iduser}`)
                            .then(function (response) {
                            console.log("data Respuest:", response);
                        })
                            .catch(function (error) {
                            // handle error
                            console.log(error);
                        });
                    case 26: //^ Grupos 2 y 6 ----------------------------------------------------------
                        if (req.body.servicio == 1) { //^ registro de usuario
                            yield axios({
                                method: 'post',
                                url: 'http://174.138.109.46/api/users/signup',
                                data: {
                                    nombre: req.body.nombre,
                                    apellido: req.body.apellido,
                                    correo: req.body.correo,
                                    password: req.body.password,
                                    tipo: req.body.tipo,
                                    tarjetas: {
                                        titular: req.body.titular,
                                        numero: req.body.numero,
                                        vencimiento: req.body.vencimiento
                                    },
                                },
                                headers: { 'Content-Type': 'application/json' },
                            })
                                .then(function (response) {
                                console.log("Código de respuesta >>", response.status);
                                if (response.status == 201 || response.status == 200) {
                                    rg.valid = true;
                                    rg.data = response.data;
                                }
                                else {
                                    rg.valid = false;
                                    rg.message = `Error en registro grupo 2 o 6 -->${response.statusText}`;
                                    res.statusCode = response.status;
                                }
                            })
                                .catch(function (error) {
                                //console.log("trono esa onda >",error.response.status);
                                //console.log("trono esa onda2 >",error.response.statusText);
                                res.statusCode = error.response.status;
                                rg.valid = false;
                                rg.message = `Error en registro grupo 2 o 6 -->${error.response.statusText}`;
                            });
                        }
                        else if (req.body.servicio == 2) { //^ Login
                            yield axios({
                                method: 'post',
                                url: 'http://174.138.109.46/api/users/signin',
                                data: {
                                    correo: req.body.correo,
                                    password: req.body.password
                                },
                                headers: { 'Content-Type': 'application/json' },
                            })
                                .then(function (response) {
                                if (response.status == 201 || response.status == 200) {
                                    rg.valid = true;
                                    rg.data = response.data;
                                }
                                else {
                                    rg.valid = false;
                                    rg.message = response.statusText;
                                }
                            })
                                .catch(function (error) {
                                res.statusCode = error.response.status;
                                rg.valid = false;
                                rg.message = error.response.statusText;
                            });
                        }
                        else if (req.body.servicio == 3) { // ^ Crear producto
                            yield axios({
                                method: 'post',
                                url: 'http://174.138.109.46/api/providers/newProduct',
                                data: {
                                    nombre: req.body.nombre,
                                    descripcion: req.body.descripcion,
                                    foto: req.body.foto,
                                    precio: req.body.precio,
                                    stock: req.body.stock
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                    'token': req.headers.authorization
                                },
                            })
                                .then(function (response) {
                                if (response.status == 201 || response.status == 200) {
                                    rg.valid = true;
                                    rg.data = response.data;
                                }
                                else {
                                    rg.valid = false;
                                    rg.message = response.statusText;
                                }
                            })
                                .catch(function (error) {
                                res.statusCode = error.response.status;
                                rg.valid = false;
                                rg.message = error.response.statusText;
                            });
                        }
                        else if (req.body.servicio == 4) { // ^ Obtener productos       
                            yield axios({
                                method: 'get',
                                url: 'http://174.138.109.46/api/providers/products',
                                headers: {
                                    'token': req.headers.authorization
                                },
                            })
                                .then(function (response) {
                                if (response.status == 201 || response.status == 200) {
                                    rg.valid = true;
                                    rg.data = response.data;
                                }
                                else {
                                    rg.valid = false;
                                    rg.message = response.statusText;
                                }
                            })
                                .catch(function (error) {
                                res.statusCode = error.response.status;
                                rg.valid = false;
                                rg.message = error.response.statusText;
                            });
                        }
                        else if (req.body.servicio == 5) { // ^ Crear tarjeta
                            yield axios({
                                method: 'post',
                                url: 'http://174.138.109.46/api/customers/card',
                                data: {
                                    titular: req.body.titular,
                                    numero: req.body.numero,
                                    vencimiento: req.body.vencimiento
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                    'token': req.headers.authorization
                                },
                            })
                                .then(function (response) {
                                if (response.status == 201 || response.status == 200) {
                                    rg.valid = true;
                                    rg.data = response.data;
                                }
                                else {
                                    rg.valid = false;
                                    rg.message = response.statusText;
                                }
                            })
                                .catch(function (error) {
                                res.statusCode = error.response.status;
                                rg.valid = false;
                                rg.message = error.response.statusText;
                            });
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
                        data: rg.data,
                    });
                }
                else {
                    res.json({
                        statusCode: res.statusCode,
                        message: rg.message,
                    });
                }
            }
            catch (error) {
                console.log("Error en metodo FGLogin");
                res.statusCode = 500;
                res.json({ statusCode: res.statusCode, message: error.message });
            }
        });
    }
}
exports.default = Bus;
//# sourceMappingURL=busInt.js.map