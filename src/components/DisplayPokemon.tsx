import React from 'react'
import type { Pokemon } from '../Types/pokemon.interface';
import type { GameStatusType } from '../hook/use-game-manager';
import Spinner from './Spinner';

interface DisplayPokemonProps {
  pokemon: Pokemon | null;
  isLoading: boolean;
  gameStatus: GameStatusType;
}

const DisplayPokemon = ({ pokemon, isLoading, gameStatus }: DisplayPokemonProps) => {
  const showAnswer = gameStatus !== 'PLAYING';
  const srcImage = pokemon?.image || '';
  const name = pokemon?.name || '';

  console.log(pokemon);

  return (
    <div className='card'>
      <div className="card-header text-center">
        <h1>
          {showAnswer ? name.toUpperCase() : 'Quien es este Pokemon?'}
        </h1>
      </div>
      <div className="card-body">
        {isLoading ? (
          <Spinner />
        ) : (
        <img 
        src={srcImage} 
        alt="Pokemon" 
        className='img-fluid mx-auto d-block'
        style={{
          maxHeight: '300px',
          filter: showAnswer ? 'none' : 'brightness(0)',
          transition: 'filter 0.3s ease-in-out'
        }}
        />
        )}
      </div>
    </div>
  )
}

export default DisplayPokemon