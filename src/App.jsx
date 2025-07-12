import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./paginaErro.jsx";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ProductEditor from "./ProductEdit.jsx";
import Header from "./Header.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="produtos/:categoria" element={<ProductList />} />
        <Route path="*" element={<Error />} />
        <Route path="novoproduto" element={<ProductForm />} />
        <Route path="editarproduto/:id" element={<ProductEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
