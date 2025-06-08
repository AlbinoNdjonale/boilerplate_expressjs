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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(data) {
        this.id = null;
        this.name = '';
        this.createdAt = null;
        if ('name' in data)
            this.name = data.name;
        if ('price' in data)
            this.price = data.price;
        if ('enterpriseId' in data)
            this.enterpriseId = data.enterpriseId;
        if ('createdAt' in data)
            this.createdAt = data.createdAt;
        if ('id' in data)
            this.id = data.id;
    }
    get_id() {
        return this.id;
    }
    save(prisma_client) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this, { id, createdAt } = _a, data = __rest(_a, ["id", "createdAt"]);
            if (this.id !== null) {
                yield prisma_client.product.update({
                    where: { id: id },
                    data
                });
            }
            else {
                const enterprise = yield prisma_client.product.create({
                    data: {
                        name: data.name,
                        price: data.price,
                        enterpriseId: data.enterpriseId
                    }
                });
                this.id = enterprise.id;
            }
        });
    }
    delete(prisma_client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id)
                return false;
            yield prisma_client.product.delete({ where: { id: this.id } });
            return true;
        });
    }
    is_valid() {
        return (this.name !== '' &&
            this.price !== undefined &&
            this.enterpriseId !== undefined);
    }
    static get(prisma_client, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Number.isNaN(id))
                return null;
            const product = yield prisma_client.product.findUnique({
                where: { id }
            });
            if (product)
                return new Product(Object.assign(Object.assign({}, product), { price: Number(product.price) }));
            return null;
        });
    }
    static list(prisma_client, where = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma_client.product.findMany({ where });
            return products.map(product => new Product(Object.assign(Object.assign({}, product), { price: Number(product.price) })));
        });
    }
}
exports.default = Product;
