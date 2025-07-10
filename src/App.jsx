import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./paginaErro.jsx";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ProductEditor from "./ProductEdit.jsx";
import Header from "./Header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <h1>Cadastro de Produtos</h1>
      <ProductForm />

       <h1>Editar Produto</h1>
      <ProductEditor />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="produtos/:categoria" element={<ProductList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
