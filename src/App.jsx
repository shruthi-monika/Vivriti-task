
import './App.css';
import Navbar from "./Components/Navbar";
import ProductList from './Components/ProductList';
import Banner from './Components/Banner';
function App() {
  return (
    <div className="container">
      <Navbar />
      <Banner />
      <ProductList />
    </div>
  );
}

export default App;
