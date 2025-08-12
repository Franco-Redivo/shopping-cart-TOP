import { Outlet } from "react-router-dom"
import { useState } from "react"

function App() {
  
  const [cart, setcart] = useState([]);

  const addToCart = (product, quantity) => {
    setcart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if(existing){
        return prevCart.map((item) => 
          item.id === product.id ? {...item, quantity: item.quantity + quantity} : item
        );
      }
      return [...prevCart,{...product, quantity}];
    });
  };

  return (
    <>
      <Outlet context={{cart, addToCart}}/>
    </>
  );
};

export default App;
