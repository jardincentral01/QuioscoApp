import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    if(req.method == 'GET'){
        const ordenEncontrada = await prisma.orden.findUnique({
            where:{
                id: parseInt(req.query.id)
            }
        })
        res.status(200).json({
            message: 'GET ID',
            ordenEncontrada
        })
    }else if(req.method == 'POST'){
        const {id} = req.query;

        const ordenActualizada = await prisma.orden.update({
            where:{
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })
        res.status(200).json(ordenActualizada)
        console.log(ordenActualizada)
    }
    
}
