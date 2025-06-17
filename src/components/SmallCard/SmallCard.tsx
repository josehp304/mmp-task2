import styles from './SmallCard.module.css'

export default function SmallCard({pokemon}:{pokemon:{name: string, stats: Array<{name: string, value: number}>,sprite_url: string}}) {
    return (
        <div className={styles.card}>
            <h6>{pokemon.name}</h6>
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