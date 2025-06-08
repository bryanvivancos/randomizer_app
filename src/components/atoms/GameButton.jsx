import { Link } from 'react-router-dom'
import sprite from '/assets/sprite.svg'

const GameButton = ({ico, to, gameName}) => {
    return <Link to={to}>
        <li className="bg-sky-500 rounded-2xl flex flex-col justify-center items-center group w-40 active:animate-jelly">
            <svg className='group hover:animate-rotate-360 w-12 h-12' >
                <use href={`${sprite}#${ico}`}/>
            </svg>
            <h1 className='font-Inter-Variable font-bold mb-2 text-xl'>{gameName}</h1>
        </li>
    </Link>
}

export default GameButton