import Image from "next/image"
import Categoria from "./Categoria"
import useFrontera from "@/hooks/useFrontera"

export default function Sidebar() {

    const {categorias} = useFrontera()
    return (
        <>
            <Image className="mx-auto pt-5" width={150} height={70} src={'/assets/img/logo.svg'} alt="Logo Frontera Churos"/>

            <nav className="mt-10 flex flex-nowrap overflow-x-scroll md:block">
                {categorias.map((categoria) => (
                    <Categoria key={categoria.id} categoria={categoria}/>
                ))}
            </nav>
        </>
    )
}
