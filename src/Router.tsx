import { RouterProvider, createBrowserRouter } from "react-router";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetails from "./pages/ProductDetails";
import OrderHistory from "./pages/OrderHistory";
import { PocketProvider } from "./contexts/PocketContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import CartCheckout from "./pages/CartCheckout";
import NavLayout from "./layouts/NavLayout";
import NotFoundError from "./components/NotFoundError";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/shopping-cart", element: <ShoppingCart /> },
  { path: "/shopping-cart/checkout", element: <CartCheckout /> },
  { path: "/order-history", element: <OrderHistory /> },
  { path: "/products/:slug", element: <ProductDetails /> },
  { path: "/blogs/:slug", element: <BlogDetails /> },
  { path: "*", element: <NavLayout><NotFoundError /></NavLayout> }
]);

const Router = () => {
  return (
    <PocketProvider>
      <NotificationProvider>
        <Toaster 
          position="bottom-left"
          reverseOrder={false} 
        />
        <RouterProvider router={router} />
      </NotificationProvider>
    </PocketProvider>
  );
}

export default Router;
