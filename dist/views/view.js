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
const client_1 = require("@prisma/client");
const error_ = (res, error) => {
    var _a;
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') { // Verifica se trata-se de erro de duplicação de atributo unique
        res.status(400);
        res.json({ detail: `Os valores para os campos [${((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target).join(', ')}] não podem ser duplicados. por favor use outros valores` });
        return;
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        res.status(400);
        res.json({ detail: `Referência a registro não existente` });
        return;
    }
    res.status(500);
    res.json({ detail: 'Erro no servidor' });
};
class View {
    static create(req, res, model_name, create) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const model = yield create(data);
                if (!model.is_valid()) {
                    res.status(400);
                    res.json({ detail: 'Verifique os seus dados de entrada' });
                    return;
                }
                const url = `${req.protocol}://${req.host}${req.originalUrl}`;
                const location = `${url}/${model.get_id()}`;
                res.status(201);
                res.header('Location', location);
                res.json({ detail: `${model_name} Criada` });
            }
            catch (error) {
                error_(res, error);
            }
        });
    }
    static get(req, res, model_name, get) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const model = yield get(id);
                if (!model) {
                    res.status(404);
                    res.json({ detail: `${model_name} não encontrada` });
                    return;
                }
                res.json(model);
            }
            catch (error) {
                error_(res, error);
            }
        });
    }
    static delete(req, res, model_name, delete_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (!(yield delete_(id))) {
                    res.status(404);
                    res.json({ detail: `${model_name} não encontrada` });
                    return;
                }
                res.json({ detail: `${model_name} deletada com sucesso` });
            }
            catch (error) {
                error_(res, error);
            }
        });
    }
    static list(res, list) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const models = yield list();
                res.json(models);
            }
            catch (error) {
                error_(res, error);
            }
        });
    }
    static update(req, res, model_name, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const id = Number(req.params.id);
                const model = yield update(data, id);
                if (!model) {
                    res.status(404);
                    res.json({ detail: `${model_name} não encontrada` });
                    return;
                }
                if (!model.is_valid()) {
                    res.status(400);
                    res.json({ detail: 'Verifique os seus dados de entrada' });
                    return;
                }
                res.json({ detail: `${model_name} atualizada` });
            }
            catch (error) {
                error_(res, error);
            }
        });
    }
}
exports.default = View;
