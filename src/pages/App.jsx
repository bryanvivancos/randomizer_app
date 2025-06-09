import GameButton from "../components/atoms/GameButton"


function App() {

  return (
    <div className="font-Inter-Variable text-white flex flex-col items-center gap-8 my-14">
      <h1 className="text-5xl font-bold text-balance text-center">Bienvenido a Randomizer</h1>
      <h2 className="text-2xl font-bold text-center">Selecciona tu juego</h2>
      <ul className="grid grid-cols-2 items-center justify-center max-w-2xl mt-4 gap-8">
        
        <GameButton ico={"lottery-icon1"}
          to={"/roulette"}
          gameName={"Roulette"}/>

        <GameButton ico={"random-numbers-icon"}
          to={"/rand-num-generator"}
          gameName={"Generador de Números Aleatorio"}/>
        
      </ul>
    </div>
  )
}

export default App
