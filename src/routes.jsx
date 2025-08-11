import App from "./App";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
// import Cart from "./pages/Cart/Cart";

const routes = [
    {
        path: "/",
        element: <App/>,
        children:[
            {
                index: true,
                element:<Home/>,
            },
            {
                path:'store',
                element:<Store/>,
            },
            // {
            //     path:'cart',
            //     element:<Cart/>,
            // },
        ]
        // errorElement:<ErrorPage/>
    },
    
];

export default routes;