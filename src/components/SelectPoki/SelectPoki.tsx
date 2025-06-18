import { useEffect, useState } from "react"
import Card from "../Card"
import useStore from "../../store"
import fallbackData from "../../data/fallbackPokemons.json"
import type { Pokemon } from "../../utils/pokemonUtils"
import { getPokemonList } from "../../api/pokemon"
import styles from "./SelectPoki.module.css"

export default function SelectPokie() {
    const { addPokemon } = useStore();
    const [pokemons, setPokemons] = useState<Pokemon[]>(fallbackData.pokemons);
   

    function handleClickPoki(e: React.MouseEvent<HTMLDivElement>, pokemon: Pokemon) {
        e.preventDefault();
        addPokemon(pokemon);
        localStorage.setItem(
            'selectedPokemon',
            JSON.stringify([...JSON.parse(localStorage.getItem('selectedPokemon') || '[]'), pokemon])
        );
    }

    useEffect(() => {
        getPokemonList()
            .then((data) => setPokemons(data))
            .catch((error) => console.error("Error fetching Pokémon data:", error));
    }, []);

    return (
        <div>
            <div className={styles.pokemon_modal}>
                <div className={styles.card_container}>
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.name} onClick={(e) => handleClickPoki(e, pokemon)}>
                            <Card key={pokemon.name} pokemon={pokemon} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}