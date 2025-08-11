import styles from "./ProductCard.module.css";
import { useState } from "react";

const ProductCard = ({product, addToCart}) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product,quantity);
        setQuantity(1);
    }

    return (
        <div className={styles.card}>
            <img className={styles.productImg} src={product.image}/>
            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>
                <span className={styles.category}>{product.category}</span>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.numbers}>
                    <span className={styles.price}>${product.price}</span>
                    <div className={styles.buttons}>
                        <div className={styles.quantityControls}>
                             <button className={styles.quantityBtn} 
                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span className={styles.display}>{quantity}</span>
                            <button className={styles.quantityBtn}
                                onClick={() => setQuantity(quantity + 1)}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                        <button className={styles.addBtn} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;