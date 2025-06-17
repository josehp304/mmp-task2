import Cards from "./cards/cards";
// import styles from "./cards/cards.module.css";

// import { useState } from "react";
import useStore from "../store"

interface PokemonStat {
    name: string;
    value: number;
}

interface Pokemon {
    name: string;
    stats: PokemonStat[];
    sprite_url: string;
}


interface TotalStats {
    [key: string]: number;
}

export default function TeamGallery(){
    const { selectedPokemon, clearPokemon } = useStore();
    let team:Pokemon[] = selectedPokemon;

    team = JSON.parse(localStorage.getItem("selectedPokemon") || "[]")
    let total_stats: TotalStats = team.reduce((acc: TotalStats, pokemon: Pokemon) => {
        
        pokemon.stats.forEach((stat: PokemonStat) => {
            
            if (acc[stat.name]) {
                acc[stat.name] += stat.value;
            } else {
               
                acc[stat.name] = stat.value;
            }
        });
        
        return acc;
    }, {}); 
    return(
        <div>
            <h1>Your Team</h1>
            <div className="team-gallery-container">
                {team.length>0?
            team.map((pokemon: Pokemon) => (
                <Cards key={pokemon.name} pokemon={pokemon} />
            ))
            :
            <p>No Pokémon selected</p>
            }
            </div>

            {team.length > 0 && (
                <div className="team-stats-card">
                    <h2>Team Stats</h2>
                    <div className="team-stats-content">
                        {Object.entries(total_stats).map(([statName, value]) => (
                            <div key={statName} className="team-stat-row">
                                <span>{statName}</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="team-gallery-footer">
                <button onClick={() => {
                    localStorage.removeItem("selectedPokemon");
                    team = []
                    clearPokemon();
                }}>Clear Team</button>
            </div>
            
        </div>
    )
}