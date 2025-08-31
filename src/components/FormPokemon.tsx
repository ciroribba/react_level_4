import React, { useState } from 'react'
import  { type GameStatusType } from '../hook/use-game-manager';

interface FormPokemonProps {
  handlePokemonNameSubmit: (name: string) => void;
  gameStatus: GameStatusType;
}
const FormPokemon = ({ handlePokemonNameSubmit, gameStatus }: FormPokemonProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, ingrese el nombre del Pokemon');
      return;
    }
    handlePokemonNameSubmit(name.toLowerCase().trim());
    setName('');
  }
  return (
    <form 
      className='input-group my-3'
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        className='form-control' 
        placeholder='Escribe el nombre del Pokemon' 
        aria-label='Escribe el nombre del Pokemon'
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        disabled={gameStatus !== 'PLAYING'}
      />
      <button 
        className='btn btn-outline-secondary' 
        type='submit' 
        disabled={!name.trim() || gameStatus !== 'PLAYING'}
      >
        Jugar
      </button>  
    </form>
  )
}

export default FormPokemon