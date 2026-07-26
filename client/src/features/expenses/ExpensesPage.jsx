import ExpenseForm from "./components/ExpenseForm"
import { ExpenseHeader } from "./components/ExpenseHeader"
import styles from './ExpensePage.module.css'

const ExpensesPage = () => {
    return(
        <div className={styles.container}>
            <ExpenseHeader/>
            <div className={styles.info}>
                <div className={styles.expensesList}>
                <h1>Name // deadline</h1>
                <h3>total</h3>
                <h3>my share</h3>
                <h3>collected</h3>
                <h3>paid by:</h3>
                <h3>bending</h3>
            </div>
            <div className={styles.formSection}>
                <ExpenseForm/>
            </div>
            </div>
        </div>
    )
}
export default ExpensesPage
