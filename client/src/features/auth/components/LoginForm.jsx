import { useState } from "react";
import useLogin from "../hooks/useLogin,";
import { useNavigate , Link } from "react-router-dom";
import styles from './RegisterForm.module.css'


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const { mutate, isPending, error } = useLogin();

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        if (!password) newErrors.password = "Password is required";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        mutate({ email, password },
            {
                onSuccess: () => {
                    setEmail('');
                    setPassword('');
                    navigate('/');
                }
            }
        );
    };

    const clearFieldError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Welcome back</div>
            <form className={styles['flip-card__form']} onSubmit={handleSubmit}>
                <input
                    className={`${styles['flip-card__input']} ${errors.email ? styles.error : ""}`}
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError('email');
                    }}
                />
                {errors.email && (
                    <span className={styles['error-message']}>
                        {errors.email}
                    </span>
                )}

                <input
                    className={`${styles['flip-card__input']} ${errors.password ? styles.error : ""}`}
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError('password');
                    }}
                />
                {errors.password && (
                    <span className={styles['error-message']}>
                        {errors.password}
                    </span>
                )}

                {error && (
                    <span className={styles['error-message']}>
                        Invalid email or password
                    </span>
                )}

                <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                    {isPending ? 'Logging in...' : 'Login'}
                </button>

                <Link to="/register" className={styles.switchLink}>
                    Don't have an account? Register
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;