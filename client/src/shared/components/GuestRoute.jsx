import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/authContext";

function GuestRoute(){
    const {user , loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;

}

export default GuestRoute
