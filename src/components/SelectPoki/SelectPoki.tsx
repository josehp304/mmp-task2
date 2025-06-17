import { useEffect, useRef, useState } from "react"
import Card from "../Card"
import useStore from "../../store"
import SmallCard from "../SmallCard"
import fallbackData from "../../data/fallbackPokemons.json"
import { handleDrop, handleDragLeave, handleDragOver, getPokelist } from "../../utils/pokemonUtils"
import type { Pokemon } from "../../utils/pokemonUtils"
import styles from "./SelectPoki.module.css"

export default function SelectPokie() {
    const { addPokemon, selectedPokemon } = useStore();
    const [pokemons, setPokemons] = useState<Pokemon[]>(fallbackData.pokemons);
    const [showModal, setShowModal] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getPokelist()
            .then((data) => setPokemons(data))
            .catch((error) => console.error("Error fetching Pokémon data:", error));
    }, []);

    return (
        <div>
            {showModal && (
                <div className={styles.pokemon_modal}>
                    <div className={styles.card_container}>
                        {pokemons.map((pokemon) => (
                            <div key={pokemon.name}>
                                <Card key={pokemon.name} pokemon={pokemon} />
                            </div>
                        ))}
                    </div>
                    <div 
                        className={styles.your_team}
                        onDrop={(e) => dropRef.current && handleDrop(e, { current: dropRef.current }, addPokemon)}
                        onDragOver={(e) => dropRef.current && handleDragOver(e, { current: dropRef.current })}
                        onDragLeave={(e) => dropRef.current && handleDragLeave(e, { current: dropRef.current })}
                        ref={dropRef}
                    >
                        drag and drop your team here
                        <div className={styles.small_card_container}>
                            {selectedPokemon.map((pokemon) => (
                                <SmallCard key={pokemon.name} pokemon={pokemon} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <button className={styles.select_button} onClick={() => setShowModal(!showModal)}>
                {showModal ? "close" : "select your pokimons"}
            </button>
        </div>
    );
}