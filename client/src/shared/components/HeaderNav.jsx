import styles from './HeaderNav.module.css';
import { useUserData } from '../../features/auth/hooks/useUserData';
import { useAuth } from '../../features/auth/context/authContext';

const HeaderNav = () => {

    const {user} = useAuth()
    const {data:userData } = useUserData(user.uid)
    return (
        <header className={styles['header']}>
        <h1 className={styles['header_title']}>HomeHub</h1>
        <p className={styles['header_tagline']}>Hello Dear {userData?.displayName}</p>
        </header>
    );
};

export default HeaderNav;