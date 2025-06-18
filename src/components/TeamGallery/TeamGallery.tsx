import Card from "../Card"
import useStore from "../../store"
import { calculateTeamStats } from "../../utils/pokemonUtils"
import type { Pokemon } from "../../utils/pokemonUtils"
import styles from "./TeamGallery.module.css"

export default function TeamGallery() {
    const { clearPokemon } = useStore();
    const team: Pokemon[] = JSON.parse(localStorage.getItem("selectedPokemon") || "[]");
    const total_stats = calculateTeamStats(team);

    // Calculate team level based on total stats
    const totalStatsSum = Object.values(total_stats).reduce((a, b) => a + b, 0);
    const teamLevel = Math.floor(totalStatsSum / 100);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img 
                    src="/pokemon_header.png" 
                    alt="Pokemon Header"
                    className={styles.headerImage}
                />
            </div>

            {team.length > 0 && (
                <div className={styles.dashboard}>
                    <div className={styles.dashboard_header}>
                        <h2 className={styles.dashboard_title}>Team Stats</h2>
                        <div className={styles.team_info}>
                            <span>TEAM LV. {teamLevel}</span>
                            <span>POKéMON: {team.length}</span>
                        </div>
                    </div>
                    <div className={styles.stats_grid}>
                        {Object.entries(total_stats).map(([statName, value]) => (
                            <div key={statName} className={`${styles.stat_card} ${styles[statName.toLowerCase()]}`}>
                                <div className={styles.stat_name}>{statName}</div>
                                <div className={styles.stat_value}>{value}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.dashboard_footer}>
                        <button 
                            className={styles.clearButton}
                            onClick={() => {
                                
                                    localStorage.removeItem("selectedPokemon");
                                    clearPokemon();
                                
                            }}
                        >
                            Release All POKéMON
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.team_gallery_container}>
                {team.length > 0 ? (
                    team.map((pokemon: Pokemon) => (
                        <Card key={pokemon.name} pokemon={pokemon} />
                    ))
                ) : (
                    <p>No POKéMON selected yet! Choose your team members.</p>
                )}
            </div>
        </div>
    );
}