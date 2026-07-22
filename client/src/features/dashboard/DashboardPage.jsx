import {useAuth} from '../auth/context/authContext'
const DashboardPage = () => {
    const { user, loading } = useAuth();

    console.log(user);
    console.log(loading);

    return <h1>Dashboard</h1>
}
export default DashboardPage