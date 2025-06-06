import sprite from '../../assets/sprite.svg'

const DeleteButton = ({ onClick }) => {
    return (
        <button className="border-2 border-red-600 bg-red-950 rounded-xl  flex justify-center items-center p-1 shadow-xs shadow-black hover:scale-102 cursor-pointer"
            onClick={onClick}>
            <svg className="size-6">
                <use href={`${sprite}#trash`}/>
            </svg>
        </button>
    )
}

export default DeleteButton