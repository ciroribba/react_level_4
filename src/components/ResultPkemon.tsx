import React from 'react'
import type { GameStatusType } from '../hook/use-game-manager';

interface ResultPokeomProps {
  loadNewPokemon: () => void;
  gameStatus: GameStatusType;
}
const ResultPokeom = ({ loadNewPokemon, gameStatus }: ResultPokeomProps) => {
  if(gameStatus === 'PLAYING') {
    return null;
  }

  return (
    <div 
    className={`alert alert-${gameStatus === 'CORRECT' ? 'success' : 'danger'} text-center`}>
      {gameStatus === 'CORRECT' ? (
        <h3>¡ Correcto ! <i className='bi bi-emoji-heart-eyes'></i></h3>
        ) : (
        <h3>¡ Incorrecto ! <i className='bi bi-emoji-frown'></i></h3>
        )}
        <button 
        className='btn btn-dark mt-3'
        onClick={loadNewPokemon}
        >
        Volver a jugar
      </button>  
    </div>
  )
}

export default ResultPokeom