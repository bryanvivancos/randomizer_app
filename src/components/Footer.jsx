import { FOOTER_DESCRIPTION, LINKEDIN, INSTAGRAM, GITHUB } from "../CONSTANTS";
import sprite from '/assets/sprite.svg';

const Footer = () => { 
    const year = new Date().getFullYear()

    return (
        <footer className="text-white font-Quick flex flex-col items-center gap-0 mb-4 mt-14">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center gap-4">

                    <img src="/IMG-20230911-WA0113.webp" alt="bryan image" 
                    className= "rounded-full max-w-10 md:max-w-16"/>

                    <p className="text-xs text-center max-w-80">
                        {FOOTER_DESCRIPTION}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h3 className= "font-bold">Enlaces de interes</h3>
                    
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className= "hover:text-emerald-300 text-xs flex gap-2">
                        <svg className="group-hover:animate-slide-in-left size-4 text-white">
                            <use href={`${sprite}#linkedin`}/>
                        </svg> LinkedIn
                    </a>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer"  className= "hover:text-emerald-300 text-xs flex gap-2">
                        <svg className="group-hover:animate-slide-in-left size-4">
                            <use href={`${sprite}#github`}/>
                        </svg> Github
                    </a>
                    <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"  className= "hover:text-emerald-300 text-xs flex gap-2">
                        <svg className="group-hover:animate-slide-in-left size-4">
                            <use href={`${sprite}#instagram`}/>
                        </svg> Instagram
                    </a>
                    
                </div>
            </div>

            <a href="https://github.com/bryanvivancos/bjlinks-react-tailwind"
            target="_blank">
                <p className="text-xs text-center mt-8 md:mt-12 text-gray-300">
                    © 2020-{year} <span>Desarrollado con ❤️ por Bryan Vivanco</span>
                </p>
            </a>
            <span className="text-xs text-gray-300">Perú</span>
        </footer>
    )
}

export default Footer;