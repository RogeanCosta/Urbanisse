import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./paginaErro.jsx";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import Header from "./Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <h1>Cadastro de Produtos</h1>
      <ProductForm />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="produtos/:categoria" element={<ProductList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
