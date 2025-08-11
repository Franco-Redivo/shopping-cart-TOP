import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";
import instagramIcon from "../../assets/icons/instagram.png";
import twitterIcon from "../../assets/icons/twitter.png";
import youtubeIcon from "../../assets/icons/youtube.png";
import tiktokIcon from "../../assets/icons/tik-tok.png";


const Home = () => {

    return(
        <>
            <Navbar/>
            <Hero/>
            <div className={styles.homeContent}>
                <div className={styles.bio}>
                    <p>
                        Surge is not just a brand - It's a lifestyle. We have been changing the way you experience clothing since 1995.
                    </p>
                    <div className={styles.mediaLinks}>
                        <ul>
                            <li>
                                <a href="https://twitter.com">
                                    <img src={twitterIcon}></img>
                                </a>
                            </li>
                            <li >
                                <a href="https://instagram.com">
                                    <img src={instagramIcon}></img>
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com">
                                    <img src={youtubeIcon}></img>
                                </a>
                            </li>
                            <li>
                                <a href="https://tiktok.com">
                                    <img src={tiktokIcon}></img>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.subscriptionContent}>
                    <div>
                        <h3>Don't Miss a Drop</h3>
                        <p>Subscribe and recive a 15% discount on your first purchase</p>
                    </div>
                    <div>
                        <input></input>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
}

export default Home;
