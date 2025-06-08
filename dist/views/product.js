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
const product_1 = __importDefault(require("../controllers/product"));
const view_1 = __importDefault(require("./view"));
class ProductView {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield view_1.default.create(req, res, 'Produto', product_1.default.create);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield view_1.default.get(req, res, 'Produto', product_1.default.get);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield view_1.default.delete(req, res, 'Produto', product_1.default.delete);
        });
    }
    static list(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield view_1.default.list(res, product_1.default.list);
        });
    }
    static list_from_enterprise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const enterpriseId = Number(req.params.enterprise_id);
            yield view_1.default.list(res, () => __awaiter(this, void 0, void 0, function* () { return yield product_1.default.list_from_enterprise(enterpriseId); }));
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield view_1.default.update(req, res, 'Produto', product_1.default.update);
        });
    }
}
exports.default = ProductView;
