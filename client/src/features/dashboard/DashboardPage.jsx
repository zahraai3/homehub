import {useAuth} from '../auth/context/authContext';
import { useHome } from './hooks/useHome';
import { useUserData } from './hooks/useUserData';
import styles from './DashboardPage.module.css';
import {Icon} from "@iconify/react";

import Card from './components/Card';

const DashboardPage = () => {
    const { user} = useAuth();
    const { data: home, isPending, error } = useHome(user.uid)
    const {data:userData } = useUserData(user.uid)
    
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.pageName}>
                    <Icon 
                    icon='material-symbols:empty-dashboard-rounded'
                    width={30}
                    />
                    <h1>Dashboard</h1>
                </div>
                <h2>Hello Dear {userData.displayName}</h2>
            </div>

            <div className={styles.cardContainer}>
                <Card/>
            </div>
        </div>
    )
}
export default DashboardPage