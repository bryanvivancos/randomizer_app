import { Link } from "react-router-dom"

const Header = () => {
    return <div className="w-full max-h-14 items-center justify-center p-4">
        <Link className="text-white font-Inter-Variable font-bold flex items-center justify-center"
            to="/">
                RANDOMIZER
        </Link>
    </div>
}

export default Header