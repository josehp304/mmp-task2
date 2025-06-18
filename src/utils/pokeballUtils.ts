export interface Position {
    x: number;
    y: number;
}

export interface PokeballInstance {
    id: number;
    isVisible: boolean;
    position: Position;
    targetPosition: Position;
}

export const getRandomStartPos = (): Position => {
    const minX = 50; 
    const maxX = window.innerWidth - 50; 
    const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
    
    
    const y = window.innerHeight - 100;
    
    return { x: randomX, y };
};

export const handleClick = (
    e: MouseEvent,
    nextId: number,
    styles: { readonly [key: string]: string },
    callbacks: {
        setPokeballs: (updater: (prev: PokeballInstance[]) => PokeballInstance[]) => void,
        setNextId: (updater: (prev: number) => number) => void
    }
) => {
    const clickPos = { x: e.clientX, y: e.clientY };
    const randomStartPos = getRandomStartPos();
    
    const newPokeball: PokeballInstance = {
        id: nextId,
        isVisible: true,
        position: randomStartPos,
        targetPosition: clickPos
    };
    
    callbacks.setPokeballs(prev => [...prev, newPokeball]);
    callbacks.setNextId(prev => prev + 1);
    throwPokeball(newPokeball, styles, (id) => {
        callbacks.setPokeballs(prev => prev.filter(p => p.id !== id));
    });
};

export const throwPokeball = (
    pokeball: PokeballInstance,
    styles: { readonly [key: string]: string },
    onFinish: (id: number) => void
) => {
    const element = document.createElement('div');
    element.className = styles.pokeball;
    element.innerHTML = '<img src="/pokeball.svg" alt="Pokeball" />';
    document.body.appendChild(element);

    const midPoint = {
        x: (pokeball.position.x + pokeball.targetPosition.x) / 2,
        y: Math.min(pokeball.position.y, pokeball.targetPosition.y) - 150
    };

    const keyframes = [
        { 
            transform: `translate(${pokeball.position.x}px, ${pokeball.position.y}px) rotate(0deg)`,
            offset: 0 
        },
        { 
            transform: `translate(${midPoint.x}px, ${midPoint.y}px) rotate(360deg)`,
            offset: 0.5 
        },
        { 
            transform: `translate(${pokeball.targetPosition.x}px, ${pokeball.targetPosition.y}px) rotate(720deg)`,
            offset: 1 
        }
    ];

    const timing = {
        duration: 600,
        easing: 'cubic-bezier(.17,.67,.83,.67)',
        fill: 'forwards' as const
    };

    const animation = element.animate(keyframes, timing);

    animation.onfinish = () => {
        element.classList.add(styles.capture);
        
        setTimeout(() => {
            element.remove();
            onFinish(pokeball.id);
        }, 100);
    };
}; 
