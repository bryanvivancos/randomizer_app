import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import {Form} from "@heroui/form";
import { Input, Textarea } from "@heroui/input"
import {NumberInput} from "@heroui/number-input";
import {DateInput} from "@heroui/date-input";
import { CalendarIcon } from "../assets/CalendarIcon";
import {CalendarDate} from "@internationalized/date";
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
        return bucketFromStorage ? Number(bucketFromStorage) : null
    })
    
    const [ organizer, setOrganizer ] = useState(() => {
        const organizerFromStorage = window.localStorage.getItem('organizer')
        return organizerFromStorage ? organizerFromStorage : ""
    })

    const [eventDate, setEventDate] = useState(() => {
        const eventSaved = window.localStorage.getItem("eventDate");
        if (eventSaved) {
            try {
            const { year, month, day } = JSON.parse(eventSaved);
            return new CalendarDate(year, month, day);
            } catch {
            return new CalendarDate(1995, 11, 6);
            }
        }
        return new CalendarDate(1995, 11, 6);
    });
        
    const [secretFriendsAsigns, setSecretFriendsAsigns] = useState({})

    const [showDisclaimer, setShowDisclaimer] = useState(false)
    
    // Guarda en el local Storage
    // Texto de participantes
    useSaveToStorage({
        key: "secretFriendRaw",
        value: secretFriendRaw
    })

    //Presupuesto
    useSaveToStorage({
        key: "bucket",
        value: bucket
    })

    //Organizador
    useSaveToStorage({
        key: "organizer",
        value: organizer
    })

    //Fecha del evento
    useSaveToStorage ({
        key: "eventDate",
        value: eventDate ? JSON.stringify({
            year: eventDate.year,
            month: eventDate.month,
            day: eventDate.day
        }) : ""
    })


    const navigate = useNavigate()
    const handleSecretFriend = (participants) => {
        const {asigns, disclaimer}= asignSecretFriend({participants})
        
        if (typeof asigns !== 'object' || disclaimer === true){
            navigate("/secret-friend")
            return
        }
        
        console.log("Secret friends: ", asigns, "Disclaimer: ",disclaimer, "Presupuesto: ", bucket, "Organizador: ", organizer )

        navigate("/secret-friend-sent-confirmation", {
            state:{
                asigns,
                bucket,
                organizer,
                eventDate
            }
        })
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

            <Form className="flex items-center">
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
                        input: "outline-none"
                    }}
                />

                <FieldsButton
                    onClick={() =>
                        resetFields({
                            item: "secret-friend",
                            resetFns: { setText: setSecretFriendRaw}
                        })
                    }
                    textOnBtn={"Reset"}
                    icon={"restart-icon"}/>
            
            </div>

            <NumberInput
                isRequired
                placeholder="0.00"
                label="Presupuesto"
                labelPlacement="outside"
                value={bucket}
                onValueChange={v => setBucket(v)}
                className="max-w-sm"
                classNames={{
                    label:"relative pb-4",
                    clearButton:"pointer-events-auto",
                    input:"outline-none",
                    inputWrapper:"flex flex-col items-start",
                    innerWrapper:"flex bg-sky-900 border-2 border-sky-700 rounded-xl px-3 gap-2"
                }}
                // endContent={
                    //     <div className="flex items-center">
                    //     <label className="sr-only" htmlFor="currency">
                    //         Currency
                    //     </label>
                    //     {/* <select
                    //         aria-label="Select currency"
                    //         className="rounded-xl outline-none outline-transparent border-0 bg-sky-700 text-default-400 text-small"
                    //         defaultValue="PEN"
                    //         id="currency"
                    //         name="currency"
                    //         >
                    //         <option aria-label="US Dollar" value="USD">
                    //         USD
                    //         </option>
                    //         <option aria-label="Sol Peruano" value="PEN">
                    //         PEN
                    //         </option>
                    //     </select> */}
                    //     </div>
                    // }
                // eslint-disable-next-line no-console}
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

            <DateInput
                label="Fecha del evento"
                labelPlacement="outside"
                value={eventDate}
                onChange={setEventDate}
                placeholderValue={new CalendarDate(1995, 11, 6)}
                startContent={
                    <CalendarIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                }
                errorMessage={(value) => {
                    if (value.isInvalid) {
                        return "Please enter a valid date.";
                    }
                }}
                className="max-w-sm"
                classNames={{
                    label:"px-3",
                    segment:"focus-visible:border-b-2 border-sky-200 focus-visible:outline-hidden",
                    innerWrapper:"bg-sky-900 border-2 border-sky-700 rounded-xl px-3 py-2 outline-none gap-2"
                }}
            />

            {showDisclaimer && (
            <p className="text-white text-sm text-center max-w-xl mt-4">
                {disclaimerDisplay}
            </p>
            )}

            <div className="border-2 border-gray-500 rounded-full w-2xl my-4"></div>

                <button 
                    className="border-2 border-sky-400 bg-sky-500 rounded-2xl w-40 h-12  font-Inter-Variable font-bold cursor-pointer" 
                    onClick={() => {handleSecretFriend(secretFriendRaw)}}
                    >
                    Empieza el juego
                </button>
            </Form>
        </div>
    )
}