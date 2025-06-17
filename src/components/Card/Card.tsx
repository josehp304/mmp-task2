import styles from './Card.module.css'
import { handleDragStart } from '../../utils/pokemonUtils'

export default function Card({pokemon}:{pokemon:{name: string, stats: Array<{name: string, value: number}>,sprite_url: string}}) {

    return (
        <div className={styles.card} draggable={true} onDragStart={(e) => handleDragStart(e, pokemon)}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprite_url} alt={pokemon.name} />
            <ul className={styles.stats}>
                {pokemon.stats.map((stat) => (
                    <li key={stat.name}>
                        {stat.name}: {stat.value}
                    </li>
                ))}
            </ul>
        </div>
    )
}