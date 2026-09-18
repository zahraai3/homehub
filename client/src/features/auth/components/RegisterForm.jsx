import {useState} from "react";
import useRegister from "../hooks/useRegister";
import { useNavigate , Link} from "react-router-dom";
import styles from './RegisterForm.module.css';
import { validateRegisterForm } from "../utils/registerValidator";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName,  setDisplayName] = useState('')
    const [ homeName , setHomeName ] = useState('')
    const [createHome, setCreateHome] = useState(true)
    const [invite , setInvite] = useState('')

    const [errors, setErrors] = useState({})

    const {mutate, isPending, error} = useRegister();

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        const validationErrors = validateRegisterForm({
            email,
            password,
            confirmPassword,
            displayName,
            createHome,
            homeName,
            invite,
        })

        if(Object.keys(validationErrors).length >0){
            setErrors(validationErrors);
            return;
        }

        mutate({email, password , displayName , homeName, createHome, invite },
            {
                onSuccess: () => {
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setDisplayName('');
                    setHomeName('');
                    setInvite('');

                    navigate('/');
                }
            }
        );

    }

    const clearFieldError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };
    return (
    <div className={styles.wrapper}>
        <div className={styles.title}>Hello, Lets start your journey</div>
            <form className={styles['flip-card__form']} onSubmit={handleSubmit}>
                <input
                    className={`${styles['flip-card__input']} ${errors.displayName ? styles.error : ""}`}
                    name="displayName"
                    placeholder="Display Name"
                    type="text"
                    value={displayName}
                    onChange={(e) => { 
                        setDisplayName(e.target.value)
                        clearFieldError('displayName')
                    } }
                />
                {errors.displayName && (
                    <span className={styles['error-message']}>
                        {errors.displayName}
                    </span>
                )}
                <input
                    className={`${styles['flip-card__input']} ${errors.email ? styles.error : ""}`}
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)
                        clearFieldError('email')
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
                    onChange={(e) => {setPassword(e.target.value)
                        clearFieldError('password')
                    }}
                />
                {errors.password && (
                    <span className={styles['error-message']}>
                        {errors.password}
                    </span>
                )}
                <input
                    className={`${styles['flip-card__input']} ${errors.confirmPassword ? styles.error : ""}`}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)
                        clearFieldError('confirmPassword')
                    }}
                />
                {errors.confirmPassword && (
                    <span className={styles['error-message']}>
                        {errors.confirmPassword}
                    </span>
                )}
                <div className={styles.creatChoice}>
                    <label>
                        <input
                            type="radio"
                            checked={createHome}
                            onChange={(e) => setCreateHome(true)}
                        />
                    Create a Home 
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={!createHome}
                            onChange={(e) => setCreateHome(false)}
                        />
                    Join a Home 
                    </label>
                </div>
                {createHome ? 
                    <div className={styles.createInputs}>
                        <h3>Creating a Home</h3>
                        <input
                            className={`${styles.homeName} ${errors.homeName ? styles.error : ""}`}
                            name="homeName"
                            placeholder="Home Name"
                            type="text"
                            value={homeName}
                            onChange={(e) => {setHomeName(e.target.value)
                                clearFieldError('homeName')
                            }}
                        />
                        {errors.homeName && (
                            <span className={styles['error-message']}>
                                {errors.homeName}
                            </span>
                        )}
                    </div>
                    :
                    <div className={styles.joinInputs}>
                        <h3>Joining a Home</h3>
                        <input
                            className={`${styles.inviteCode} ${errors.invite ? styles.error : ""}`}
                            name="inviteCode"
                            placeholder="Enter Invite Code"
                            type="text"
                            value={invite}
                            onChange={(e) => {setInvite(e.target.value)
                                clearFieldError('invite')
                            }}
                        />
                        {errors.invite && (
                            <span className={styles['error-message']}>
                                {errors.invite}
                            </span>
                        )}
                    </div>
                }
                <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                    Register
                </button>

                <Link to='/login' className={styles.switchLink}>
                    Already have an account? Login
                </Link>
            </form>
    </div>
    );
}

export default RegisterForm;