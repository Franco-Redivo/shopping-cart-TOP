import CartItem from "../../components/CartItem/CartItem";
import { useOutletContext } from "react-router-dom";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Cart.module.css";

const Cart = () => {
    const { cart } = useOutletContext();
    const items = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

    return(
        <div className={styles.wrapper}>
            <NavBar cart={cart}/>
            <div className={styles.container}>
            <div className={styles.main}>
                <h2 className={styles.title}>Cart</h2>
                <div className={styles.item}>
                    {cart.length > 0 ? (
                        cart.map(item => (
                            <CartItem key={item.id} product={item} />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
                <div className={styles.summary}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryText}>subtotal - {items} items</span>
                        <span className={styles.summaryText}>${totalPrice}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryText}>shipping</span>
                        <span className={styles.summaryText}>$5.00</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryText}>tax</span>
                        <span className={styles.summaryText}>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryTotal}>total</span>
                        <span className={styles.summaryTotal}>${(totalPrice * 1.1 + 5).toFixed(2)}</span>
                    </div>
                    <button className={styles.checkoutBtn}>Checkout</button>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Cart;