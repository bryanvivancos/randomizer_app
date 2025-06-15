import GameButton from "../components/atoms/GameButton"


function App() {

  return (
    <div className="font-Inter-Variable text-white flex flex-col items-center gap-8 my-14">
      <h1 className="text-5xl font-bold text-balance text-center">Bienvenido a Randomizer</h1>
      <h2 className="text-2xl font-bold text-center">Selecciona tu juego</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 items-center justify-center max-w-2xl mt-4 mx-4 gap-4">
        
        <GameButton ico={"lottery-icon1"}
          to={"/roulette"}
          gameName={"Roulette"}
          soon={false}/>

        <GameButton ico={"random-numbers-icon"}
          to={"/rand-num-generator"}
          gameName={"Generador de Números Aleatorio"}
          soon={false}/>
        
        <GameButton ico={"instagram-black"}
          to={""}
          gameName={"Sorteo desde Post de Instagram"}
          soon={true}
          padding={"px-8 py-4"}/>

        <GameButton ico={"christmas-gifts"}
          to={""}
          gameName={"Amigo Secreto"}
          soon={true}
          padding={"px-8 py-4"}/>
        
      </ul>
    </div>
  )
}

export default App
