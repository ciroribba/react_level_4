import type { Pokemon } from "../Types/pokemon.interface";
import { randomNumbers } from "../lib/random-numbers";

 const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

 const MAX_POKEMON = 151;

 const getRandomPokemon = async (): Promise<Pokemon> => {
    const randomId = randomNumbers(1, MAX_POKEMON);
    const response = await fetch(`${POKEMON_API_URL}/${randomId}`);
    if(!response.ok) throw new Error('Failed to fetch pokemon');

    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
    };
 }

 const normalizePokemonName = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .normalize('NFD') // Normaliza la cadena para que no tenga acentos
        .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
        .replace(/[^a-z0-9]/g, '') // Elimina los caracteres que no son letras o numeros
        
 }

 const isPokemonValid = (pokemonName: string, userInput: string): boolean => {
    return normalizePokemonName(pokemonName) === normalizePokemonName(userInput);
 }

export const pokemnonService = {
    getRandomPokemon,
    isPokemonValid,
}
