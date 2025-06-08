import sprite from "/assets/assets/sprite.svg"

const FieldsButton = ({ onClick, textOnBtn,icon }) => {
    
    return (
        <button className="border-2 border-sky-500 rounded-xl bg-gray-800 py-1 px-2 shadow-xs shadow-black hover:scale-101 cursor-pointer w-auto"
            onClick={onClick}>
            <span className="flex gap-2 items-center justify-center">{textOnBtn}
                <svg className="size-8 p-1" color="#efb100">
                    <use href={`${sprite}#${icon}`} />
                </svg>
            </span>
        </button>
    )
}

export default FieldsButton