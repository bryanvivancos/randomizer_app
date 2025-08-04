import { useState } from "react"
import { Navigate, useNavigate } from 'react-router-dom'
import { Input, Textarea } from "@heroui/input"
import {NumberInput} from "@heroui/number-input";
import {DateInput} from "@heroui/date-input";
import { CalendarIcon } from "../assets/CalendarIcon";
import {CalendarDate} from "@internationalized/date";
import FieldsButton from "../components/atoms/FieldsButton"
import { resetFields } from "../logic/roulette/storage/resetFields"
import {asignSecretFriend} from "../logic/secret-friend/secret-friend"
import { useSaveToStorage } from "../hooks/hooks";


//TO DO AUTH ROUTE
// export const AuthRoute = () => {

//     if (validateInputs(participants)) {
//             navigate('/secret-friend')
//             return
//         }
//     return (
//         <div>SecretFriend</div>
//     )
// }


export const SecretFriend = () => {
    //Getting fields from TextArea LocalStorage
    const [secretFriendRaw, setSecretFriendRaw] = useState(() => {
        const textValuesFromStorage = window.localStorage.getItem("secretFriendRaw")
        return {
            input: textValuesFromStorage ? textValuesFromStorage : "",
            status: 'initial',
            errorMessage: '',
        }
    })

    const [ bucket, setBucket ] = useState(() => {
        const bucketFromStorage = window.localStorage.getItem('bucket')
        return {
            amount: bucketFromStorage ? Number(bucketFromStorage) : "null", 
            status: 'initial'
        } 
    })
    
    const [ organizer, setOrganizer ] = useState(() => {
        const organizerFromStorage = window.localStorage.getItem('organizer')
        return {
            input: organizerFromStorage ? organizerFromStorage : "",
            status: 'initial'
        }
    })

    const [eventDate, setEventDate] = useState(() => {
        const dateSaved = window.localStorage.getItem("eventDate");
        if (dateSaved) {
            try {
            const { year, month, day } = JSON.parse(dateSaved);
                if ( year && month && day ) {
                    return {
                        date: new CalendarDate(year, month, day),
                        status: 'initial'
                    } 
                }
            } catch (e) {
            // return new CalendarDate(1995, 11, 6);
            // return {
            //     date: null,
            //     status: 'initial'
            //     }
                console.warn("Error parsing event date from storage", e)
            }
        }
        // return new CalendarDate(1995, 11, 6);
        return {
            date: null,
            status: 'initial'
        }
    });

    const [showTextareaAlert, setShowTextareAlert] = useState(false)
        
    // const [secretFriendsAsigns, setSecretFriendsAsigns] = useState({})
    
    // Guarda en el local Storage
    // Texto de participantes
    useSaveToStorage({
        key: "secretFriendRaw",
        value: secretFriendRaw.input
    })

    //Presupuesto
    useSaveToStorage({
        key: "bucket",
        value: bucket.amount
    })

    //Organizador
    useSaveToStorage({
        key: "organizer",
        value: organizer.input
    })

    //Fecha del evento
    useSaveToStorage ({
        key: "eventDate",
        value: eventDate.date ? JSON.stringify({
            year: eventDate.date.year,
            month: eventDate.date.month,
            day: eventDate.date.day
        }) : ""
    })

    const navigate = useNavigate()
    
    const validateInputs = (participants) => {
        let hasError = false
        const {asigns, hasLessThanThree, isEmpty}= asignSecretFriend({participants})


        if (typeof asigns !== 'object' || isEmpty === true) {
            setSecretFriendRaw( prev => ({...prev ,status: 'error', errorMessage: 'Este campo es obligatorio'}))
            hasError = true

            console.log("error participants: ", hasError, "hasLessThanThree", hasLessThanThree, "participantes", asigns)
        }

        if (hasLessThanThree === true) {
            setSecretFriendRaw( prev => ({...prev ,status: 'error', errorMessage: 'Ingresa de 3 a más participantes para jugar'}))
            hasError = true

            console.log("error participants: ", hasError, "hasLessThanThree", hasLessThanThree, "participantes", asigns)
        }

        if (!bucket.amount || bucket.amount <= 0 || typeof bucket.amount !== 'number') {
            setBucket(prev => ({...prev, status: 'error'}))
            hasError = true
        }

        if (!organizer.input.trim()) {
            setOrganizer(prev => ({ ...prev, status: 'error' }))
            hasError = true
        }

        if (!eventDate.date) {
            setEventDate(prev => ({ ...prev, status: 'error' }))
            hasError = true
        }

        return hasError
    }

    const handleSecretFriend = (participants) => {
        const {asigns}= asignSecretFriend({participants})
        
        console.log("Secret friends: ", asigns, "Presupuesto: ", bucket.amount, "Organizador: ", organizer.input )

        navigate("/secret-friend-sent-confirmation", {
            state:{
                asigns,
                bucket,
                organizer,
                eventDate
            }
        })
    }

    const handleClick = (participants) => {
        // console.log(!validateInputs(participants))
        if (validateInputs(participants)) {
            // navigate('/secret-friend')
            return <Navigate to="/secret-friend"/>
        }
        handleSecretFriend(participants)
    }

    return (
        <div className="font-Inter-Variable text-white flex flex-col items-center gap-4 my-14">

            <h1 className="text-5xl font-bold text-balance text-center">Bienvenido a Amigo Secreto</h1>

            {/* // INGRESA LOS PARTICIPANTES EN UN TEXTAREA */}
            <h2 className="text-xl font-bold">Ingresa a todos los participantes</h2>

            <div className="flex flex-col gap-4 justify-center items-center border-2 border-sky-700 p-2 rounded-2xl bg-gray-800 max-w-sm w-full">

                <Textarea
                    onClick={() => setShowTextareAlert(true)}
                    labelPlacement="outside"
                    placeholder="Ingresa a todos los participantes"
                    description="❗Importante: Ingresa un nombre uno debajo de otro para su correcto funcionamiento."
                    value={secretFriendRaw.input}
                    onChange={e => setSecretFriendRaw({
                        input: e.target.value,
                        status: 'initial'
                    })}
                    // onValueChange={setSecretFriendRaw}
                    variant="underlined"
                    classNames={{
                        input: "outline-none",
                        helperWrapper:`mt-2  ${showTextareaAlert ? "block" : ""} text-balance text-gray-400 text-xs text-center`,
                        // description:"text-balance text-gray-400 text-xs text-center"
                    }}
                />
            </div>

            {secretFriendRaw.status === 'error' && (
                <span className="text-red-500 text-sm">{secretFriendRaw.errorMessage}</span>
            )}

            <NumberInput
                isRequired
                placeholder="0.00"
                label="Presupuesto"
                labelPlacement="outside"
                value={bucket.amount}
                onChange={e => setBucket({
                    amount: Number(e.target.value), 
                    status:'initial'})}
                // isInvalid={bucket.status === 'error'}
                // onValueChange={v => setBucket(v)}
                className="max-w-sm"
                classNames={{
                    label:"relative pb-3",
                    clearButton:"pointer-events-auto",
                    input:"outline-none",
                    inputWrapper:"flex flex-col items-start",
                    innerWrapper:"flex bg-sky-900 border-2 border-sky-700 rounded-xl px-3 gap-2",
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
                // // eslint-disable-next-line no-console}
            />

            {bucket.status === 'error' && (
                <span className="text-red-500 text-sm">Este campo es obligatorio.</span>
            )}

            <Input
                label="Organizador"
                labelPlacement="outside-top"
                placeholder="Ingresa tu nombre"
                value={organizer.input}
                onChange={e => {setOrganizer({ input: e.target.value, status: 'initial' })}}
                // onValueChange={}
                isInvalid = {organizer.status === 'error'}
                type="text"
                className="max-w-sm"
                classNames={{
                    base:"items-start",
                    inputWrapper:"flex flex-col items-start",
                    input:"outline-none",
                    innerWrapper:"bg-sky-900 border-2 border-sky-700 rounded-xl px-3 py-2 outline-none gap-2"
                }}
            />

            {organizer.status === 'error' && (
                <span className="text-red-500 text-sm">Este campo es obligatorio.</span>
            )}

            <DateInput
                label="Fecha del evento"
                labelPlacement="outside"
                value={eventDate.date ?? null}
                onChange={value => setEventDate({ date: value, status: 'initial' })}
                placeholderValue={new CalendarDate(1995, 11, 6)}
                startContent={
                    <CalendarIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
                }
                // errorMessage={(value) => {
                //     if (value.isInvalid) {
                //         return "Please enter a valid date.";
                //     }
                // }}
                className="max-w-sm"
                classNames={{
                    label:"px-3",
                    segment:"focus-visible:border-b-2 border-sky-200 focus-visible:outline-hidden",
                    innerWrapper:"bg-sky-900 border-2 border-sky-700 rounded-xl px-3 py-2 outline-none gap-2"
                }}
            />

            {eventDate.status === 'error' && (
                <span className="text-red-500 text-sm">Este campo es obligatorio.</span>
            )}

            <div className="border-2 border-gray-500 rounded-full w-2xl my-4"/>

            <div className="flex gap-4 ">
                {/* // boton iniciar el juego */}
                <button 
                    className="border-2 border-sky-400 bg-sky-500 rounded-xl w-auto font-Inter-Variable font-bold cursor-pointer hover:scale-105 px-2 shadow-black" 
                    // onClick={() => {handleSecretFriend(secretFriendRaw)}}
                    onClick={() => {handleClick(secretFriendRaw.input)}}
                >
                    Empieza el juego
                </button>

                {/* // boton de reset entradas de datos y localStorage */}
                <FieldsButton
                    onClick={() =>
                        resetFields({
                            item: "secret-friend",
                            resetFns: {
                                setSecretFriendRaw,
                                setBucket,
                                setOrganizer,
                                setEventDate,
                            }
                        })
                    }
                    textOnBtn={"Reset"}
                    icon={"restart-icon"}
                />
            
            </div>
        </div>
    )
}