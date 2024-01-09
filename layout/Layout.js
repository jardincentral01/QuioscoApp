import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Modal from "react-modal";
import ModalProducto from "@/components/ModalProducto";
import useFrontera from "@/hooks/useFrontera";
import 'react-toastify/dist/ReactToastify.css';
import Pasos from "@/components/Pasos";


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#__next');

export default function Layout({children, pagina}) {

    const {modal, handleChangeModal, producto} = useFrontera()
    const message = pagina ? `Frontera - ${pagina}` : 'Frontera - Inicio';

    return (
        <>
            <Head>
                <title>{message}</title>
                <meta name="description" content="Los mejores churros de la frontera, ubicados en El Paso, Texas."/>
            </Head>

            <div className="md:flex">
                <aside className="flex flex-col justify-between md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <Sidebar/>
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen md:overflow-y-scroll">
                    
                    <div className="p-10 mt-10">
                        <Pasos/>
                        {children}
                    </div>
                </main>
            </div>

            {modal && (
                <Modal isOpen={modal} onRequestClose={handleChangeModal} style={customStyles}>
                    <ModalProducto/>
                </Modal>
            )}

            <ToastContainer />
        </>
    )
}
