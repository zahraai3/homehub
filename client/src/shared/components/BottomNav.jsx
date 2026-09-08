import { useState } from "react";
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
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => setIsOpen(false);

    return (
        <>
            <button
                className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle navigation"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
                {links.map((link) => (
                    <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.active : ""}`
                    }
                    >
                    {link.label}
                    </NavLink>
                ))}
            </nav>
        </>
    );
};

export default BottomNav;