import GameButton from "../components/atoms/GameButton"


function App() {

  return (
    <div className="font-Inter-Variable text-white flex flex-col items-center gap-8 my-14">
      <h1 className="text-5xl font-bold">Bienvenido a Randomizer</h1>
      <h2 className="text-2xl font-bold">Selecciona tu juego</h2>
      <ul className="flex items-center justify-center w-full mt-4">
        
        <GameButton ico={"lottery-icon1"}
          to={"/roulette"}
          gameName={"Roulette"}/>
        
      </ul>
    </div>
  )
}

export default App
