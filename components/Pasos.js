import { useRouter } from "next/router"

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Checkout', url: '/checkout'},
]

export default function Pasos() {
    const router = useRouter();

    function handleProgreso(){
        let valor;
        if(router.pathname == '/'){
            valor = 4;
        }else if(router.pathname == '/resumen'){
            valor = 50
        }else{
            valor = 100
        }
        return `${valor}%`
    }

    return (
        <>
            <div className="flex justify-between mb-5">
                {pasos.map(paso => (
                    <button 
                        key={paso.paso} 
                        onClick={() => {
                            router.push(paso.url)
                        }} 
                        className="text-2xl font-bold"
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>

            <div className="bg-gray-100 mb-10">
                <div className="rounded-full bg-amber-500 text-xs leading-none text-center h-2 text-white" style={{width: handleProgreso()}}></div>
            </div>
        </>
    )
}
