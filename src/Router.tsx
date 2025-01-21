import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import ShoppingCart from "./pages/ShoppingCart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
