import {useAuth} from '../auth/context/authContext'
import { useHome } from './hooks/useHome';


const DashboardPage = () => {
    const { user , error} = useAuth();
    const { data: home, isPending, error } = useHome(user.uid)

    return(
        <>
            <h1>Dashboard</h1>
            <h3>{home.homeName}</h3>
            <h3>{home.inviteCode}</h3>
        </>
    )
}
export default DashboardPage