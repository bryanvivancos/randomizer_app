import sprite from "../../assets/sprite.svg"

const AddButton = ({ onClick, textOnBtn }) => {
    return (
        <button className="border-2 border-sky-500 w-60 rounded-xl bg-gray-800 p-1 shadow-xs shadow-black hover:scale-101 cursor-pointer"
                            onClick={onClick}>
                            <span className="flex gap-2 items-center justify-center">{textOnBtn}
                                <svg className="size-8 p-1" color="#efb100">
                                    <use href={`${sprite}#plus`} />
                                </svg>
                            </span>
                        </button>
    )
}

export default AddButton