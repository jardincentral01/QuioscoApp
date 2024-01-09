import AdminLayout from "@/layout/AdminLayout"
import useSWR from "swr"
import Orden from "@/components/Orden"

export default function admin() {

    async function fetcher(){
        const respuesta = await fetch('/api/ordenes')
        const resultado = await respuesta.json()
        return resultado.ordenes
    }

    const {error, data, isLoading} = useSWR('/api/ordenes', fetcher, {
        refreshInterval: 100
    })
    console.log(data)

    return (
        <AdminLayout pagina="Admin">
            <h1 className='font-black text-4xl'>Admin</h1>
            <p className='text-2xl my-10'>Administra las ordenes.</p>

            {data && data.length ? data.map(orden => (
                <Orden key={orden.id} orden={orden} />
            )) : <p>No hay ordenes pendientes</p>}
        </AdminLayout>
    )
}
