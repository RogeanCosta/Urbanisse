import { supabase } from "./supabase";

export default function ResetButton() {
  const handleReset = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja apagar todos os produtos?"
    );
    if (!confirm) return;

    const emptyJson = new Blob([JSON.stringify([])], {
      type: "application/json",
    });

    const { error } = await supabase.storage
      .from("products-json")
      .upload("produtos.json", emptyJson, { upsert: true });

    if (error) {
      alert("Erro ao resetar JSON");
      console.error(error);
    } else {
      alert("Arquivo produtos.json resetado com sucesso!");
    }
  };

  return (
    <button
      onClick={handleReset}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#d9534f",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Resetar JSON
    </button>
  );
}
