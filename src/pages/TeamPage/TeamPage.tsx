import TeamGallery from '../../components/TeamGallery/TeamGallery';
import { Link } from 'react-router-dom';
import styles from './TeamPage.module.css';

export default function TeamPage() {
    return (
        <div className={styles.page}>
            <nav className={styles.navigation}>
                <Link to="/select" className={styles.addButton}>
                    + Add Pokémon
                </Link>
            </nav>
            <TeamGallery />
        </div>
    );
} 