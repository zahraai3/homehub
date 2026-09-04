
import {Icon} from "@iconify/react";
import styles from './ShoppingHeader.module.css'

export function ShoppingHeader(){
    
    
    return(
        <div className={styles.header}>
            <div className={styles.pageName}>
                <Icon 
                icon='emojione-monotone:shopping-cart'
                width={30}
                />
                <h1>Shopping List</h1>
            </div>
            <h2></h2>
        </div>
    )

}