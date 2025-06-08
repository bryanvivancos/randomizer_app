import { Link } from 'react-router-dom'
import sprite from '/assets/sprite.svg'

const GameButton = ({ico, to, gameName}) => {
    return <Link to={to}>
        <button className="bg-sky-500 rounded-2xl flex flex-col justify-center items-center group w-40 active:animate-rubber-band">
            <svg className='group hover:animate-rotate-360 w-full'>
                <use href={`${sprite}#${ico}`}/>
            </svg>
            <h1 className='font-Inter-Variable font-bold mb-2 text-xl'>{gameName}</h1>
        </button>
    </Link>
}

export default GameButton