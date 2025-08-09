import { Link } from "react-router-dom"
import logoIcon from "../../assets/icons/logo.png"
import cartIcon from "../../assets/icons/shopping-cart.png"
import styles from "./Navbar.module.css"

const NavBar = () => {
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
                </Link>
            </div>
        </nav>
    )
}

export default NavBar