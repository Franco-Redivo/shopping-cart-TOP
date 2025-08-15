import styles from "./CartItem.module.css";

const CartItem = ({product}) => {


    return(
        <div className={styles.main}>
            <div className={styles.info}>
                <img className={styles.productImage} src={product.image}/>
                <span className={styles.title}>{product.title}</span>
            </div>
            <span className={styles.quantity}>{product.quantity}</span>
            <span className={styles.price}>${product.price * product.quantity}</span>
        </div>
    );
}

export default CartItem;