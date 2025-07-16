import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import "./ProductList.css";
import Pagination from "./Pagination";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const params = useParams();

  useEffect(() => {
    setCurrentPage(1);
  }, [params.categoria]);

  let categoria;
  switch (params.categoria) {
    case "camisas":
      categoria = "Camisas";
      break;
    case "calcas":
      categoria = "Calças";
      break;
    case "acessorios":
      categoria = "Acessórios";
      break;
    case "calcados":
      categoria = "Calçados";
      break;
    case "intimas":
      categoria = "Intimo";
      break;
    default:
      categoria = null;
      break;
  }

  const carregarProdutos = async () => {
    setLoading(true);

    const { data: urlData, error } = supabase.storage
      .from("products-json")
      .getPublicUrl("produtos.json");

    if (error) {
      console.error("Erro ao obter URL do JSON:", error);
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const correspondentPosts = products.filter(
    (p) => p.category === categoria || categoria === null
  );
  const currentPosts = correspondentPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div style={{ padding: "30px" }}>
      <h2 className="products-title">{categoria}</h2>

      {loading && <p className="message">Carregando produtos....</p>}
      {!loading && products.length === 0 && (
        <p className="message">Nenhum produto encontrado.</p>
      )}

      {!loading && (
        <>
          <div className="products-list">
            {currentPosts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                image={p.imageUrl}
                description={p.description}
                estoque={p.stock}
                categoria={p.category}
                genero={p.gender}
                id={p.id}
                onDelete={carregarProdutos} // <-- Atualiza após exclusão!
              />
            ))}
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={correspondentPosts.length}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
