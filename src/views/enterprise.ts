import { Request, Response } from 'express'
import EnterpriseController from '../controllers/enterprise'

import View from './view'

class EnterpriseView {
    public static async create(req: Request, res: Response) {
        await View.create(req, res, 'Empresa', EnterpriseController.create)
    }

    public static async get(req: Request, res: Response) {
        await View.get(req, res, 'Empresa', EnterpriseController.get)
    }

    public static async delete(req: Request, res: Response) {
        await View.delete(req, res, 'Empresa', EnterpriseController.delete)
    }

    public static async list(_req: Request, res: Response) {
        await View.list(res, EnterpriseController.list)
    }

    public static async update(req: Request, res: Response) {
        await View.update(req, res, 'Empresa', EnterpriseController.update)
    }
}

export default EnterpriseView