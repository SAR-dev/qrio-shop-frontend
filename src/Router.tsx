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

const Router = () => {
  return (
    <PocketProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/shopping-cart/checkout" element={<CartCheckout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
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
