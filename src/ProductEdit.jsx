import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductForm.css";

export default function ProductEditor() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data: urlData } = supabase.storage
          .from("products-json")
          .getPublicUrl("produtos.json");

        const response = await fetch(`${urlData.publicUrl}?t=${Date.now()}`);
        const text = await response.text();
        const parsed = JSON.parse(text);
        const productsArray = Array.isArray(parsed) ? parsed : [parsed];

        setProducts(productsArray);
      } catch (error) {
        console.error("Erro ao carregar JSON:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          category: product.category,
          gender: product.gender,
        });
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedProducts = products.map((product) => {
      if (product.id === parseInt(id)) {
        return {
          ...product,
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          name: formData.name.trim(),
          description: formData.description.trim(),
          category: capitalizeFirst(formData.category.trim()),
          gender: capitalizeFirst(formData.gender.trim()),
        };
      }
      return product;
    });

    const updatedJson = new Blob([JSON.stringify(updatedProducts)], {
      type: "application/json",
    });

    const { error } = await supabase.storage
      .from("products-json")
      .upload("produtos.json", updatedJson, { upsert: true });

    if (error) {
      alert("Erro ao salvar alterações");
      console.error(error);
    } else {
      alert("Produto atualizado com sucesso!");
      setProducts(updatedProducts);

      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        gender: "",
      });

      navigate("/");
    }

    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      {id && (
        <form
          onSubmit={handleUpdate}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <label htmlFor="name">Nome do Produto</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />

          <label htmlFor="price">Preço</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Preço"
            required
          />

          <label htmlFor="description">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />

          <label htmlFor="stock">Quantidade no estoque</label>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Estoque"
            required
          />

          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a categoria</option>
            <option value="Camisas">Camisas</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Calçados">Calçados</option>
            <option value="Calças">Calças</option>
            <option value="Intimo">Intimo</option>
          </select>

          <label htmlFor="gender">Gênero</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Unissex">Unissex</option>
          </select>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      )}
    </div>
  );
}
