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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const enterprise_1 = __importDefault(require("../models/enterprise"));
class EnterpriseController {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield controller_1.default.create(new enterprise_1.default(data));
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield controller_1.default.delete(id, enterprise_1.default.get);
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield controller_1.default.get(id, enterprise_1.default.get);
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield controller_1.default.list(enterprise_1.default.list);
        });
    }
    static update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield controller_1.default.update(data, id, enterprise_1.default.get);
        });
    }
}
exports.default = EnterpriseController;
