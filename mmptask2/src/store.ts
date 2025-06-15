// store.js
import { create } from 'zustand';

interface Pokemon {
    name: string;
    stats: { name: string; value: number }[];
    sprite_url: string;
}

interface StoreState {
    selectedPokemon: Pokemon[];
    addPokemon: (pokemon: Pokemon) => void;
    removePokemon: (pokemon: Pokemon) => void;
    clearPokemon: () => void;
}

const useStore = create<StoreState>((set) => ({
    selectedPokemon: [],
    addPokemon: (pokemon) => set((state) => ({ selectedPokemon: [...state.selectedPokemon, pokemon] })),
    removePokemon: (pokemon) => set((state) => ({ selectedPokemon: state.selectedPokemon.filter(p => p.name !== pokemon.name) })),
    clearPokemon: () => set(() => ({ selectedPokemon: [] }))
}));

export default useStore;
