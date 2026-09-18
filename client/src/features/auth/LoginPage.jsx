import LoginForm from "./components/LoginForm";
import styles from './RegisterPage.module.css'

export const LoginPage =() => {
    return (
        <div className={styles.container}>
            <LoginForm/>
        </div>
    )
}