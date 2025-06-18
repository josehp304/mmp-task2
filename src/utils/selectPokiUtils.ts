import type { Pokemon } from "./pokemonUtils";


const isPokemonInTeam = (pokemon: Pokemon): boolean => {
    const currentTeam: Pokemon[] = JSON.parse(localStorage.getItem('selectedPokemon') || '[]');
    return currentTeam.some(p => p.name === pokemon.name);
};

export const handlePokemonClick = (
    e: React.MouseEvent<HTMLDivElement>,
    pokemon: Pokemon,
    addPokemon: (pokemon: Pokemon) => void,
    showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void
) => {
    e.preventDefault();
    

    if (isPokemonInTeam(pokemon)) {
        showToast(`${pokemon.name} is already in your team!`, 'error');
        return;
    }


    const currentTeam: Pokemon[] = JSON.parse(localStorage.getItem('selectedPokemon') || '[]');
 

    localStorage.setItem(
        'selectedPokemon',
        JSON.stringify([...currentTeam, pokemon])
    );
    addPokemon(pokemon);
    showToast(`${pokemon.name} added to your team!`, 'success');
};

export const loadPokemons = async (
    setPokemons: (pokemons: Pokemon[]) => void,
    getPokemonList: () => Promise<Pokemon[]>,
    showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void
) => {
    try {
        showToast('Loading Pokémon...', 'info');
        const data = await getPokemonList();
        setPokemons(data);
        showToast('Pokémon loaded successfully!', 'success');
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        showToast('Error loading Pokémon data', 'error');
    }
}; 