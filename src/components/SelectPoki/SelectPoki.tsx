import { useEffect, useState } from "react"
import Card from "../Card"
import useStore from "../../store"
import fallbackData from "../../data/fallbackPokemons.json"
import type { Pokemon } from "../../utils/pokemonUtils"
import { getPokemonList } from "../../api/pokemon"
import { handlePokemonClick, loadPokemons } from "../../utils/selectPokiUtils"
import { useToast } from "../../context/ToastContext"
import styles from "./SelectPoki.module.css"

export default function SelectPokie() {
    const { addPokemon } = useStore();
    const { showToast } = useToast();
    const [pokemons, setPokemons] = useState<Pokemon[]>(fallbackData.pokemons);

    useEffect(() => {
        loadPokemons(setPokemons, getPokemonList, showToast);
    }, [showToast]);

    return (
        <div>
            <div className={styles.pokemon_modal}>
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