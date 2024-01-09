import Layout from "@/layout/Layout"
import { useEffect, useCallback } from "react"
import useFrontera from "@/hooks/useFrontera"
import { formatearDinero } from "@/utils"
import ItemCheckout from "@/components/ItemCheckout"

export default function Checkout() {

  const {pedido, nombre, setNombre, colocarOrden, total, clearPedido} = useFrontera()

  const pedidoVacio = useCallback(() =>{
    return pedido.length == 0 || nombre.length <= 2
  }, [pedido, nombre])

  useEffect(() =>{
    pedidoVacio()
  }, [pedido, pedidoVacio])

  return (
    <Layout pagina='Checkout'>
      <h1 className="text-4xl font-black">Checkout</h1>
      <div className="flex flex-col md:flex-row items-start">
        
        <div className="md:w-3/6 order-6 md:-order-none">
          <p className="text-2xl my-10">Confirma tu pedido a continuación.</p>
          <form onSubmit={colocarOrden}>
            <div>
              <label htmlFor="nombre" className="block uppercase text-slate-800 tex-xl">Nombre</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} id="nombre" type="text" className="bg-gray-200 w-full lg:w-8/12 mt-3 p-2 rounded-md"/>
            </div>

            <div className="mt-10">
              <p className="text-xl">Total a Pagar: <span className="font-bold">{formatearDinero(total)}</span></p>
            </div>

            <div className="mt-5">
              <input type="submit" className={`${pedidoVacio() ? 'bg-fuchsia-300 cursor-not-allowed' : 'bg-fuchsia-500 hover:bg-fuchsia-700 cursor-pointer'} transition-colors text-center w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`} value="Confirmar Pedido" disabled={pedidoVacio()}/>
            </div>
          </form>
        </div>

        <div className="md:w-3/6 shadow rounded-xl p-7 border-2 border-black h-auto order-1 md:order-none mt-10">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Orden</h3>
            {pedido.length >= 1 && <button onClick={clearPedido} className="text-stone-500">Limpiar Todo</button>}
          </div>

          {pedido.length >= 1 ? (
            <div className="mt-6">
              {pedido.map(item => (
                <ItemCheckout key={item.id} item={item}/>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-lg text-center">No hay productos añadidos.</p>
          )}
        </div>
      </div>
    </Layout>
  )
}
