import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

const Hero = () => {
    return(
        <div className={styles.main}>
            <div className={styles.content}>
                <h2 className={styles.heroTitle}>Fall - Winter collections 2025</h2>
                <Link to="/store">
                    <button className={styles.heroBtn}>Shop Now</button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;