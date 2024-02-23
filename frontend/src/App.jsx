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
import Dashboard from "./pages/Dashboard";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import Order from "./components/dashboard/Order";
import ChangePassword from "./components/dashboard/ChangePassword";
import Index from "./components/dashboard/Index";
import EditProfile from "./components/dashboard/EditProfile";
import CompareProduct from "./components/dashboard/CompareProduct";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/card" element={<Card />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />
        <Route path="/product/details/:slug" element={<Details />} />

        {/*Dashboard  */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Index />} />
          <Route path="my-orders" element={<Orders />} />
          <Route path="my-wishlist" element={<Wishlist />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="my-compare" element={<CompareProduct />} />
          <Route path="order/details/:orderId" element={<Order />} />
          <Route path="chage-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
