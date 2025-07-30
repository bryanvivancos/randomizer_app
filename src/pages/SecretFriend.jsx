import { useState } from "react"
import { Input, Textarea } from "@heroui/input"
import FieldsButton from "../components/atoms/FieldsButton"
import { resetFields } from "../logic/roulette/storage/resetFields"
import {asignSecretFriend} from "../logic/secret-friend/secret-friend"
import { useSaveToStorage } from "../hooks/hooks";


export const SecretFriend = () => {
    //Getting fields from TextArea LocalStorage
    const [secretFriendRaw, setSecretFriendRaw] = useState(() => {
        const textValuesFromStorage = window.localStorage.getItem("secretFriendRaw")
        return textValuesFromStorage ? textValuesFromStorage : ""
    })

    const [ bucket, setBucket ] = useState(() => {
        const bucketFromStorage = window.localStorage.getItem('bucket')
        return bucketFromStorage ?? bucketFromStorage
    })
    
    const [ organizer, setOrganizer ] = useState(() => {
        const organizerFromStorage = window.localStorage.getItem('organizer')
        return organizerFromStorage ?? organizerFromStorage 
    })

    const [secretFriendsAsigns, setSecretFriendsAsigns] = useState({})
    const [showDisclaimer, setShowDisclaimer] = useState(false)
    
    // Guarda en el local Storage
    useSaveToStorage({
        key: "secretFriendRaw",
        value: secretFriendRaw
    })

    useSaveToStorage({
        key: "bucket",
        value: bucket
    })

    useSaveToStorage({
        key: "organizer",
        value: organizer
    })

    const handleSecretFriend = (participants) => {
        const {asigns, disclaimer}= asignSecretFriend({participants})
        console.log("Secret friends: ", asigns, "Disclaimer: ",disclaimer)
        setShowDisclaimer(disclaimer)
    //     setSecretFriendsAsigns(asigns)
    }

    let disclaimerDisplay = ""
    const participantsDisclaimer = "La cantidad de nombres para el juego debe ser mayor a tres"
    const bucketDisclaimer = "Introduce un Presupuesto"
    const organizerDisclaimer = "Introduce el nombre del organizador"

    if (showDisclaimer && bucket > 0 && organizer.length > 0) {
        disclaimerDisplay = participantsDisclaimer
    }
    // if (!showDisclaimer && bucket === 0 && organizer.length > 0) {
    //     disclaimerDisplay = participantsDisclaimer + bucketDisclaimer
    // }
    // if (showDisclaimer && bucket === 0 && organizer.length === 0) {
    //     disclaimerDisplay = participantsDisclaimer + bucketDisclaimer + organizerDisclaimer
    // }

    return (
        <div className="font-Inter-Variable text-white flex flex-col items-center gap-4 my-14">

                <h1 className="text-5xl font-bold text-balance text-center">Bienvenido a Amigo Secreto</h1>

                {/* // INGRESA LOS PARTICIPANTES EN UN TEXTAREA */}
                <h2 className="text-xl font-bold">Ingresa a todos los participantes</h2>

                <div className="flex flex-col gap-4 justify-center items-center border-2 border-gray-700 p-4 rounded-2xl bg-gray-800 max-w-sm w-full">

                    <Textarea
                        isRequired
                        labelPlacement="outside"
                        placeholder="Ingresa a todos los participantes"
                        value={secretFriendRaw}
                        onValueChange={setSecretFriendRaw}
                        variant="underlined"
                        className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900"
                        classNames={{
                            innerWrapper: "outline-none",
                            mainWrapper: "outline-none",
                            input: "outline-none"
                        }}
                    />

                    <FieldsButton
                        onClick={() =>
                            resetFields({
                                item: "textarea",
                                resetFns: { setText: setSecretFriendRaw }
                            })
                        }
                        textOnBtn={"Reset"}
                        icon={"restart-icon"}/>
                
                </div>


                <Input
                    isRequired
                    label="Presupuesto"
                    labelPlacement="outside-top"
                    placeholder="0.00"
                    value={bucket}
                    onValueChange={setBucket}
                    startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">S/.</span>
                    </div>
                    }
                    type="number"
                    className="max-w-sm"
                    classNames={{
                        base:"items-start",
                        inputWrapper:"flex flex-col items-start",
                        input:"outline-none",
                        innerWrapper:"flex bg-sky-900 border-2 border-sky-700 rounded-xl px-3 py-2 outline-none gap-2"
                    }}
                />

                <Input
                    isRequired
                    label="Organizador"
                    labelPlacement="outside-top"
                    placeholder="Ingresa tu nombre"
                    value={organizer}
                    onValueChange={setOrganizer}
                    type="text"
                    className="max-w-sm"
                    classNames={{
                        base:"items-start",
                        inputWrapper:"flex flex-col items-start",
                        input:"outline-none",
                        innerWrapper:"bg-sky-900 border-2 border-sky-700 rounded-xl px-3 py-2 outline-none gap-2"
                    }}
                />

                {showDisclaimer && (
                <p className="text-white text-sm text-center max-w-xl mt-4">
                    {disclaimerDisplay}
                </p>
                )}

                <button 
                className="border-2 border-sky-400 bg-sky-500 rounded-2xl w-40 h-12  font-Inter-Variable font-bold animate-pulsing animate-iteration-count-infinite cursor-pointer mt-4" 
                onClick={() => {handleSecretFriend(secretFriendRaw)}}
                >
                Jugar
            </button>

        </div>
    )
}