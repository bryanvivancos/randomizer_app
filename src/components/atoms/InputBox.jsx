

const InputBox = ({ placeholder, value, onChange }) => {
    return (
        <input type="text" 
            placeholder={placeholder}
            value={value}
            className="border-2 rounded-xl p-2 border-sky-700 bg-sky-900"
            onChange={onChange}/>
    )
}

export default InputBox