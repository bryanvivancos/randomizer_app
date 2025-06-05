import { useState } from "react"
import sprite from '../assets/sprite.svg'

function Roulette() {

    const [inputFields, setInputFields] = useState([{ value: "" }])

    //Function to update the value of an input field
    const handleValueChange = (index, event) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
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

    return (
        <div className="font-Inter-Variable text-white flex flex-col items-center gap-8 my-14">
            <h1 className="text-5xl font-bold">Bienvenido a Roulette</h1>
            <h2 className="text-2xl font-bold">Ingresa a los participantes</h2>
            <div className="flex items-center justify-center w-full">
                
                <div className="flex flex-col gap-4 justify-center items-center">
                    {inputFields.map((inputField, index) => (
                        <div className="flex justify-center gap-2" key={index}>
                            <input type="text" 
                                placeholder="Ingresa un participante"
                                value={inputField.value}
                                className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900"
                                onChange={(e) => handleValueChange(index,e)}/>

                            <button className="border-2 border-red-600 bg-red-950 rounded-xl size-10 flex justify-center items-center p-1"
                                onClick={() => handleRemoveFields(index)}>
                                <svg>
                                    <use href={`${sprite}#trash`}/>
                                </svg>
                            </button>
                        </div>
                    ))}
                

                    <button className="border-2 border-sky-500 w-60 rounded-xl bg-gray-800 p-1"
                        onClick={handleAddFields}>
                        <span className="flex gap-2 items-center justify-center">Añadir participante
                            <svg className="size-8 p-1" color="#efb100">
                                <use href={`${sprite}#plus`} />
                            </svg>
                        </span>
                    </button>
                </div>
                
            </div>
        </div>
    )
    }

export default Roulette
