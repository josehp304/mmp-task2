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

export const handleDragStart = (e: React.DragEvent<HTMLDivElement>, pokemon: Pokemon) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(pokemon));
    console.log('dragging', pokemon.name)
};