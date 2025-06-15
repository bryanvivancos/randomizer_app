
// Function to select WINNER
export const selectWinner = ({ noWinners, inputsItem, textArea }) => {

    //Selecting only the input fields
        const inputsArrayNoFilter = []
        const inputs = [...inputsItem]
        inputs.map((inputField) => {
            inputField.value
            inputsArrayNoFilter.push(inputField.value)
        })
        const inputsArray = inputsArrayNoFilter.filter(input => {
            return input !== ""
        }) //eliminando items vacios


    //Selecting only the text fields
        const textInputsStr = textArea.replace(/[\r\n]+/g," ") //eliminando saltos de linea
        const textInputsArray = textInputsStr.split(" ") //convirtiendo en array
        const textInputsArrayFilter = textInputsArray.filter(input => {
            return input !== null && input !== undefined && input !== "" && input !== 0;
        }) //eliminando items vacios
        

    //  EJECUTAMOS SELECCIONAR GANADORES SI LA CANTIDAD DE ESTOS ES MENOR A LA CANTIDAD DE PARTICIPANTES
    if (inputsArray.length > 0 && textInputsArrayFilter.length > 0){
        return { showAlert: true }
    }

    else if (inputsArray.length >= parseInt(noWinners)) {
        // Desordenamos el array usando el algoritmo de Fisher-Yates

        for (let i = inputsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [inputsArray[i], inputsArray[j]] = [inputsArray[j], inputsArray[i]];
        }
        
        return {
            // Retornamos los primeros 'cantidad' elementos
            winners: inputsArray.slice(0,parseInt(noWinners)),
            //Activamos modal para ganadores
            showModal: true
        }
    } 

    else if (textInputsArrayFilter.length > 0 && textInputsArrayFilter.length >= parseInt(noWinners)) {

        for (let i = textInputsArrayFilter.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [textInputsArrayFilter[i], textInputsArrayFilter[j]] = [textInputsArrayFilter[j], textInputsArrayFilter[i]];
        }
        return {
            // Retornamos los primeros 'cantidad' elementos
            winners: textInputsArrayFilter.slice(0,parseInt(noWinners)),
            //Activamos modal para ganadores
            showModal: true
        }
    } 

    else {
        return { showAlert: true }
        // setShowAlert(true)
        // setTimeout(() => {
        //     setShowAlert(false)
        // }, 5000)
    }
}


// // Function to select WINNER
    // const selectWinner = (noWinners) => {

    //     //Selecting only the input fields
    //         const inputsArrayNoFilter = []
    //         const inputs = [...inputFields]
    //         inputs.map((inputField) => {
    //             inputField.value
    //             inputsArrayNoFilter.push(inputField.value)
    //         })
    //         const inputsArray = inputsArrayNoFilter.filter(input => {
    //             return input !== ""
    //         }) //eliminando items vacios


    //     //Selecting only the text fields
    //         const textInputsStr = textValue.replace(/[\r\n]+/g," ") //eliminando saltos de linea
    //         const textInputsArray = textInputsStr.split(" ") //convirtiendo en array
    //         const textInputsArrayFilter = textInputsArray.filter(input => {
    //             return input !== null && input !== undefined && input !== "" && input !== 0;
    //         }) //eliminando items vacios
            

    //     //  EJECUTAMOS SELECCIONAR GANADORES SI LA CANTIDAD DE ESTOS ES MENOR A LA CANTIDAD DE PARTICIPANTES
    //     if (inputsArray.length > 0 && textInputsArrayFilter.length > 0){
    //         setShowAlert(true)
    //         setTimeout(() => {
    //             setShowAlert(false)
    //         }, 5000)
    //     }
    //     else if (inputsArray.length >= parseInt(noWinners)) {
    //         // Desordenamos el array usando el algoritmo de Fisher-Yates

    //         for (let i = inputsArray.length - 1; i > 0; i--) {
    //             const j = Math.floor(Math.random() * (i + 1));
    //             [inputsArray[i], inputsArray[j]] = [inputsArray[j], inputsArray[i]];
    //         }
            
    //         // Retornamos los primeros 'cantidad' elementos
    //         setWinners(inputsArray.slice(0,parseInt(noWinners)))
    //         //Activamos modal para ganadores
    //         setShowModal(true)
    //     } 
    //     else if (textInputsArrayFilter.length > 0 && textInputsArrayFilter.length >= parseInt(noWinners)) {

    //         for (let i = textInputsArrayFilter.length - 1; i > 0; i--) {
    //             const j = Math.floor(Math.random() * (i + 1));
    //             [textInputsArrayFilter[i], textInputsArrayFilter[j]] = [textInputsArrayFilter[j], textInputsArrayFilter[i]];
    //         }
    //         // Retornamos los primeros 'cantidad' elementos
    //         setWinners(textInputsArrayFilter.slice(0,parseInt(noWinners)))
    //         //Activamos modal para ganadores
    //         setShowModal(true)
    //     } 
    //     else {
    //         setShowAlert(true)
    //         setTimeout(() => {
    //             setShowAlert(false)
    //         }, 5000)
    //     }
    // }