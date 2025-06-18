import axios from 'axios';
import type { Pokemon } from '../utils/pokemonUtils';

interface ApiPokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface ApiPokemonResponse {
    name: string;
    url: string;
}

const BASE_URL = import.meta.env.VITE_POKE_API_URL;

export const getPokemonList = async (): Promise<Pokemon[]> => {
    try {
        const response = await axios.get(`${BASE_URL}?limit=69`);
        const pokeList = await Promise.all(
            response.data.results.map(async (pokemon: ApiPokemonResponse) => {
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
        console.error('Error fetching Pokemon list: ', error);
        return [];
    }
}; 

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}${name}`);
    const pokemonData = response.data;
    const sprite_url: string = pokemonData.sprites.front_default;
    const stats = pokemonData.stats.map((stat: ApiPokemonStat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
    }));
    return { name: pokemonData.name, stats, sprite_url };
}