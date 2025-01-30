import { BrowserRouter, Routes, Route } from "react-router";
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

const Router = () => {
  return (
    <PocketProvider>
      <NotificationProvider>
        <Toaster 
          position="bottom-left"
          reverseOrder={false} 
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/shopping-cart/checkout" element={<CartCheckout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/blogs/:slug" element={<BlogDetails />} />
            <Route path="*" element={
              <NavLayout>
                <NotFoundError />
              </NavLayout>
            } />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </PocketProvider>
  );
}

export default Router;
