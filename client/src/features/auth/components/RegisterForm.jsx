import {useState} from "react";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import styles from './RegisterForm.module.css'

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName,  setDisplayName] = useState('')
    const [ homeName , setHomeName ] = useState('')
    const [createHome, setCreateHome] = useState(true)
    const [invite , setInvite] = useState('')

    const {mutate, isPending, error} = useRegister();

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            console.error("Passwords do not match");
            return;
        }


        mutate({email, password , displayName , homeName },
            {
                onSuccess: () => navigate('/')
            }
        );

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisplayName('')
        setHomeName('')
        setInvite('')
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
                <div className={styles.creatChoice}>
                    <label>
                        <input
                            type="radio"
                            value={true}
                            defaultChecked
                            onChange={(e) => setCreateHome(true)}
                        />
                    Create a Home 
                    </label>
                    <label>
                        <input
                            type="radio"
                            onChange={(e) => setCreateHome(false)}
                        />
                    Join a Home 
                    </label>
                </div>
                {createHome ? 
                    <div className={styles.createInputs}>
                        <h3>Creating a Home</h3>
                        <input
                            className={styles.homeName}
                            name="HomeName"
                            placeholder="Home Name"
                            type="text"
                            required
                            value={homeName}
                            onChange={(e) => setHomeName(e.target.value)}
                        />
                    </div>
                    :
                    <div className={styles.joinInputs}>
                        <h3>Joining a Home</h3>
                        <input
                            className={styles.inviteCode}
                            name="InviteCode"
                            placeholder="Enter Invite Code"
                            type="text"
                            required
                            value={invite}
                            onChange={(e) => setInvite(e.target.value)}
                        />
                    </div>
                }
                <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                    Register
                </button>
            </form>
    </div>
    );
}

export default RegisterForm;