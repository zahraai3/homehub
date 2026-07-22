import { Outlet} from "react-router-dom";
import BottomNav from "../shared/components/BottomNav";
import HeaderNav from "../shared/components/HeaderNav";

import ProtectedRoute from "../shared/components/ProtectedRoute";


import styles from './MainLayout.module.css';

const MainLayout = () => {
    return(
        <div className={styles.container}>
            <HeaderNav/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <BottomNav/>
        </div>
    )
}

export default MainLayout