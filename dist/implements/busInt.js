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
    //^Verifica las credenciales de un usuario para permitirlo ingresar al sistema
    FGbusDirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rg = new resGen_1.resGen();
                rg = yield this.bus(req);
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
                        login: {
                            correct: false,
                            userType: null,
                            token: null
                        },
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
    bus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const rg = new resGen_1.resGen();
            try {
                //console.log();
                rg.valid = true;
                rg.data = { "res": "ok" };
            }
            catch (error) {
                rg.valid = false;
                rg.message = error.message;
            }
            finally {
                return rg;
            }
        });
    }
}
exports.default = Bus;
//# sourceMappingURL=busInt.js.map