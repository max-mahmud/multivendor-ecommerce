import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_category } from "./store/reducers/homeReducer";
import "react-multi-carousel/lib/styles.css";
import Loading from "./components/Loading";
import ProtechUser from "./utils/ProtectUser";

const Home = lazy(() => import("./pages/Home"));
const Shops = lazy(() => import("./pages/Shops"));
const Card = lazy(() => import("./pages/Card"));
const Details = lazy(() => import("./pages/Details"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const SearchProducts = lazy(() => import("./pages/SearchProducts"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Payment = lazy(() => import("./pages/Payment"));
const ConfirmOrder = lazy(() => import("./pages/ConfirmOrder"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./components/dashboard/Orders"));
const Wishlist = lazy(() => import("./components/dashboard/Wishlist"));
const Order = lazy(() => import("./components/dashboard/Order"));
const ChangePassword = lazy(() => import("./components/dashboard/ChangePassword"));
const Index = lazy(() => import("./components/dashboard/Index"));
const EditProfile = lazy(() => import("./components/dashboard/EditProfile"));
const CompareProduct = lazy(() => import("./components/dashboard/CompareProduct"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category());
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtechUser />}>
            <Route path="" element={<Dashboard />}>
              <Route path="" element={<Index />} />
              <Route path="my-orders" element={<Orders />} />
              <Route path="my-wishlist" element={<Wishlist />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="my-compare" element={<CompareProduct />} />
              <Route path="order/details/:orderId" element={<Order />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
