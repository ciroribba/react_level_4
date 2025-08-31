import React from 'react'
import DisplayPokemon from './components/DisplayPokemon'
import FormPokemon from './components/FormPokemon'
import ResultPokemon from './components/ResultPkemon'
import { useGameManager } from './hook/use-game-manager'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';

const App = () => {
  const { pokemon, error, isLoading, loadNewPokemon, handlePokemonNameSubmit, gameStatus } = useGameManager();

  
  const { width, height } = useWindowSize();
  
  if (error) {
    return <div className='alert alert-danger text-center'>{error}</div>
  }

  return (
    <div className='container mx-auto my-5'>
      {
        gameStatus === 'CORRECT' && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
          />
        )
      }
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-6">
          <DisplayPokemon  pokemon={pokemon} isLoading={isLoading} gameStatus={gameStatus}/>
          <FormPokemon handlePokemonNameSubmit={handlePokemonNameSubmit} gameStatus={gameStatus}/>
          <ResultPokemon loadNewPokemon={loadNewPokemon} gameStatus={gameStatus}/>
        </div>
      </div>
    </div>
  )
}

export default App