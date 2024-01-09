import { formatearDinero } from "@/utils"
import Image from "next/image"
import useFrontera from "@/hooks/useFrontera"

export default function ItemCheckout({item}) {

    const {id, nombre, precio, imagen, cantidad} = item
    const {handleClickCantidadCheckout} = useFrontera()

    return (
        <div className="py-5 md:py-5 flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between border-b last-of-type:border-none">
            <div className="flex gap-2 items-center">
                <Image className="rounded-xl" width={60} height={70} src={`/assets/img/${imagen}.jpg`} alt={`Imagen ${nombre}`}/>

                <div>
                    <p className="mb-2">{nombre}</p>
                    <p className="font-bold">{formatearDinero(precio * cantidad)}</p>
                </div>
            </div>


            <div className="flex gap-4 items-center justify-between md:justify-normal w-3/4 md:w-auto">
                <button className="text-amber-500" type="button" onClick={() => {
                        handleClickCantidadCheckout(id, -1)
                    }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <span className="text-2xl">{cantidad}</span>

                <button className="text-amber-500" type="button" onClick={() => handleClickCantidadCheckout(id, 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
