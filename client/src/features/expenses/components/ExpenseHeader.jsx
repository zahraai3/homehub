
import {Icon} from "@iconify/react";
import styles from './ExpenseHeader.module.css'

export function ExpenseHeader(){
    
    
    return(
        <div className={styles.header}>
            <div className={styles.pageName}>
                <Icon 
                icon='arcticons:expense-register'
                width={30}
                />
                <h1>Expenses</h1>
            </div>
            <h2></h2>
        </div>
    )

}