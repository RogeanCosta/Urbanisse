import React from "react";
import { supabase } from "./supabase";

export default function DeleteConfirmation({ produto, onCancel, onDeleted }) {
  if (!produto || !produto.id || !produto.imagePath) {
    console.error("Produto inválido no modal de exclusão:", produto);
    return null;
  }

  const handleDelete = async () => {
    try {
      const { data, error: downloadError } = await supabase.storage
        .from("products-json")
        .download("produtos.json");

      if (downloadError) {
        console.error("Erro ao baixar produtos.json:", downloadError.message);
        alert("Erro ao carregar lista de produtos.");
        return;
      }

      const text = await data.text();
      const produtos = JSON.parse(text);

      const produtosAtualizados = produtos.filter((p) => p.id !== produto.id);

      const novoBlob = new Blob([JSON.stringify(produtosAtualizados)], {
        type: "application/json",
      });

      const { error: uploadError } = await supabase.storage
        .from("products-json")
        .upload("produtos.json", novoBlob, { upsert: true });

      if (uploadError) {
        console.error("Erro ao atualizar produtos.json:", uploadError.message);
        alert("Erro ao excluir o produto.");
        return;
      }

      const { error: imageError } = await supabase.storage
        .from("images")
        .remove([produto.imagePath]);

      if (imageError) {
        console.error("Erro ao excluir imagem:", imageError.message);
        alert("Produto excluído, mas a imagem não foi removida.");
        if (onDeleted) onDeleted();
        return;
      }

      alert("Produto excluído com sucesso!");
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error("Erro inesperado ao excluir:", err.message);
      alert("Erro ao excluir o produto ou imagem.");
    }
  };

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p
          style={{
            fontWeight: "700",
            color: "#e07b39",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span role="img" aria-label="Aviso">⚠️</span>
          Tem certeza que deseja excluir este produto?
        </p>
        <div className="confirm-buttons">
          <button onClick={handleDelete} className="confirm-yes">Excluir</button>
          <button onClick={onCancel} className="confirm-no">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
