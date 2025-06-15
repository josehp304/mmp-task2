import s from './cards.module.css'
export default function Cards({pokemon}:{pokemon:{name: string, stats: Array<{name: string, value: number}>,sprite_url: string}}) {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        
        e.dataTransfer.setData('text/plain', JSON.stringify(pokemon));
        console.log('dragging', pokemon.name)
    };


    return(
        <div className={s.card} draggable={true} onDragStart={handleDragStart}>
            <h1>{pokemon.name}</h1>
            
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