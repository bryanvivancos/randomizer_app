import { useEffect } from "react"

const WinnerModal = ({ winners, onClose }) => {

    useEffect(() => {
        // Forzar scroll al top
        window.scrollTo(0, 0);
        //Bloquear scroll al renderizar componente
        document.body.style.overflow = "hidden"
        
        // Función que cierra modal al presionar ESC
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        
        //Agrega el listener de la teclas
        window.addEventListener("keydown", handleEsc)

        //Cleanup
        return () => {
            window.removeEventListener("keydown", handleEsc)
            //Restaurar scroll al desmontar componente
            document.body.style.overflow = ""
        }
    }, [onClose])

    //Detectar click en el fondo
    const handleBackgroundClick = (e) => {  
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    // useEffect(() => {
    //     // Forzar scroll al top
    //     window.scrollTo(0, 0);
    //     //Bloquear scroll al renderizar componente
    //     document.body.style.overflow = "hidden"
    //     return () => {
    //         //Restaurar scroll al desmontar componente
    //         document.body.style.overflow = ""
    //     }
    // }, [])


return (
        <section className="absolute w-dvw h-dvh top-0 left-0 grid place-items-center bg-[#000000b3] overflow-hidden"
            onClick={handleBackgroundClick}>
            <div className="bg-sky-700 h-auto w-72 border-2 border-sky-500 rounded-2xl flex flex-col justify-center items-center gap-4 py-8">

                <h2 className="font-Inter-Variable font-bold text-xl">Ganador/es:</h2>
                
                <ul className= "text-center">
                    {winners.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
                <button 
                    className="border-2 border-sky-500 bg-sky-950 py-2 px-4 rounded-2xl cursor-pointer"
                    onClick={onClose}
                    >
                    Cerrar
                </button>

                {/* <footer>
                    <button className="font-Inter-Variable font-bold text-xs">
                        Nuevo Juego
                    </button>
                </footer> */}
            </div>
        </section>
    )
}

export default WinnerModal