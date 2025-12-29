import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from 'react-hot-toast';
import { PocketProvider } from "./contexts/PocketContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetails from "./pages/ProductDetails";
import CartCheckout from "./pages/CartCheckout";
import NavLayout from "./layouts/NavLayout";
import NotFoundError from "./components/NotFoundError";
import BlogDetails from "./pages/BlogDetails";
import ProductList from "./pages/ProductList";
import BlogList from "./pages/BlogList";
import OrderList from "./pages/OrderList";
import OrderDetails from "./pages/OrderDetails";
import ProductCheckout from "./pages/ProductCheckout";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/carts", element: <ShoppingCart /> },
  { path: "/carts/checkout", element: <CartCheckout /> },
  { path: "/products/:id/checkout", element: <ProductCheckout /> },
  { path: "/orders", element: <OrderList /> },
  { path: "/orders/:ref", element: <OrderDetails /> },
  { path: "/products", element: <ProductList /> },
  { path: "/products/:slug", element: <ProductDetails /> },
  { path: "/blogs", element: <BlogList /> },
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
