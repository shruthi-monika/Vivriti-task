import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import ProductList from "./Components/ProductList";

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <Navbar setProducts={setProducts} products={products} />
      <Banner />
      <ProductList products={products} setProducts={setProducts} /> 
    </div>
  );
};

export default App;
