import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Store.module.css";
import {useState, useEffect} from "react";
import productService from "../../service/products";
import { useOutletContext } from "react-router-dom";

const Store = () => {

    const [products, setProducts] = useState([]);
    const {cart, addToCart} = useOutletContext();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await productService.getAll();
            setProducts(fetchedProducts);
        };
        fetchProducts(); 
    },[]);

    return(
        <div className={styles.main}>
            <Navbar cart={cart}/>
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart}/>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default Store;