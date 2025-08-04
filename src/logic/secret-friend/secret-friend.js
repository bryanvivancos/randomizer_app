import { Navigate } from "react-router-dom"

export const asignSecretFriend = ({ participants }) => {
    
    // const textInputsStr = participants.replace(/[\r\n]+/g," ") //eliminando saltos de linea
    // const textInputsArray = textInputsStr.split(" ") //convirtiendo en array
    // const participantsArrayFiltered = textInputsArray.filter(input => {
    //     return input !== null && input !== undefined && input !== "" && input !== 0;
    // }) //eliminando items vacios}

    const textInputsArray = participants.split(/\r?\n/) //convierte en array el input teniendo como divisor el salto de linea
        const participantsArrayFiltered = textInputsArray.filter(input => input) //filtra entre el array y selecciona solo elementos que tengan contenido
    
    //valida si la entrada de datos de participantes no esta vacia
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

// export const validateInputs = ({participants, bucket, organizer, eventDate , fns = {}}) => {

//         let hasError = false
//         const {asigns, hasLessThanThree, isEmpty}= asignSecretFriend({participants})

//         const {
//             setSecretFriendRaw,
//             setBucket,
//             setOrganizer,
//             setEventDate
//         } = fns


//         if (typeof asigns !== 'object' || isEmpty === true) {
//             setSecretFriendRaw( prev => ({...prev ,status: 'error', errorMessage: 'Este campo es obligatorio'}))
//             hasError = true

//             console.log("error participants: ", hasError, "hasLessThanThree", hasLessThanThree, "participantes", asigns)
//         }

//         if (hasLessThanThree === true) {
//             setSecretFriendRaw( prev => ({...prev ,status: 'error', errorMessage: 'Ingresa de 3 a más participantes para jugar'}))
//             hasError = true

//             console.log("error participants: ", hasError, "hasLessThanThree", hasLessThanThree, "participantes", asigns)
//         }

//         if (!bucket.amount || bucket.amount <= 0 || typeof bucket.amount !== 'number') {
//             setBucket(prev => ({...prev, status: 'error'}))
//             hasError = true
//         }

//         if (!organizer.input.trim()) {
//             setOrganizer(prev => ({ ...prev, status: 'error' }))
//             hasError = true
//         }

//         if (!eventDate.date) {
//             setEventDate(prev => ({ ...prev, status: 'error' }))
//             hasError = true
//         }

//         return hasError
//     }


// export const AuthRoute = (props) => {

//     if (validateInputs(
//     )) {
//         return <Navigate to= "/secret-friend" />
//     }

//     return (
//         props.children
//     )
// }
