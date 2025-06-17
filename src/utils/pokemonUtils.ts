import axios from "axios";
import type { RefObject } from "react";

export interface PokemonStat {
    name: string;
    value: number;
}

export interface Pokemon {
    name: string;
    stats: PokemonStat[];
    sprite_url: string;
}

export interface TotalStats {
    [key: string]: number;
}

interface ApiPokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropRef: RefObject<HTMLDivElement>,
    addPokemon: (pokemon: Pokemon) => void
) => {
    e.preventDefault();
    const pokemon = JSON.parse(e.dataTransfer.getData('text/plain'));
    localStorage.setItem(
        'selectedPokemon',
        JSON.stringify([...JSON.parse(localStorage.getItem('selectedPokemon') || '[]'), pokemon])
    );
    addPokemon(pokemon);
    if (dropRef.current) dropRef.current.style.borderColor = 'blue';
};

export const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, dropRef: RefObject<HTMLDivElement>) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.style.borderColor = 'blue';
};

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dropRef: RefObject<HTMLDivElement>) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.style.borderColor = 'yellow';
};

export const getPokelist = async (): Promise<Pokemon[]> => {
    try {
        const response = await axios.get(import.meta.env.VITE_POKE_API_URL + '?limit=100');
        const pokeList = await Promise.all(
            response.data.results.map(async (pokemon: { name: string; url: string }) => {
                const pokemonResponse = await axios.get(pokemon.url);
                const pokemonData = pokemonResponse.data;
                const sprite_url: string = pokemonData.sprites.front_default;
                const stats = pokemonData.stats.map((stat: ApiPokemonStat) => ({
                    name: stat.stat.name,
                    value: stat.base_stat,
                }));
                return { name: pokemon.name, stats, sprite_url };
            })
        );
        return pokeList;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const calculateTeamStats = (team: Pokemon[]): TotalStats => {
    return team.reduce((acc: TotalStats, pokemon: Pokemon) => {
        pokemon.stats.forEach((stat: PokemonStat) => {
            if (acc[stat.name]) {
                acc[stat.name] += stat.value;
            } else {
                acc[stat.name] = stat.value;
            }
        });
        return acc;
    }, {});
}; 