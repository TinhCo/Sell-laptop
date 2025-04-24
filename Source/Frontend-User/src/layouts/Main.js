import React from "react";
import { Routes, Route, link } from "react-router-dom";
import Home from "./Home";
import DetaiProduct from "./DetailProduct";
import Listing_grid from "./Listing_grid";
import ShoppingCart from "./ShoppingCart";
import Login from "../pages/Login/Login";
import Category from "./Category";
import ListingLarge from "./ListingLarge";
import Offer from "./Offer";
import Payment from "./Payment";
import ProfileAddress from "./ProfileAddress";
import ProfileMain from "./ProfileMain";
import ProfileOrders from "./ProfileOrders";
import ProfileSeller from "./ProfileSeller";
import ProfileSetting from "./ProfileSetting";
import ProfileWishlist from "./ProfileWishlist";
import UserRegister from "./UserRegister";
import ForgotPassword from "../pages/user-register/ForgotPassword";
import Otp from "../pages/user-register/Otp";
import RefreshPassword from "../pages/user-register/RefreshPassWord";
import Profile from "../pages/Login/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./CheckOut";
import CartPayment from "../pages/payment/CartPayment";
import Question from "./../pages/Question/Question";
import Pages from "./Pages";
import Blog from "../pages/DichVu/Blog";
import Contactus from "../pages/DichVu/Contactus";
import AllPosts from "../pages/DichVu/AllPosts";
const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/detail/:id" element={<DetaiProduct />}></Route>
      <Route path="/ListingGrid" element={<Listing_grid />}></Route>
      <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/category" element={<Category />}></Route>
      <Route path="/listinglarge" element={<ListingLarge />}></Route>
      <Route path="/offer" element={<Offer />}></Route>
      <Route path="/profileaddress" element={<ProfileAddress />}></Route>
      <Route path="/profilemain" element={<ProfileMain />}></Route>
      <Route path="/profileorder" element={<ProfileOrders />}></Route>
      <Route path="/profilesell" element={<ProfileSeller />}></Route>
      <Route path="/profilesetting" element={<ProfileSetting />}></Route>
      <Route path="/profilewish" element={<ProfileWishlist />}></Route>
      <Route path="/register" element={<UserRegister />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path="/otp" element={<Otp />}></Route>
      <Route path="/refresh-password" element={<RefreshPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/checkout" element={<CheckOut />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/cart-payment" element={<CartPayment />}></Route>
      <Route path="/question" element={<Question />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/contact" element={<Contactus />}></Route>
      <Route path="/pages" element={<AllPosts />}></Route>
      <Route path="/pages/:id" element={<Pages />}></Route>
    </Routes>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </main>
);
export default Main;
