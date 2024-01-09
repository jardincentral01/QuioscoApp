import Layout from "@/layout/Layout"
import useFrontera from "@/hooks/useFrontera"
import Item from "@/components/Item"

export default function Resumen() {
    const {pedido} = useFrontera()

    return (
        <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black">Resumen</h1>

            {pedido.length == 0 ? (
                <p className="text-center text-2xl">No hay Productos en tu Carrito</p>
            ) : (
                <>
                    <p className="text-2xl my-10">Revisa tu pedido.</p>

                    {pedido.map(item => (
                        <Item key={item.id} item={item}/>
                    ))}
                </>
            )}
        </Layout>
    )
}
