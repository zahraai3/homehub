import styles from "./BottomNav.module.css";
import { NavLink } from "react-router";

const links = [
    { to: "", label: "Dashboard" },
    { to: "expenses", label: "Expenses" },
    { to: "tasks", label: "Tasks" },
    { to: "shoppinglist", label: "Shopping List" },
    { to: "members", label: "Members" },
    { to: "settings", label: "Settings" },
    ];

    const BottomNav = () => {
    return (
        <nav className={styles.nav}>
        {links.map((link) => (
            <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
            }
            >
            {link.label}
            </NavLink>
        ))}
        </nav>
    );
};

export default BottomNav;