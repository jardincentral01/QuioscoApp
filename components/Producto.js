import Image from "next/image"
import { formatearDinero } from "@/utils"
import useFrontera from "@/hooks/useFrontera"

export default function Producto({producto}) {
    const {imagen, precio, nombre, id} = producto
    const {handleClickProducto, handleChangeModal} = useFrontera()

    return (
        <div className="border p-3 rounded-2xl flex flex-col items-center">
            <Image className="rounded-lg" width={300} height={450} style={{height: 'auto'}} src={`/assets/img/${imagen}.jpg`} alt={`Imagen ${nombre}`}/>

            <div className="p-5 h-full flex flex-col justify-between">
                <h3 className="text-xl font-bold">{nombre}</h3>
                <p className="mt-4 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

                <button type="button" className="border bg-fuchsia-500 hover:bg-fuchsia-700 text-white transition-colors p-3 w-full uppercase font-bold mt-3 rounded-md" 
                onClick={() => {
                        handleClickProducto(producto),
                        handleChangeModal()
                    }
                }>Agregar</button>
            </div>
        </div>
    )
}
