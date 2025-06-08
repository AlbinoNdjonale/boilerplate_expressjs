import { PrismaClient } from '@prisma/client'

type Get<T> = (prisma_client: PrismaClient, id: number) => Promise<T | null>

interface Model {
    is_valid: () => boolean
    save: (prisma_client: PrismaClient) => Promise<void>
    delete: (prisma_client: PrismaClient) => Promise<Boolean>
}

class Controller {
    public static async create<T extends Model>(model: T): Promise<T> {
        const prisma_client = new PrismaClient()
        
        if (model.is_valid())
            await model.save(prisma_client);

        prisma_client.$disconnect()

        return model
    }

    public static async delete<T extends Model>(id: number, get: Get<T>): Promise<boolean> {
        const prisma_client = new PrismaClient()
        
        const model = await get(prisma_client, id)

        if (model)
            await model.delete(prisma_client)

        prisma_client.$disconnect()

        return model !== null
    }

    public static async get<T extends Model>(id: number, get: Get<T>): Promise<T | null> {
        const prisma_client = new PrismaClient()

        const model = await get(prisma_client, id)

        prisma_client.$disconnect()

        return model
    }

    public static async list<T extends Model>(list: (prisma_client: PrismaClient, where: object) => Promise<T[]>, where: object = {}): Promise<T[]> {
        const prisma_client = new PrismaClient()

        const models = await list(prisma_client, where)

        prisma_client.$disconnect()

        return models
    }

    public static async update<T extends Model>(data: object, id: number, get: Get<T>): Promise<T | null> {
        const prisma_client = new PrismaClient()

        const model = await get(prisma_client, id)

        if (!model) {
            return null
        }

        for (const key in data) {
            model[key as keyof typeof data] = data[key as keyof typeof data] // Eu odeio type script :)
        }

        if (model.is_valid())
            await model.save(prisma_client)

        prisma_client.$disconnect()

        return model
    }
}

export default Controller