import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>Cadastro de Produtos</h1>
        <ProductForm />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="produtos/:categoria" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
