import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
    return (
        <div className={`${styles.toast} ${styles[`toast_${type}`]}`} onClick={onClose}>
            <span>{message}</span>
            <button className={styles.close_button} onClick={onClose}>×</button>
        </div>
    );
};

export default Toast; 