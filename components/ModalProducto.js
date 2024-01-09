import { useState, useEffect } from "react"
import Image from "next/image"
import useFrontera from "@/hooks/useFrontera"
import { formatearDinero } from "@/utils"

export default function ModalProducto() {

    const {handleChangeModal, handleAgregarPedido, producto, pedido} = useFrontera();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);
    const {nombre, precio, imagen} = producto

    // DEJAR QUE REACT SE ENCARGUE DE MODIFICAR EL STATE
    useEffect(() => {
        if(pedido.some(itemState => itemState.id == producto.id)){
            const itemEdicion = pedido.find(itemState => itemState.id == producto.id)
            setEdicion
            setCantidad(itemEdicion.cantidad)
            setEdicion(true)
        }
    }, [producto, pedido])

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image width={300} height={400} src={`/assets/img/${imagen}.jpg`} alt={`Imagen de ${nombre}`}/>
            </div>

            <div className="md:w-2/3 relative">
                <div className="absolute right-0 -top-2">
                    <button onClick={handleChangeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <h1 className="text-xl font-bold mt-5">{nombre}</h1>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

                <div className="flex gap-4 mt-5">
                    <button type="button" onClick={() => {
                            if(cantidad <= 1) return
                            setCantidad(cantidad-1)
                        }
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <span className="text-2xl">{cantidad}</span>

                    <button type="button" onClick={() => setCantidad(cantidad+1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <button className="bg-fuchsia-500 hover:bg-fuchsia-700 uppercase text-white px-5 py-3 w-full md:w-auto rounded mt-5 font-bold transition-colors" type="button" onClick={() => {
                    handleAgregarPedido({...producto, cantidad})
                }}>
                    {edicion ? 'Guardar Cambios' : 'Agregar al Pedido'}
                </button>
            </div>
        </div>
    )
}
