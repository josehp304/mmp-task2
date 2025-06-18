import styles from './Card.module.css'
import { handleDragStart } from '../../utils/pokemonUtils'

export default function Card({pokemon}:{pokemon:{name: string, stats: Array<{name: string, value: number}>,sprite_url: string}}) {
    return (
        <div className={styles.card} draggable={true} onDragStart={(e) => handleDragStart(e, pokemon)}>
            <div className={styles.card_inner}>
                <div className={styles.name_banner}>
                    {pokemon.name}
                </div>
                <div className={styles.image_container}>
                    <img src={pokemon.sprite_url} alt={pokemon.name} />
                </div>
                <ul className={styles.stats}>
                    {pokemon.stats.map((stat) => (
                        <li key={stat.name}>
                            <span className={styles.stat_name}>{stat.name}</span>
                            <span className={styles.stat_value}>{stat.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}