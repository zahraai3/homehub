import {useState} from "react";
import { validateExpenseForm } from "../utils/expenseValidator";
import useExpense from "../hooks/useExpense";
import { useUserData } from "../../auth/hooks/useUserData";
import { useMembers } from "../../members/hooks/useMembers";
import styles from '../components/ExpenseForm.module.css'

const ExpenseForm = () => {
    const [expenseTitle, setexpenseTitle] = useState("");
    const [totalAmount, settotalAmount] = useState("");
    const [deadline, setdeadline] = useState("");
    const [errors, setErrors] = useState({});

    const {mutate , isPending , error} = useExpense();

    const {users} = useMembers()
    const {user} = useUserData()
    const userId = user?.id
    const homeId = user?.homeId

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({})

        const validationErrors = validateExpenseForm({
            expenseTitle,
            totalAmount,
            deadline
        })

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        mutate({
            expense: {
                title: expenseTitle,
                totalAmount: Number(totalAmount),
                dueDate: deadline,
                createdBy: userId
                },
                homeId,
                users
            },
            {
                onSuccess: () => {
                    settotalAmount('')
                    setdeadline('')
                    setexpenseTitle('')
                }
            }
        )
    }

    const clearFieldError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    return(
        <form className={styles['flip-card__form']} onSubmit={handleSubmit}>
            <input
                className={`${styles['flip-card__input']} ${errors.expenseTitle ? styles.error : ""}`}
                name="expenseTitle"
                placeholder="expenseTitle"
                type="text"
                value={expenseTitle}
                onChange={(e) => { 
                    setexpenseTitle(e.target.value)
                    clearFieldError('expenseTitle')
                } }
            />
            {errors.expenseTitle && (
                <span className={styles['error-message']}>
                    {errors.expenseTitle}
                </span>
            )}
            <input
                className={`${styles['flip-card__input']} ${errors.totalAmount ? styles.error : ""}`}
                name="totalAmount"
                placeholder="totalAmount"
                type="number"
                value={totalAmount}
                onChange={(e) => {settotalAmount(e.target.value)
                    clearFieldError('totalAmount')
                }}
            />
            {errors.totalAmount && (
                <span className={styles['error-message']}>
                    {errors.totalAmount}
                </span>
            )}
            <input
                className={`${styles['flip-card__input']} ${errors.deadline ? styles.error : ""}`}
                name="deadline"
                placeholder="Deadline At"
                type="date"
                value={deadline}
                onChange={(e) => {setdeadline(e.target.value)
                    clearFieldError('deadline')
                }}
            />
            {errors.deadline && (
                <span className={styles['error-message']}>
                    {errors.deadline}
                </span>
            )}
            
            <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                Save Expense
            </button>
        </form>
    )
}

export default ExpenseForm