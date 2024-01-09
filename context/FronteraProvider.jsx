import { useState, useEffect, createContext } from "react";
import {toast} from 'react-toastify'
import { useRouter } from "next/router";

const FronteraContext = createContext();

function FronteraProvider({children}) {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const fetchCategorias = async () => {
        const respuesta = await fetch('/api/categorias')
        const resultado = await respuesta.json()
        setCategorias(resultado)
    }
    useEffect(() => {
        fetchCategorias()
    }, [])
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])
    useEffect(() => {
        const nuevoTotal = pedido.reduce((acc, value) => acc + (value.precio * value.cantidad), 0)
        setTotal(nuevoTotal)
    }, [pedido])

    function handleClickCategoria(id){
        const categoria = categorias.filter((categoria) => categoria.id == id)
        setCategoriaActual(categoria[0])
        if(router.pathname != '/') router.push('/')
    }

    function handleClickProducto(producto){
        setProducto(producto)
    }

    function handleChangeModal(){
        setModal(!modal)
    }

    function handleAgregarPedido({categoriaId, ...item}){
        //const {id, nombre, precio, cantidad} = item;
        if(pedido.some(itemState => itemState.id == item.id)){
            const pedidoActualizado = pedido.map(itemState => itemState.id == item.id ? item : itemState)
            /* const pedidoActualizado = pedido.map(itemState => {
                if(itemState.id == item.id){
                    return {
                        id,
                        nombre,
                        precio,
                        cantidad: itemState.cantidad + cantidad
                    }
                }
                return itemState
            }) */
            setPedido(pedidoActualizado)
            toast.success('¡Guardado Correctamente!');
        }else{
            setPedido([...pedido, item])
            toast.success('¡Producto Agregado!');
        }
        setModal(false)
    }

    function handleEditarCantidades(id){
        const productoFiltrado = pedido.find(item => item.id == id)
        setProducto(productoFiltrado)
        setModal(true)
    }
    function handleEliminarItem(id){
        const pedidoFiltrado = pedido.filter(item => item.id != id)
        setPedido(pedidoFiltrado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        const date = new Date().toLocaleDateString('es-MX', {day: '2-digit', month: '2-digit', year: 'numeric'})
        const orden = {
            nombre,
            fecha: date,
            total,
            pedido
        }
        const respuesta = await fetch('/api/ordenes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orden)
        })
        const resultado = await respuesta.json()

        if(resultado.success){
            setNombre('')
            setTotal(0)
            setPedido([])
            setProducto({})
            setCategoriaActual(categorias[0])
            router.push('/')
            setTimeout(() => {
                toast('¡🏆 Orden Creada!')
            }, 35)
        }
    }

    function handleClickCantidadCheckout(id, suma){
        let pedidoActualizado = pedido.map(itemState => {
            if(itemState.id == id){
                itemState.cantidad += suma
            }
            return itemState
        })
        pedidoActualizado = pedidoActualizado.filter(itemState => itemState.cantidad >= 1)
        setPedido(pedidoActualizado)
    }

    function clearPedido(){
        setPedido([])
    }

    return (
        <FronteraContext.Provider
            value={{
                //STATE
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleClickProducto,
                modal,
                handleChangeModal,
                pedido,
                nombre,
                setNombre,
                total,

                //FUNCIONES BOTONES
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarItem,
                colocarOrden,
                handleClickCantidadCheckout,
                clearPedido
            }}
        >
            {children}
        </FronteraContext.Provider>
    )
}

export {
    FronteraProvider
}

export default FronteraContext


