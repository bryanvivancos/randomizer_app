import React from "react"
import { useState } from "react"

export const SecretFriendContext = React.createContext()

export const SecretFriendProvider = ( {children} ) => {
    const [ isValidate, setIsValidate ] = useState(false)

    return (
        <SecretFriendContext.Provider value= {{ isValidate, setIsValidate }}>
            {children}
        </SecretFriendContext.Provider>
    )
}
