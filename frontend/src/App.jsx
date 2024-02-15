import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Card from "./pages/Card";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import { useEffect } from "react";
import SearchProducts from "./pages/SearchProducts";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import ConfirmOrder from "./pages/ConfirmOrder";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/card" element={<Card />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />
        <Route path="/product/details/:slug" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
