

export const asignSecretFriend = ({ participants }) => {
    // const availablesWithoutJoin = [...participants]
    // const availables = availablesWithoutJoin.join("")
    
    const textInputsStr = participants.replace(/[\r\n]+/g," ") //eliminando saltos de linea
    const textInputsArray = textInputsStr.split(" ") //convirtiendo en array
    const participantsArrayFiltered = textInputsArray.filter(input => {
        return input !== null && input !== undefined && input !== "" && input !== 0;
    }) //eliminando items vacios}
    
    // console.log(participantsArrayFiltered)
    
    if ( participantsArrayFiltered.length < 3 ) {
        return {
            asigns: null,
            disclaimer: true
        }
    }
    
    const asigns = {}
    const availablesArray = [...participantsArrayFiltered]

    for (const person of participantsArrayFiltered) {
        const availablePersons = availablesArray.filter(a => a !== person)

        if (availablePersons.length === 0) {
            return asignSecretFriend({participants})
        }

        const choosed = availablePersons[Math.floor(Math.random() * availablePersons.length)]

        asigns[person] = choosed

        availablesArray.splice(availablesArray.indexOf(choosed), 1)
    }

    // console.log(asigns)
    return {
        asigns,
        disclaimer: false
    }
}
