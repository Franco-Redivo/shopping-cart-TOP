import App from "./App";
import Home from "./pages/Home/Home";
// import Store from "./pages/Store/Store";
// import Cart from "./pages/Cart/Cart";

const routes = [
    {
        path: "/",
        element: <App/>,
        // errorElement:<ErrorPage/>
    },
    // {
    //     path: "store/",
    //     element: <Store/>
    // },
    // {
    //     path: "cart/",
    //     element: <Cart/>
    // },
];

export default routes;