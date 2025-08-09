import styles from "./Hero.module.css";

const Hero = () => {
    return(
        <div className={styles.main}>
            <div className={styles.content}>
                <h2 className={styles.heroTitle}>Fall - Winter collections 2025</h2>
                <button className={styles.heroBtn}>Shop Now</button>
            </div>
        </div>
    );
}

export default Hero;