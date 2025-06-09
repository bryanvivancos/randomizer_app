import { Link } from 'react-router-dom'
import sprite from '/assets/sprite.svg'

const GameButton = ({ico, to, gameName}) => {
    return <li className="h-full active:animate-jelly">
        <Link to={to} className='bg-sky-500 rounded-2xl flex flex-col justify-center items-center group w-40 h-full'>
            <svg className='group hover:animate-rotate-360 min-w-18 min-h-18' >
                <use href={`${sprite}#${ico}`}/>
            </svg>
            <h1 className='font-Inter-Variable font-bold mb-2 w-full text-center px-2 text-balance'>{gameName}</h1>
        </Link>
    </li>
}

export default GameButton