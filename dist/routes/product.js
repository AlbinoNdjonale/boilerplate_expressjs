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
const express_1 = require("express");
const product_1 = __importDefault(require("../views/product"));
const router = (0, express_1.Router)();
router.route('/').post((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield product_1.default.create(req, res); }));
router.route('/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield product_1.default.get(req, res); }));
router.route('/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield product_1.default.delete(req, res); }));
router.route('/').get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield product_1.default.list(req, res); }));
router.route('/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield product_1.default.update(req, res); }));
router.route('/from_enterprise/:enterprise_id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield product_1.default.list_from_enterprise(req, res); }));
exports.default = router;
