
//Function for reset fields from storage
export const resetFields = ({ item, resetFns = {} }) => {
    const { 
        setFields, 
        setText,
        setSecretFriendRaw,
        setBucket,
        setOrganizer,
        setEventDate,
    } = resetFns

    switch (item) {
        //elimina los inputs de roulette
        case "input":
            if (setFields) {
                setFields([{ value: "" }])
                window.localStorage.removeItem("inputFields")
            }
            break
        //elimina el textarea de roulette
        case "textarea":
            if (setText) {
                setText("")
                window.localStorage.removeItem("textValue")
            }
            break
        //elimina todas las entradas de datos de secret-friend
        case "secret-friend":

            //resetea estados locales
            if (setSecretFriendRaw) {
                setSecretFriendRaw({
                    input:"",
                    status: 'initial',
                    errorMessage: ""
                })
            }

            if (setBucket) {
                setBucket({
                    amount: null,
                    status: 'initial',
                })
            }

            if (setOrganizer) {
                setOrganizer({
                    input: '',
                    status: 'intial',
                })
            }

            if (setEventDate) {
                setEventDate({
                    date: undefined,
                    status: 'initial',
                })
            }

            // resetea el localStorage            
            window.localStorage.removeItem("secretFriendRaw")
            window.localStorage.removeItem("bucket")
            window.localStorage.removeItem("organizer")
            window.localStorage.removeItem("eventDate")

            break
        default:
            console.warn(`resetFields: Tipo de item desconocido ${item}`)
    }
}


















// import { useEffect } from "react"

// //Save fields on LocalStorage
// export const saveToStorage = ({inputFields, textValue}) => {
//     useEffect(() => {
//         window.localStorage.setItem("inputFields", JSON.stringify(inputFields))
//     }, [inputFields])

//     useEffect(() => {
//         window.localStorage.setItem("textValue", textValue)
//     }, [textValue])
// }


// //Function for reset fields from storage
// export const resetFields = ({item, setInputFields, setTextValue}) => {
//     if (item === 'input' && setInputFields) {
//         setInputFields([{ value: "" }])    
//         // {setInputFields}
//         window.localStorage.removeItem('inputFields')
//         console.log("se eliminaron los inputs")
//     }
//     if (item === 'textarea' && setTextValue) {
//         setTextValue("")
//         // {setTextValue}
//         window.localStorage.removeItem('textValue')
//         console.log("se elimino el textarea")
//     } 
// }


///////////////////////////////////////////////////////////////////


    // //Save fields on LocalStorage
    // useEffect(() => {
    //     window.localStorage.setItem("inputFields", JSON.stringify(inputFields))
    // }, [inputFields])

    // useEffect(() => {
    //     window.localStorage.setItem("textValue", textValue)
    // }, [textValue])


    // //Function for reset fields
    // const resetFields = (item) => {
    //     if (item === 'input') {
    //         setInputFields([{ value: "" }])    
    //     }
    //     if (item === 'textarea') {
    //         setTextValue("")
    //     } 
    //     window.localStorage.removeItem('inputFields')
    //     window.localStorage.removeItem('textValue')
    // }