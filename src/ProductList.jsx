import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data: urlData, error } = supabase.storage
        .from("products-json")
        .getPublicUrl("produtos.json");

      if (error) {
        console.error("Erro ao obter URL do JSON:", error);
        return;
      }

      try {
        const response = await fetch(`${urlData.publicUrl}?t=${Date.now()}`);
        if (!response.ok) throw new Error("Erro ao carregar JSON");

        const json = await response.json();
        const lista = Array.isArray(json) ? json : [json];
        setProducts(lista);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      {products.length === 0 && <p>Nenhum produto encontrado.</p>}
      <div
        className="product-list"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            image={p.imageUrl}
            description={p.description}
            estoque={p.stock}
            categoria={p.category}
            genero={p.gender}
          />
        ))}
      </div>
    </div>
  );
}
