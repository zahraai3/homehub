import { useUserData } from '../../auth/hooks/useUserData';
import { useAuth } from '../../auth/context/authContext';
import {Icon} from "@iconify/react";
import styles from './ExpenseHeader.module.css'

export function ExpenseHeader(){
    const {user} = useAuth()
    const {data:userData } = useUserData(user.uid)
    
    return(
        <div className={styles.header}>
            <div className={styles.pageName}>
                <Icon 
                icon='arcticons:expense-register'
                width={30}
                />
                <h1>Dashboard</h1>
            </div>
            <h2>Hello Dear {userData?.displayName}</h2>
        </div>
    )

}