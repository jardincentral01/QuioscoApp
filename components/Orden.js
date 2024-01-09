import Image from "next/image"
import { formatearDinero } from "@/utils"
import axios from "axios"
import { toast } from "react-toastify"

export default function Orden({orden}) {

    const {id, nombre, total, pedido} = orden

    async function completarOrden(){
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('¡Orden Completada!', {position: "bottom-left"})
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className="border p-10 space-y-5 rounded-2xl">
            <h3 className='text-2xl  font-bold'>Orden: {id}</h3>
            <p className='text-lg font-bold'>Cliente: {nombre}</p>

            <div>
                {pedido.map(itemState => (
                    <div key={itemState.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                        <div className="w-32">
                            <Image className="rounded-lg" width={200} height={250} src={`/assets/img/${itemState.imagen}.jpg`} alt={`Imagen ${itemState.nombre}`}/>
                        </div>

                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-amber-500">{itemState.nombre}</h4>
                            <p className="text-lg font-bold">Cantidad: {itemState.cantidad}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-4xl text-amber-500">Total a pagar: {formatearDinero(total)}</p>

                <button type="button" onClick={completarOrden} className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white uppercase rounded-lg px-10 py-3 mt-5 font-bold transition-colors">Completar Orden</button>
            </div>
        </div>
    )
}
