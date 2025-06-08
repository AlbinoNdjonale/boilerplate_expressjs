import { PrismaClient } from '@prisma/client'

class Product {
    protected id: number | null = null
    public name?: string = ''
    public price?: number
    public enterpriseId?: number
    public createdAt: Date | null = null

    constructor(data: { name?: string, price?: number, enterpriseId?: number, id?: number, createdAt?: Date }) {
        if ('name' in data) this.name = data.name
        if ('price' in data) this.price = data.price
        if ('enterpriseId' in data) this.enterpriseId = data.enterpriseId
        if ('createdAt' in data) this.createdAt = data.createdAt!
        if ('id' in data) this.id = data.id!
    }

    public get_id(): number | null {
        return this.id
    }

    public async save(prisma_client: PrismaClient) {
        const { id, createdAt, ...data } = this

        if (this.id !== null) {
            await prisma_client.product.update({
                where: { id: id! },
                data 
            })
        } else {
            const enterprise = await prisma_client.product.create({
                data: {
                    name: data.name!,
                    price: data.price!,
                    enterpriseId: data.enterpriseId!
                }
            })

            this.id = enterprise.id
        }
    }

    public async delete(prisma_client: PrismaClient): Promise<Boolean> {
        if (!this.id) return false

        await prisma_client.product.delete({where: {id: this.id!}})

        return true
    }

    public is_valid(): boolean {
        return (
            this.name !== '' &&
            this.price !== undefined &&
            this.enterpriseId !== undefined
        )
    }

    public static async get(prisma_client: PrismaClient, id: number): Promise<Product | null> {
        if (Number.isNaN(id)) return null
        
        const product = await prisma_client.product.findUnique({
            where: { id }
        })

        if (product) return new Product({
            ...product,
            price: Number(product.price)
        })

        return null
    }

    public static async list(prisma_client: PrismaClient, where: object = {}): Promise<Product[]> {
        const products = await prisma_client.product.findMany({where})

        return products.map(product => new Product({...product, price: Number(product.price)}))
    }
}

export default Product
