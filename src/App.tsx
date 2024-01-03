import React, {  useState } from "react";
import "./scss/app.scss";
import Header from "./components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';
import NotFound from './pages/NotFound.tsx';
import PizzaPage from "./pages/PizzaPage.tsx";



function App() {

  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pizza/:id" element={<PizzaPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
