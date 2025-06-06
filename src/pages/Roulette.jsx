import { useState } from "react"
import DeleteButton from "../components/atoms/DeleteButton";
import AddButton from "../components/atoms/AddButton";
import InputBox from "../components/atoms/InputBox";

function Roulette() {

    const [inputFields, setInputFields] = useState([{ value: "" }])

    const [inputWinners, setInputWinners] = useState("")

    //Function to update number of winners
    const handleWinnerValue = (event) => {
        setInputWinners(event.target.value)
    }
    
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
            <h2 className="text-xl font-bold">Ingresa a los participantes</h2>
                
            <div className="flex flex-col gap-4 justify-center items-center border-2 border-gray-700 p-4 rounded-2xl bg-gray-800">
                {inputFields.map((inputField, index) => (
                    <div className="flex justify-center items-center gap-4" key={index}>

                        <InputBox 
                            placeholder={"Ingresa un participante"}
                            value={inputField.value}
                            onChange={(e) => handleValueChange(index,e)}/>

                        <DeleteButton 
                        onClick={() => handleRemoveFields(index)}/>

                    </div>
                ))}
            
                <AddButton
                    onClick={handleAddFields}
                    textOnBtn={"Añadir participante"}/>
            </div>
            
            <InputBox 
                placeholder={"Cantidad de ganadores"}
                value={inputWinners}
                onChange={(e) => handleWinnerValue(e)}
                />
            
            <h2 className="text-xl font-bold">Veamos al ganador/es!</h2>

            <button className="border-2 border-sky-400 bg-sky-500 rounded-2xl w-40 h-12  font-Inter-Variable font-bold hover:animate-pulsing cursor-pointer" onClick={()=>console.log(inputFields, inputWinners)}>
                SPIN
            </button>
        </div>
    )
    }

export default Roulette
