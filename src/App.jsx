import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import './App.css'
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import Header from "./Header";

function App() {
  return (
    <div>
      <span>
      <Header />
      <BrowserRouter>
        <div>
          <div className="route">
            <a href="">Camisas</a>
            <a href="">Calças</a>
            <a href="">Acessórios</a>
          </div><hr/><br/>
        </div>
        <Routes>
          
        </Routes>
      </BrowserRouter>
      </span>
      
      <h1>Cadastro de Produtos</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;
