
//FUNCION QUE GENERA EL NUMERO ALEATORIO
export const generateRandomNum = (min, max) => {
    //VERIFICA QUE HAYA CONTENIDO EN LOS INPUTS

    if ( max > 0 ) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNum = Math.floor(Math.random() * (max - min + 1) + min)
        setShowAlert(false)
        setResult(randomNum)
    }else {
        setResult(null)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 5000)
    }
}