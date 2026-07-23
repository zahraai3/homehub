import {useState} from "react";
import useRegister from "../hooks/useRegister";

import styles from './RegisterForm.module.css'

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName,  setDisplayName] = useState('')

    const {mutate, isPending, error} = useRegister();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            console.error("Passwords do not match");
            return;
        }

        //هنا باقي البيانات عدلي الفورم ومرريها مال هوم داتا

        mutate({email, password , displayName});

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisplayName('')
    }

    return (
    <div className={styles.wrapper}>
        <div className={styles.title}>Hello, Lets start your journey</div>
            <form className={styles['flip-card__form']} onSubmit={handleSubmit}>
                <input
                    className={styles['flip-card__input']}
                    name="displayName"
                    placeholder="Display Name"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                    className={styles['flip-card__input']}
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={styles['flip-card__input']}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className={styles['flip-card__input']}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                    Register
                </button>
            </form>
    </div>
    );
}

export default RegisterForm;