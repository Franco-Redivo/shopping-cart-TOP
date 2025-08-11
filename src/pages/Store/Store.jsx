import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Store.module.css";
import {useState, useEffect} from "react";
import productService from "../../service/products";

const Store = () => {

    const {products, setProducts} = useState([]);

    useEffect(() => {
        const fetchedProducts = productService.getAll();
        setProducts(fetchedProducts);
    },[]);

    return(
        <>
            <Navbar/>
            {products.map(product => {
                <ProductCard key={product.id} item={product}/>
            })}
            <Footer/>
        </>
    )
}

export default Store;