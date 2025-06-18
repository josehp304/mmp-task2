import styles from './StatBar.module.css';

interface StatBarProps {
    statName: string;
    value: number;
    maxValue?: number;
    color?: string;
}

export default function StatBar({ statName, value, maxValue = 600, color = '#FF5D5D' }: StatBarProps) {
    const percentage = Math.min((value / maxValue) * 100, 100);
    
    const getStatColor = (stat: string): string => {
        switch (stat.toLowerCase()) {
            case 'hp':
                return '#FF5D5D';
            case 'attack':
                return '#FF9D5D';
            case 'defense':
                return '#5DB1FF';
            case 'special-attack':
                return '#FF5D9D';
            case 'special-defense':
                return '#5DFF9D';
            case 'speed':
                return '#FFD45D';
            default:
                return color;
        }
    };

    return (
        <div className={styles.statBar}>
            <div className={styles.statInfo}>
                <span className={styles.statName}>{statName}</span>
                <span className={styles.statValue}>{value}</span>
            </div>
            <div className={styles.barContainer}>
                <div 
                    className={styles.barFill}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: getStatColor(statName)
                    }}
                >
                    <div className={styles.barGlow} />
                </div>
            </div>
        </div>
    );
} 