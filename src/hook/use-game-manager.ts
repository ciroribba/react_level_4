import { useState, useEffect, useCallback } from "react";
import type { Pokemon } from "../Types/pokemon.interface";
import { pokemnonService } from "../services/pokemon.service";

export const GameStatus = {
    PLAYING: 'PLAYING',
    CORRECT: 'CORRECT',
    WRONG: 'WRONG',
} as const;

export type GameStatusType = typeof GameStatus[keyof typeof GameStatus];

export const useGameManager = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gameStatus, setGameStatus] = useState<GameStatusType>(GameStatus.PLAYING);

    const handlePokemonNameSubmit = useCallback((userInput: string) => {
        if (!pokemon) {
            return;
        }
        const isValid = pokemnonService.isPokemonValid(pokemon.name, userInput);
        setGameStatus(isValid ? GameStatus.CORRECT : GameStatus.WRONG);
    }, [pokemon]);

    const loadNewPokemon = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGameStatus(GameStatus.PLAYING);
        try {
            const pokemon = await pokemnonService.getRandomPokemon();
            setPokemon(pokemon);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        loadNewPokemon();
    }, [loadNewPokemon]);

    return {
        pokemon,
        error,
        isLoading,
        loadNewPokemon,
        handlePokemonNameSubmit,
        gameStatus,
    }
    
}