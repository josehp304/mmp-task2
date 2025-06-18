import { useEffect, useState } from "react"
import Card from "../Card"
import useStore from "../../store"
import fallbackData from "../../data/fallbackPokemons.json"
import type { Pokemon } from "../../utils/pokemonUtils"
import { getPokemonByName, getPokemonList } from "../../api/pokemon"
import { handlePokemonClick, loadPokemons } from "../../utils/selectPokiUtils"
import { useToast } from "../../context/ToastContext"
import styles from "./SelectPoki.module.css"

export default function SelectPokie() {
    const { addPokemon } = useStore();
    const { showToast } = useToast();
    const [pokemons, setPokemons] = useState<Pokemon[]>(fallbackData.pokemons);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            loadPokemons(setPokemons, getPokemonList, showToast);
            return;
        }
        getPokemonByName(searchTerm.toLowerCase()).then((pokemon) => {
            if (pokemon) {
                setPokemons([pokemon]);
                showToast("Pokémon found!", "success");
            } else {
                showToast("Pokémon not found!", "error");
                loadPokemons(setPokemons, getPokemonList, showToast);
            }
        }).catch(() => {
            showToast("Pokémon not found!", "error");
            loadPokemons(setPokemons, getPokemonList, showToast);
        });
    }

    useEffect(() => {
        loadPokemons(setPokemons, getPokemonList, showToast);
    }, [showToast]);

    return (
        <div>
            <div className={styles.pokemon_modal}>
                <div className={styles.search_section}>
                    <div className={styles.search_container}>
                        <input 
                            type="text" 
                            placeholder="Enter Pokémon name..." 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.search_input}
                            value={searchTerm}
                        />
                        <button 
                            onClick={handleSearch}
                            className={styles.search_button}
                            title="Search Pokémon"
                        >
                            <div className={styles.pokeball}>
                                <div className={styles.pokeball_top}></div>
                                <div className={styles.pokeball_middle}>
                                    <div className={styles.pokeball_dot}></div>
                                </div>
                                <div className={styles.pokeball_bottom}></div>
                            </div>
                            <span>Search!</span>
                        </button>
                    </div>
                </div>
                <div className={styles.card_container}>
                    {pokemons.map((pokemon) => (
                        <div 
                            key={pokemon.name} 
                            onClick={(e) => handlePokemonClick(e, pokemon, addPokemon, showToast)}
                        >
                            <Card key={pokemon.name} pokemon={pokemon} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}