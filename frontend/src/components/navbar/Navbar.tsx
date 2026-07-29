import classes from "./Navbar.module.css";

export function Navbar() {
    return (
        <nav className={classes.navbar}>
            <h1>Notification App</h1>
            <button className={classes.notsIcon}>N(1)</button>
        </nav>
    );
}