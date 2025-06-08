import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'

interface Model {
    is_valid: () => Boolean,
    get_id: () => number | null
}

const error_ = (res: Response, error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') { // Verifica se trata-se de erro de duplicação de atributo unique
        res.status(400)

        res.json({detail: `Os valores para os campos [${(error.meta?.target as Array<string>).join(', ')}] não podem ser duplicados. por favor use outros valores`})

        return
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        res.status(400)

        res.json({detail: `Referência a registro não existente`})

        return
    }

    res.status(500)
    
    res.json({detail: 'Erro no servidor'})
}

class View {
    public static async create<M extends Model>(req: Request, res: Response, model_name: string, create: (data: any) => Promise<M>) {
        try {
            const data = req.body

            const model = await create(data)

            if (!model.is_valid()) {
                res.status(400)
    
                res.json({detail: 'Verifique os seus dados de entrada'})
    
                return
            }

            const url = `${req.protocol}://${req.host}${req.originalUrl}`
            const location = `${url}/${model.get_id()!}`
    
            res.status(201)
    
            res.header('Location', location)
    
            res.json({detail: `${model_name} Criada`})
        } catch (error) {
            error_(res, error)
        }
    }

    public static async get<M extends Model>(req: Request, res: Response, model_name: string, get: (id: number) => Promise<M | null>) {
        try {
            const id: number = Number(req.params.id)

            const model = await get(id)

            if (!model) {
                res.status(404)

                res.json({detail: `${model_name} não encontrada`})

                return
            }

            res.json(model)
        } catch (error) {
            error_(res, error)
        }
    }

    public static async delete(req: Request, res: Response, model_name: string, delete_: (id: number) => Promise<boolean>) {
        try {
            const id: number = Number(req.params.id)

            if (!(await delete_(id))) {
                res.status(404)

                res.json({detail: `${model_name} não encontrada`})

                return
            }

            res.json({detail: `${model_name} deletada com sucesso`})
        } catch (error) {
            error_(res, error)
        }
    }

    public static async list<M extends Model>(res: Response, list: () => Promise<M[]>) {
        try {
            const models = await list()

            res.json(models)
        } catch (error) {
            error_(res, error)
        }
    }

    public static async update<M extends Model>(req: Request, res: Response, model_name: string, update: (data: any, id: number) => Promise<M | null>) {
        try {
            const data = req.body
            const id: number = Number(req.params.id)

            const model = await update(data, id)

            if (!model) {
                res.status(404)

                res.json({detail: `${model_name} não encontrada`})

                return
            }

            if (!model.is_valid()) {
                res.status(400)
    
                res.json({detail: 'Verifique os seus dados de entrada'})
    
                return
            }

            res.json({detail: `${model_name} atualizada`})
        } catch (error) {
            error_(res, error)
        }
    }
}

export default View