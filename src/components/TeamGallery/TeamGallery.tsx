import Card from "../Card"
import useStore from "../../store"
import { calculateTeamStats } from "../../utils/pokemonUtils"
import type { Pokemon } from "../../utils/pokemonUtils"
import styles from "./TeamGallery.module.css"

export default function TeamGallery() {
    const { selectedPokemon, clearPokemon } = useStore();
    const team: Pokemon[] = JSON.parse(localStorage.getItem("selectedPokemon") || "[]");
    const total_stats = calculateTeamStats(team);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Team</h1>
            <div className={styles.team_gallery_container}>
                {team.length > 0 ? (
                    team.map((pokemon: Pokemon) => (
                        <Card key={pokemon.name} pokemon={pokemon} />
                    ))
                ) : (
                    <p>No Pokémon selected</p>
                )}
            </div>

            {team.length > 0 && (
                <div className={styles.team_stats_card}>
                    <h2>Team Stats</h2>
                    <div className={styles.team_stats_content}>
                        {Object.entries(total_stats).map(([statName, value]) => (
                            <div key={statName} className={styles.team_stat_row}>
                                <span>{statName}</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.team_gallery_footer}>
                <button onClick={() => {
                    localStorage.removeItem("selectedPokemon");
                    clearPokemon();
                }}>
                    Clear Team
                </button>
            </div>
        </div>
    );
}