import SelectPoki from '../../components/SelectPoki/SelectPoki';
import { Link } from 'react-router-dom';
import styles from './SelectPage.module.css';

export default function SelectPage() {
    return (
        <div className={styles.page}>
            <nav className={styles.navigation}>
                <Link to="/" className={styles.backButton}>
                    ← Back to Team
                </Link>
            </nav>
            <SelectPoki />
        </div>
    );
} 