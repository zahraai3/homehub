import {useAuth} from '../auth/context/authContext';
import { useHome } from './hooks/useHome';
import { useUserData } from './hooks/useUserData';
import styles from './DashboardPage.module.css';
import {Icon} from "@iconify/react";

import Card from './components/Card';
import { data } from 'react-router-dom';

const DashboardPage = () => {
    const { user} = useAuth();
    const { data: home, isPending, error } = useHome(user.uid)
    const {data:userData } = useUserData(user.uid)

    const things = ['expense' , 'shopping List' , 'tasks' ]
    
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
                <h2>Hello Dear {userData?.displayName}</h2>
            </div>

            <div className={styles.cardContainer}>
                {things.map(i => {
                    return <Card key={i} cardName = {i}/>
                })}
            </div>
            <div className={styles.recentCard}>
                <hr className={styles['ppc-divider']}/>
                <div className={styles.recentActiv}>
                    <h2>Recent activity : {`( Week ${'first of the week'} - ${'last of the week'})`}</h2>
                    <p>Label name - By Name - paid - date : 00/00/2026</p>
                </div>
                <hr className={styles['ppc-divider']}/>
            </div>
        </div>
    )
}
export default DashboardPage