import { PrismaClient } from '@prisma/client'

class Enterprise {
    protected id: number | null = null
    public name: string = ''
    public createdAt: Date | null = null

    constructor(data: { name: string, id?: number, createdAt?: Date }) {
        if ('name' in data) this.name = data.name

        if ('id' in data) this.id = data.id!
        if ('createdAt' in data) this.createdAt = data.createdAt!
        
    }

    public get_id(): number | null {
        return this.id
    }

    public async save(prisma_client: PrismaClient) {
        const { id, createdAt, ...data } = this

        if (this.id !== null) {
            await prisma_client.enterprise.update({
                where: { id: id! },
                data 
            })
        } else {
            const enterprise = await prisma_client.enterprise.create({
                data
            })

            this.id = enterprise.id
        }
    }

    public async delete(prisma_client: PrismaClient): Promise<Boolean> {
        if (!this.id) return false

        await prisma_client.enterprise.delete({where: {id: this.id!}})

        return true
    }

    public is_valid(): boolean {
        return this.name !== ''
    }

    public static async get(prisma_client: PrismaClient, id: number): Promise<Enterprise | null> {
        if (Number.isNaN(id)) return null
        
        const enterprise = await prisma_client.enterprise.findUnique({
            where: { id }
        })

        if (enterprise) return new Enterprise(enterprise)

        return null
    }

    public static async list(prisma_client: PrismaClient, where: object = {}): Promise<Enterprise[]> {
        const enterprises = await prisma_client.enterprise.findMany({where})

        return enterprises.map(enterprise => new Enterprise(enterprise))
    }
}

export default Enterprise;