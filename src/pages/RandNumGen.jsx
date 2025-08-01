import { Input } from "@heroui/input";
import { useState } from "react";
import { generateRandomNum } from "../logic/rand-number-generator/generateRandomNum"; //FUNCION QUE GENERA EL NUMERO ALEATORIO

const RandNumGen = () => {
    const [minInputField, setMinInputField] = useState(0)
    const [maxInputField, setMaxInputField] = useState(0)
    const [result, setResult] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    // //FUNCION QUE GENERA EL NUMERO ALEATORIO
    // const generateRandomNum = (min, max) => {
    //     //VERIFICA QUE HAYA CONTENIDO EN LOS INPUTS


    //     if ( parseInt(max) > 0 && parseInt(max) >= parseInt(min) ) {
    //         min = Math.ceil(min);
    //         max = Math.floor(max);
    //         const randomNum = Math.floor(Math.random() * (max - min + 1) + min)
    //         setShowAlert(false)
    //         setResult(randomNum)
    //     }else {
    //         setResult(null)
    //         setShowAlert(true)
    //         setTimeout(() => {
    //             setShowAlert(false)
    //         }, 5000)
    //     }
    // }

    const handleGenerateNum = (min,max) => {
        const { result: newResult, showAlert: newShowAlert } = generateRandomNum({ min, max }) 

        setResult(newResult)
        setShowAlert(newShowAlert)
        
        // console.log(newResult)
        // console.log(newShowAlert)

        if (newShowAlert) {
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }

    }

    return (
        <div className="font-Inter-Variable text-white flex flex-col items-center gap-8 my-14">
            <h1 className="text-5xl font-bold text-balance text-center">Bienvenido al Generador de Numeros Aleatorio</h1>
            <p className="text-sm text-center max-w-xl px-2 text-balance">Ingresa número mínimo y máximo para escoger un número aleatorio</p>

            <div className="flex flex-col gap-4 justify-center items-center border-2 border-gray-700 p-4 rounded-2xl bg-gray-800">
                <Input
                    isRequired
                    label= "Número mínimo"
                    labelPlacement="outside-left"
                    placeholder= "Número Mínimo"
                    value={minInputField}
                    onValueChange={setMinInputField}
                    className="gap-2"
                    // className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900 w-auto min-w-28"
                    classNames={{
                        mainWrapper: "outline-none border-2 rounded-xl p-2 border-sky-700 bg-sky-900 w-full w-42",
                        base: "flex justify-between",
                        input: "outline-none",
                    }}
                />

                <Input
                    isRequired
                    label= "Número máximo"
                    labelPlacement="outside-left"
                    placeholder= "Número máximo"
                    value={maxInputField}
                    onValueChange={setMaxInputField}
                    className="gap-2"
                    // className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900 w-auto min-w-28"
                    classNames={{
                        mainWrapper: "outline-none border-2 rounded-xl p-2 border-sky-700 bg-sky-900 w-full w-42",
                        base: "flex justify-between",
                        input: "outline-none",
                    }}
                />

                {!showAlert && 
                    <p className="font-bold text-2xl text-white">{result}</p>
                }

                    {/* // ALERTA QUE INDICA QUE DEBEN HABER NUMEROS EN LOS INPUTS  */}
                {showAlert && (
                    <p className="text-white text-sm text-center">
                        Debe ingresar números en la parte superior y el número mínimo debe ser menor al máximo.
                    </p>
                )}

                <button className="border-2 border-sky-400 bg-sky-500 rounded-2xl w-40 h-12 font-Inter-Variable font-bold animate-pulsing animate-iteration-count-infinite cursor-pointer mb-4" onClick={() => handleGenerateNum(minInputField,maxInputField)}>
                    Generar
                </button>

            </div>
        </div>
    )
}

export default RandNumGen