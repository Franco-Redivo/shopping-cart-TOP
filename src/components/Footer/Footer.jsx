import styles from "./Footer.module.css";
import logoIcon from "../../assets/icons/logo.png";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.logo}>
                    <img src={logoIcon} alt="Surge logo" />
                    <span>Surge</span>
                </div>

                <ul className={styles.links}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <div className={styles.bottom}>
                <p>© {new Date().getFullYear()} Surge. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
