import {useAuth} from '../../features/auth/context/authContext'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const{ user, loading } = useAuth()

    if(loading){
        return <h1>LOADING ...</h1>
    }

    if(!user){
        return <Navigate to="/register" replace />
    }

    return <Outlet/>
    

}

export default ProtectedRoute