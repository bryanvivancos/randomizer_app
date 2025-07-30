import { useEffect } from "react";

export function useSaveToStorage ({ key, value }) {
    useEffect(() => {
        window.localStorage.setItem(key, value) //no colocamos json.stringigy(value), lo colocamo despues en caso se necesite
    }, [key, value])
} 




// export function useSaveToStorage () {
//     const [field, setFields] = useState("")
//     const [text, setText] = useState("")

//       useEffect(() => {
//         window.localStorage.setItem("inputFields", JSON.stringify(field))
//     }, [field])

//     useEffect(() => {
//         window.localStorage.setItem("textValue", string)
//     }, [string])

// } 