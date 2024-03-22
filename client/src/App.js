import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PastOrders from "./pages/PastOrders";
import CheckoutPage from "./pages/CheckoutPage";
import NoPage from "./pages/NoPage";
import DetailPage from "./pages/DetailPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Footer from "./components/Footer";
import { CartProvider } from "./components/cart/context/CartContext";
import SignInSignUp from "./pages/SignInSignUp";

import { useState } from "react";
import AllProducts from "./pages/AllProducts";
import AllOrders from "./pages/AllOrders";
import EditPage from "./components/EditPage";



const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // If there's no user, redirect to sign-in page
    return <Navigate to="/SignInSignUp" replace />;
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Home />} />
            <Route path="pastOrders" element={<PastOrders />} />
            <Route path="checkoutPage" element={<CheckoutPage />} />
            <Route path="DetailPage/:id" element={<DetailPage />} />
            <Route path="editPage/:id" element={<EditPage />} />
            <Route path="allProducts" element={<AllProducts/>} />
            <Route path="allOrders" element={<AllOrders />} />
            <Route path="SignInSignUp" element={<SignInSignUp setUser={setUser} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </CartProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);