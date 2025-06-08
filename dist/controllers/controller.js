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
class Controller {
    static create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma_client = new client_1.PrismaClient();
            if (model.is_valid())
                yield model.save(prisma_client);
            prisma_client.$disconnect();
            return model;
        });
    }
    static delete(id, get) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma_client = new client_1.PrismaClient();
            const model = yield get(prisma_client, id);
            if (model)
                yield model.delete(prisma_client);
            prisma_client.$disconnect();
            return model !== null;
        });
    }
    static get(id, get) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma_client = new client_1.PrismaClient();
            const model = yield get(prisma_client, id);
            prisma_client.$disconnect();
            return model;
        });
    }
    static list(list, where = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma_client = new client_1.PrismaClient();
            const models = yield list(prisma_client, where);
            prisma_client.$disconnect();
            return models;
        });
    }
    static update(data, id, get) {
        return __awaiter(this, void 0, void 0, function* () {
            const prisma_client = new client_1.PrismaClient();
            const model = yield get(prisma_client, id);
            if (!model) {
                return null;
            }
            for (const key in data) {
                model[key] = data[key]; // Eu odeio type script :)
            }
            if (model.is_valid())
                yield model.save(prisma_client);
            prisma_client.$disconnect();
            return model;
        });
    }
}
exports.default = Controller;
