import s from './smallCards.module.css'
export default function SmallCards({pokemon}:{pokemon:{name: string, stats: Array<{name: string, value: number}>,sprite_url: string}}) {




    return(
        <div className={s.card} >
            <h6>{pokemon.name}</h6>
            
                <img src={pokemon.sprite_url} alt={pokemon.name} />
            <ul className={s.stats}>
                {pokemon.stats.map((stat) => (
                    <li key={stat.name}>
                        {stat.name}: {stat.value}
                    </li>
                    
                ))}
            </ul>
       </div>
    )
}