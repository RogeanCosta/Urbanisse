import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function ProductEditor() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Função para deixar a primeira letra maiúscula
  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Carrega os produtos do JSON ao iniciar
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.storage
        .from("products-json")
        .download("produtos.json");

      if (error) {
        console.error("Erro ao carregar JSON:", error);
        return;
      }

      try {
        const text = await data.text();
        const parsed = JSON.parse(text);
        setProducts(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (err) {
        console.error("Erro ao interpretar JSON:", err);
      }
    }

    fetchProducts();
  }, []);

  // Preenche o formulário quando um produto é selecionado
  useEffect(() => {
    if (selectedId) {
      const product = products.find((p) => p.id === parseInt(selectedId));
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
  }, [selectedId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedProducts = products.map((product) => {
      if (product.id === parseInt(selectedId)) {
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

      // 🧼 Limpa o formulário e o select após salvar
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        gender: "",
      });
      setSelectedId("");
    }

    setIsLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Editar Produto</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%" }}
      >
        <option value="">Selecione um produto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} (ID: {product.id})
          </option>
        ))}
      </select>

      {selectedId && (
        <form
          onSubmit={handleUpdate}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Preço"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição"
            required
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Estoque"
            required
          />
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
            <option value="Moletons">Moletons</option>
          </select>
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
