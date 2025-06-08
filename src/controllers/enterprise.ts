import Controller from './controller'
import Enterprise from "../models/enterprise"

class EnterpriseController {
    public static async create(data: { name: string }): Promise<Enterprise> {
        return await Controller.create(new Enterprise(data))
    }

    public static async delete(id: number): Promise<boolean> {
        return await Controller.delete(id, Enterprise.get)
    }

    public static async get(id: number): Promise<Enterprise | null> {
        return await Controller.get(id, Enterprise.get)
    }

    public static async list(): Promise<Enterprise[]> {
        return await Controller.list(Enterprise.list)
    }

    public static async update(data: {name: string}, id: number): Promise<Enterprise | null> {
        return await Controller.update(data, id, Enterprise.get)
    }
}

export default EnterpriseController