import Image from "next/image"
import useFrontera from "@/hooks/useFrontera";

export default function Categoria({categoria}) {
    const {id, nombre, icono} = categoria;
    const {categoriaActual, handleClickCategoria} = useFrontera()

    return (
        <button onClick={() => handleClickCategoria(id)} type="button" className={`${categoriaActual?.id == id ? 'bg-amber-400' : ''} flex items-center gap-4 p-5 border w-1/4 md:w-full hover:bg-amber-400 flex-shrink-0 flex-initial md:h-1/6`}>
            <Image width={80} height={80} src={`/assets/img/icono_${icono}.svg`} alt={`Icono ${nombre}`}/>
            <span className="font-bold text-xl hidden md:inline">{nombre}</span>
        </button>
    )
}
