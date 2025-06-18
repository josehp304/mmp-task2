import { useState, useEffect } from 'react';
import styles from './Pokeball.module.css';
import type { PokeballInstance } from '../../utils/pokeballUtils';
import { handleClick } from '../../utils/pokeballUtils';

export default function Pokeball() {
    const [pokeballs, setPokeballs] = useState<PokeballInstance[]>([]);
    const [nextId, setNextId] = useState(0);

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            handleClick(e, nextId, styles, {
                setPokeballs,
                setNextId
            });
        };
        console.log(pokeballs)
        window.addEventListener('click', clickHandler);
        return () => window.removeEventListener('click', clickHandler);
    }, [nextId]);

    return null;
} 