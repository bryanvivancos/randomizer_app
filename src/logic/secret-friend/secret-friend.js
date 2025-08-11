import { Navigate } from "react-router-dom"

export const asignSecretFriend = ({ participants }) => {
    
    // const textInputsStr = participants.replace(/[\r\n]+/g," ") //eliminando saltos de linea
    // const textInputsArray = textInputsStr.split(" ") //convirtiendo en array
    // const participantsArrayFiltered = textInputsArray.filter(input => {
    //     return input !== null && input !== undefined && input !== "" && input !== 0;
    // }) //eliminando items vacios}
    
    //valida si la entrada de datos de participantes no esta vacia
    
    const textInputsArray = participants.split(/\r?\n/) //convierte en array el input teniendo como divisor el salto de linea
    const participantsArrayFiltered = textInputsArray.filter(input => input) //filtra entre el array y selecciona solo elementos que tengan contenido
    
    if ( participantsArrayFiltered.length === 0 ) {
        return {
            asigns: null,
            hasLessThanThree: false,
            isEmpty: true
        }
    }

    //valida si la entrada de datos de participantes es de 3 a mas 
    if ( participantsArrayFiltered.length < 3 ) {
        return {
            asigns: null,
            hasLessThanThree: true,
            isEmpty: true
        }
    }
    
    const asigns = {}
    const availablesArray = [...participantsArrayFiltered]


    for (const person of participantsArrayFiltered) {
        const availablePersons = availablesArray.filter(a => a !== person)

        if (availablePersons.length === 0) {
            return asignSecretFriend({participants})
        }

        //selecciona un amigo secreto para el jugador seleccionado
        const choosed = availablePersons[Math.floor(Math.random() * availablePersons.length)]

        //asigna el amigo secreto al juador seleccionado
        asigns[person] = choosed

        //actualiza array
        availablesArray.splice(availablesArray.indexOf(choosed), 1)
    }

    //retorna el array de los jugadores, si es menos de 3 y si esta vacio
    return {
        asigns,
        hasLessThanThree: false,
        isEmpty: false
    }
}


//TO DO AUTH ROUTE, REFACTORIZAR FUNCIONES PARA CREAR UN COMPONENTE AUTH ROUTE

export const validateInputs = ({participants, bucket, organizer, eventDate }) => {

    //creamos errorMessages para guardar los mensajes de error 
    const errorMessages = {
        secretFriend: null,
        bucket: null,
        organizer: null,
        eventDate: null,
    }

    const {asigns, hasLessThanThree, isEmpty}= asignSecretFriend({participants})


    if (typeof asigns !== 'object' || isEmpty === true) {
        errorMessages.secretFriend = 'Este campo es obligatorio'
    }

    if (hasLessThanThree === true) {
        errorMessages.secretFriend = 'Ingrese de 3 a más participantes para jugar'
    }

    if (!bucket.amount || bucket.amount <= 0 || typeof bucket.amount !== 'number') {       
        errorMessages.bucket = 'Este campo es obligatorio'
    }

    if (!organizer.input.trim()) {
        errorMessages.organizer = 'Este campo es obligatorio'
    }

    if (!eventDate.date) {
        errorMessages.eventDate = 'Este campo es obligatorio'
    }

    // convierte en array errorMessages y manda false o true si es null o no 
    const hasError = !(Object.values(errorMessages).every(e => e === null))

    return {hasError, errorMessages}
}


// export const AuthRoute = (props) => {

//     const { hasError } = validateInputs()

//     if (hasError) {
//         return <Navigate to= "/secret-friend" />
//     }

//     return (
//         props.children
//     )
// }
