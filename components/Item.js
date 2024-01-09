import Image from "next/image"
import { formatearDinero } from "@/utils"
import useFrontera from "@/hooks/useFrontera"

export default function Item({item}) {

    const {handleEditarCantidades, handleEliminarItem} = useFrontera()
    return (
        <div className="shadow py-5 px-8 md:p-5 mb-3 flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/6">
                <Image width={300} height={400} src={`/assets/img/${item.imagen}.jpg`} alt={`Imagen ${item.nombre}`}/>
            </div>

            <div className="md:w-4/6">
                <p className="text-3xl font-bold">{item.nombre}</p>
                <p className="text-xl font-bold mt-2">Cantidad: {item.cantidad}</p>
                <p className="text-xl font-bold mt-2 text-amber-500">Precio: {formatearDinero(item.precio)}</p>
                <p className="text-sm text-gray-700 mt-2">Subtotal: {formatearDinero(item.precio * item.cantidad)}</p>
            </div>

            <div className="md:w-1/6">
                <button onClick={ () => handleEditarCantidades(item.id)} className="bg-sky-700 flex items-center px-5 py-2 gap-2 text-white rounded font-bold uppercase shadow-md hover:bg-sky-900 transition-colors w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                    Editar
                </button>

                <button onClick={ () => handleEliminarItem(item.id)} className="bg-red-700 flex items-center px-5 py-2 gap-2 text-white rounded font-bold uppercase shadow-md hover:bg-sky-900 transition-colors w-full mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    Eliminar
                </button>
            </div>
        </div>
    )
}
