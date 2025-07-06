import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import './App.css'
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header/>
      
      <h1>Cadastro de Produtos</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;
