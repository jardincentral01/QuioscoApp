import Layout from '@/layout/Layout'
import Producto from '@/components/Producto'
import useFrontera from '@/hooks/useFrontera'

export default function Home() {

  const {categoriaActual} = useFrontera()

  return (
    <Layout pagina={categoriaActual?.nombre}>
      <h1 className='font-black text-4xl '>{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación.</p>

      <div className='grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {categoriaActual?.productos?.map((producto) => (
          <Producto key={producto.id} producto={producto}/>
        ))}
      </div>
    </Layout>
  )
}
