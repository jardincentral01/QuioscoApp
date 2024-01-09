import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if(req.method == 'GET'){
        const ordenes = await prisma.orden.findMany({
            where: {
                estado: false
            }
        })
        res.status(200).json({
            message: 'GET ORDENES',
            ordenes
        })

    }else if(req.method == 'POST'){
        const orden = await prisma.orden.create({
            data: req.body
        })
        res.status(201).json({
            success: 'Orden Creada',
            orden
        })
    }
}
