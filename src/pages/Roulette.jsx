import { useState } from "react"
import DeleteButton from "../components/atoms/DeleteButton";
import FieldsButton from "../components/atoms/FieldsButton";
// import InputBox from "../components/atoms/InputBox";
import WinnerModal from "../components/WinnerModal";
import confetti from "canvas-confetti";
import {Input} from "@heroui/input";
import { useEffect } from "react";

function Roulette() {

    // const [inputFields, setInputFields] = useState([{ value: "" }])
    const [inputFields, setInputFields] = useState(() => {
        //Getting fields from LocalStorage
        const inputsFieldsFromStorage = window.localStorage.getItem("inputFields")
        if (inputsFieldsFromStorage) {
            const parsedFields = JSON.parse(inputsFieldsFromStorage);
            if (Array.isArray(parsedFields) && parsedFields.length > 0) {
                return parsedFields;
            }
        }
        return [{ value: "" }]
    })
    const [noWinners, setInputWinners] = useState("")
    const [winners, setWinners] = useState([])
    const [showModal, setShowModal] = useState(false) //enseña ganadores en modal
    const [showAlert, setShowAlert] = useState(false) //enseña alerta si cantidad de ganadores no es la correcta

    // //Function to update number of winners
    // const handleWinnerValue = (event) => {
    //     setInputWinners(event.target.value)
    // }
    
    // //Function to update the value of an input field
    const handleValueChange = (index, event) => {
        const values = [...inputFields];
        values[index].value = event;
        setInputFields(values)
    };

    //Function to add new input field
    const handleAddFields = () => {
        setInputFields([...inputFields, { value: "" }])
    }

    //Function to remove input field
    const handleRemoveFields = (index) => {
        const newInputFields = [...inputFields]
        newInputFields.splice(index,1)
        setInputFields(newInputFields)
    }

    const selectWinner = (noWinners) => {

        //Selecting only the input fields
            const inputsArray = []
            const inputs = [...inputFields]
            inputs.map((inputField) => {
                inputField.value
                inputsArray.push(inputField.value)
            })

        //  EJECUTAMOS SELECCIONAR GANADORES SI LA CANTIDAD DE ESTOS ES MENOR A LA CANTIDAD DE PARTICIPANTES
        if (inputsArray.length > parseInt(noWinners)) {
            // Desordenamos el array usando el algoritmo de Fisher-Yates
            for (let i = inputsArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [inputsArray[i], inputsArray[j]] = [inputsArray[j], inputsArray[i]];
            }
            
            // Retornamos los primeros 'cantidad' elementos
            setWinners(inputsArray.slice(0,parseInt(noWinners)))
            //Activamos modal para ganadores
            setShowModal(true)
        } else {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
    }

    //Save fields on LocalStorage
    useEffect(() => {
        window.localStorage.setItem("inputFields", JSON.stringify(inputFields))
    }, [inputFields])

        //Function for reset fields
    const resetFields = () => {
        setInputFields([{ value: "" }])
        window.localStorage.removeItem('inputFields')
    }

    return (
        <div className="font-Inter-Variable text-white flex flex-col items-center gap-8 my-14">
            <h1 className="text-5xl font-bold text-balance">Bienvenido a Roulette</h1>
            <p className="text-xs text-center max-w-xl px-2 text-balance">Ingresa los participantes y dale click al botón de debajo para escoger los ganadores aleatoriamente. SUERTE!</p>
            <h2 className="text-xl font-bold">Ingresa a los participantes</h2>
                
            <div className="flex flex-col gap-4 justify-center items-center border-2 border-gray-700 p-4 rounded-2xl bg-gray-800">

                {/* // INPUTS PARA INGRESAR PARTICIPANTES  */}
                {inputFields.map((inputField, index) => (
                    <div className="flex justify-center items-center gap-4" key={index}>

                        <Input
                            isRequired 
                            placeholder= "Ingresa un participante"
                            value={inputField.value}
                            onValueChange={(e) => handleValueChange(index,e)}
                            className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900 min-w-28"
                            classNames={{
                                innerWrapper: "outline-none",
                                mainWrapper: "outline-none",
                                input: "outline-none"
                            }}
                        />
                        {/* <InputBox 
                            placeholder={"Ingresa un participante"}
                            value={inputField.value}
                            onChange={(e) => handleValueChange(index,e)}/> */}

                        {/* // BOTON PARA ELIMINAR CASILLA DE GANADORES */}
                        <DeleteButton 
                        onClick={() => handleRemoveFields(index)}/>
                    </div>
                ))}
            
                {/* // BONTON PARA AGREGAR CASILLA DE PARTICIPANTES  */}
                <div className="flex gap-2">
                    <FieldsButton
                    onClick={handleAddFields}
                    textOnBtn={"Añadir participante"}
                    icon={"plus"}/>
                    <FieldsButton
                        onClick={resetFields}
                        textOnBtn={"Reset"}
                        icon={"restart-icon"}/>
                </div>
            </div>

            {/* // INPUT PARA INGRESAR CANTIDAD DE GANADORES */}
            <Input
                isRequired
                placeholder= "Cantidad de ganadores"
                value={noWinners}
                onValueChange={setInputWinners}
                className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900 w-auto min-w-28"
                classNames={{
                    innerWrapper: "outline-none",
                    mainWrapper: "outline-none",
                    input: "outline-none"
                }}
            />
            {/* <InputBox 
                placeholder={"Cantidad de ganadores"}
                value={noWinners}
                onChange={(e) => handleWinnerValue(e)}
                /> */}

            {/* // ALERTA QUE INDICA QUE LA CANTIDAD DE GANADORES DEBE SER MENOR A LA CANTIDAD DE PARTICIPANTES  */}
            {showAlert && (
                <p className="text-white text-xs">
                    La cantidad de ganadores a escoger debe ser un número y menor a la cantidad de participantes
                </p>
            )}

            {/* // BOTON PARA ESCOGER GANADORES */}
            <button className="border-2 border-sky-400 bg-sky-500 rounded-2xl w-40 h-12  font-Inter-Variable font-bold animate-pulsing animate-iteration-count-infinite cursor-pointer mt-8" onClick={() => selectWinner(noWinners)}>
                Ganador/es
            </button>

            {/* // ENSEÑA MODAL CON LOS GANADORES */}
            {showModal && (
                confetti({
                    particleCount: 60,
                    spread: 100,
                    origin: { y: 0.8 }
                }),
                <WinnerModal 
                    winners={winners}
                    onClose={() => setShowModal(false)}/>
            )}
        </div>
    )
    }

export default Roulette
