import { Outlet} from "react-router-dom";
import BottomNav from "../shared/components/BottomNav";

const MainLayout = () => {
    return(
        <>
            <Outlet/>
            <BottomNav/>
        </>
    )
}

export default MainLayout