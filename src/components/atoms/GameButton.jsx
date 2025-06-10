import { Link } from 'react-router-dom'
import sprite from '/assets/sprite.svg'

const GameButton = ({ico, to, gameName, soon, padding}) => {
    return <li className={`h-full group ${soon ? '' : 'active:animate-jelly'} relative`}>

        <Link to={to} className={`bg-sky-500 rounded-2xl flex flex-col justify-center items-center max-w-40 w-full h-full group`}>

            <svg className={`${soon ? '' : ' group-hover:animate-rotate-360'} min-h-18 max-w-full ${padding}`}>
                <use href={`${sprite}#${ico}`}/>
            </svg>

            <h1 className='font-Inter-Variable font-bold mb-2 w-full text-center px-2 text-balance'>{gameName}</h1>
            
            {soon && 
                <div className='h-full w-full absolute flex justify-center items-center backdrop-blur-xs rounded-2xl'>
                    <p className='font-bold '>PROXIMAMENTE</p>
                </div>
            }
        </Link>
    </li>
}

export default GameButton