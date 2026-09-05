import {Icon} from "@iconify/react";
import styles from './TaskHeader.module.css'

export default function ShoppingHeader(){
    
    
    return(
        <div className={styles.header}>
            <div className={styles.pageName}>
                <Icon 
                icon='fa-solid:tasks'
                width={30}
                />
                <h1>Tasks</h1>
            </div>
            <h2></h2>
        </div>
    )

}