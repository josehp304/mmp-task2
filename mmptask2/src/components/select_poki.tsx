import { useEffect, useState } from "react"
import Cards from "./cards/cards"
import axios from "axios"
export default function SelectPokie(){
        interface Pokemon {
            name: string;
            stats: { name: string; value: number }[];
            sprite_url: string;
        }

        let [pokemons, setPokemons] = useState<Pokemon[]>([
            {
                name: "bulbasaur",
                stats: [
                    { name: "hp", value: 45 },
                    { name: "attack", value: 49 },
                    { name: "defense", value: 49 },
                    { name: "special-attack", value: 65 },
                    { name: "special-defense", value: 65 },
                    { name: "speed", value: 45 }
                ],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            },
            {
                name: "ivysaur",
                stats: [
                    { name: "hp", value: 60 },
                    { name: "attack", value: 62 },
                    { name: "defense", value: 63 },
                    { name: "special-attack", value: 80 },
                    { name: "special-defense", value: 80 },
                    { name: "speed", value: 60 }
                ],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
            },
            {
                name: "venusaur",
                stats: [
                    { name: "hp", value: 80 },
                    { name: "attack", value: 82 },
                    { name: "defense", value: 83 },
                    { name: "special-attack", value: 100 },
                    { name: "special-defense", value: 100 },
                    { name: "speed", value: 80 }
                ],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
            },
            {
                name: "charmander",
                stats: [
                    { name: "hp", value: 39 },
                    { name: "attack", value: 52 },
                    { name: "defense", value: 43 },
                    { name: "special-attack", value: 60 },
                    { name: "special-defense", value: 50 },
                    { name: "speed", value: 65 }
                ],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
            },
            {
                name: "charmeleon",
                stats: [
                    { name: "hp", value: 58 },
                    { name: "attack", value: 64 },
                    { name: "defense", value: 58 },
                    { name: "special-attack", value: 80 },
                    { name: "special-defense", value: 65 },
                    { name: "speed", value: 80 }
                ],
                sprite_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
            }
        ])
    let[showModal,setShowModal] = useState(false)

    interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

    async function getPokelist() {
        try {
            let response = await axios.get("https://pokeapi.co/api/v2/pokemon");
            // let initialPokeList: Array<{name: string, stats: Array<{name: string, value: number}>}> = [];
            
            
            const pokeList = await Promise.all(
                response.data.results.map(async (pokemon: {name: string, url: string}) => {
                    const pokemonResponse = await axios.get(pokemon.url);
                    const pokemonData = pokemonResponse.data;
                    let sprite_url:string = pokemonData.sprites.front_default;
                    const stats = pokemonData.stats.map((stat:PokemonStat) => {
                        return {name: stat.stat.name, value: stat.base_stat,};
                    });
                    
                    return {name: pokemon.name, stats, sprite_url};
                })
            );
            
            return pokeList;
        }
        catch(error) {
            console.log(error);
            return [];
        }
    }
    useEffect(()=>{
        getPokelist().then((data) => {
            console.log(data);
            setPokemons(data);
            console.log(pokemons)
            // setShowModal(true); // Show modal after fetching data
        }).catch((error) => {
            console.error("Error fetching Pokémon data:", error);
        });
    },[])
    


    return(
        
        <div>
            {showModal && (
                <div className='pokimon-modal'>
                    
                    <div className='cardContainer '> 
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.name} onClick={() => {
            console.log(pokemon.name)

            let spokemon = localStorage.getItem('selectedPokemon') 
            if (spokemon) {
                if (JSON.parse(spokemon).length >= 6) {
                    alert('You can only select up to 6 Pokémon');
                    return;
                }
                localStorage.setItem('selectedPokemon', JSON.stringify([...JSON.parse(spokemon), pokemon]));
                console.log(JSON.parse(spokemon))
            } else {
                localStorage.setItem('selectedPokemon', JSON.stringify([pokemon]));
            }
            console.log('selectedPokemon', localStorage.getItem('selectedPokemon'))
        }}><Cards key={pokemon.name} pokemon={pokemon} /></div>

                    ))}</div>
                </div>
            )}
            <button className="select-button" onClick={() => { setShowModal(!showModal) }}>{showModal?"close" :"select your pokimons"}</button>
        </div>

    )
}