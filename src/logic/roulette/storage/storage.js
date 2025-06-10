import { useEffect } from "react"

//Save fields on LocalStorage
export const saveToStorage = ({inputFields, textValue}) => {
    useEffect(() => {
        window.localStorage.setItem("inputFields", JSON.stringify(inputFields))
    }, [inputFields])

    useEffect(() => {
        window.localStorage.setItem("textValue", textValue)
    }, [textValue])
}

//Function for reset fields from storage
export const resetFields = ({item, setInputFields, setTextValue}) => {
    if (item === 'input' && setInputFields) {
        setInputFields([{ value: "" }])    
        // {setInputFields}
        window.localStorage.removeItem('inputFields')
        console.log("se eliminaron los inputs")
    }
    if (item === 'textarea' && setTextValue) {
        setTextValue("")
        // {setTextValue}
        window.localStorage.removeItem('textValue')
        console.log("se elimino el textarea")
    } 
}

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