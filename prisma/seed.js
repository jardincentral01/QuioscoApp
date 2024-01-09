const {PrismaClient} = require('@prisma/client')
const {categorias, productos} = require('./data.js')

const prisma = new PrismaClient()

const load = async () =>{
    try {
        await prisma.categoria.createMany({
            data:categorias
        })

        await prisma.producto.createMany({
            data:productos
        })
        console.log('Seed completado')
    } catch (error) {
        console.log(error)
    }finally{
        prisma.$disconnect()
    }
}

load()