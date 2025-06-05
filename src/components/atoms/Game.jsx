import sprite from '../../assets/sprite.svg'

const Game = ({ico}) => {
    return <a href="">
        <li className="bg-sky-500 rounded-full flex justify-center items-center group w-40 0">
            <svg className='group hover:animate-rotate-360 w-full'>
                <use href={`${sprite}#${ico}`}/>
            </svg>
        </li>
    </a>
}

export default Game