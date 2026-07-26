import {useState} from "react";
import { validateExpenseForm } from "../utils/expenseValidator";
import useExpense from "../hooks/useExpense";
import { useUserData } from "../../auth/hooks/useUserData";
import { useMembers } from "../../members/hooks/useMembers";
import { useAuth } from "../../auth/context/authContext";
import styles from '../components/ExpenseForm.module.css'

const ExpenseForm = () => {
    const [expenseTitle, setexpenseTitle] = useState("");
    const [totalAmount, settotalAmount] = useState("");
    const [deadline, setdeadline] = useState("");
    const [errors, setErrors] = useState({});

    const {user} = useAuth()

    const {mutate , isPending , error} = useExpense();

    const {data: users} = useMembers(user.uid)
    const {data : userData} = useUserData(user.uid)
    const userId = userData?.id
    const homeId = userData?.homeId

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
            <h2 className={styles['flip-card__title']}>Add Expense</h2>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="expenseTitle">Expense Title</label>
                <input
                    id="expenseTitle"
                    className={`${styles['flip-card__input']} ${errors.expenseTitle ? styles.error : ""}`}
                    name="expenseTitle"
                    placeholder="e.g. Electricity Bill"
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
            </div>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="totalAmount">Total Amount</label>
                <input
                    id="totalAmount"
                    className={`${styles['flip-card__input']} ${errors.totalAmount ? styles.error : ""}`}
                    name="totalAmount"
                    placeholder="0.00"
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
            </div>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="deadline">Deadline</label>
                <input
                    id="deadline"
                    className={`${styles['flip-card__input']} ${errors.deadline ? styles.error : ""}`}
                    name="deadline"
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
            </div>
            
            <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                Save Expense
            </button>
        </form>
    )
}

export default ExpenseForm