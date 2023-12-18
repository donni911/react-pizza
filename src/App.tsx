import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import Header from "./components/Header.tsx";
import Categories from "./components/Categories.tsx";
import Sort from "./components/Sort.tsx";
import PizzaBlock from "./components/PizzaBlock/index.tsx";
import Skeleton from "./components/PizzaBlock/Skeleton.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
