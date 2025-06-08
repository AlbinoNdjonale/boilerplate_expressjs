import { Request, Response } from 'express'
import ProductController from '../controllers/product'

import View from './view'

class ProductView {
    public static async create(req: Request, res: Response) {
        await View.create(req, res, 'Produto', ProductController.create)
    }

    public static async get(req: Request, res: Response) {
        await View.get(req, res, 'Produto', ProductController.get)
    }

    public static async delete(req: Request, res: Response) {
        await View.delete(req, res, 'Produto', ProductController.delete)
    }

    public static async list(_req: Request, res: Response) {
        await View.list(res, ProductController.list)
    }

    public static async list_from_enterprise(req: Request, res: Response) {
        const enterpriseId = Number(req.params.enterprise_id)

        await View.list(res, async () => await ProductController.list_from_enterprise(enterpriseId))
    }

    public static async update(req: Request, res: Response) {
        await View.update(req, res, 'Produto', ProductController.update)
    }
}

export default ProductView