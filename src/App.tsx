import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Student from "./components/Student";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Products from "./pages/Product";
import Orders from "./pages/orders/Order";
import CreateOrders from "./pages/orders/CreateOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/create" element={<CreateOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
