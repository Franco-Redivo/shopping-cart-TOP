import { Link } from "react-router-dom"
import logoIcon from "../../assets/icons/logo.png"
import cartIcon from "../../assets/icons/shopping-cart.png"
import styles from "./Navbar.module.css"

const NavBar = ({ cart = [] }) => {
    // Calculate total number of items in cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logoIcon} alt="surge logo"/>
                    <span>Surge</span>
                </Link>
            </div>
            <div className={styles.cart}>
                <Link to="cart">
                    <img src={cartIcon} alt="cart"/>
                    {totalItems > 0 && (
                        <span className={styles.cartCounter}>{totalItems}</span>
                    )}
                </Link>
            </div>
        </nav>
    )
}

export default NavBar