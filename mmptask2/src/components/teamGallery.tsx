import Cards from "./cards/cards";
// import { useState } from "react";


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
    let team: Pokemon[] = JSON.parse(localStorage.getItem("selectedPokemon") || "[]")
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
                <div className="team-stats">
                    <h2>Team Total Stats</h2>
                    <ul className="stats-list">
                        {Object.entries(total_stats).map(([statName, value]) => (
                            <li key={statName}>
                                <strong>{statName}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className="team-gallery-footer">
                <button onClick={() => {
                    localStorage.removeItem("selectedPokemon");
                    team = []
                }}>Clear Team</button>
            </div>
            
        </div>
    )
}