import { PrismaClient } from '@prisma/client'
import Controller from './controller'
import Product from "../models/product"

class ProductController {
    public static async create(data: { name: string, price: number, enterpriseId: number }): Promise<Product> {
        return await Controller.create(new Product(data))
    }

    public static async delete(id: number): Promise<boolean> {
        return await Controller.delete(id, Product.get)
    }

    public static async get(id: number): Promise<Product | null> {
        return await Controller.get(id, Product.get)
    }

    public static async list(): Promise<Product[]> {
        return await Controller.list(Product.list)
    }

    public static async list_from_enterprise(enterpriseId: number): Promise<Product[]> {
        return await Controller.list(Product.list, {enterpriseId})
    }

    public static async update(data: { name: string, price: number, enterpriseId: number }, id: number): Promise<Product | null> {
        return await Controller.update(data, id, Product.get)
    }
}

export default ProductController