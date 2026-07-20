import styles from './HeaderNav.module.css';

const HeaderNav = () => {
    return (
        <header className={styles['header']}>
        <h1 className={styles['header_title']}>HomeHub</h1>
        <p className={styles['header_tagline']}>Manage your home, together.</p>
        </header>
    );
};

export default HeaderNav;