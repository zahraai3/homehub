import RegisterForm from "./components/RegisterForm";
import styles from './RegisterPage.module.css';

export const RegisterPage = () => {

    return(
        <div className={styles.container}>
            <RegisterForm/>
        </div>
    )
}