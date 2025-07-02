import { useState } from "react";
import { supabase } from "./supabase";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Selecione uma imagem");
      return;
    }

    const imageName = `${Date.now()}_${image.name}`;
    const imagePath = `${imageName}`;

    // 1. Upload da imagem
    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(imagePath, image);

    if (storageError) {
      alert("Erro ao enviar imagem");
      console.error(storageError);
      return;
    }

    // 2. Obter URL pública da imagem
    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(imagePath);

    const imageUrl = urlData.publicUrl;

    // 3. Novo produto
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
      category,
      gender,
      imageUrl,
      imagePath,
    };

    // 4. Baixar JSON real existente do Supabase (sem cache)
    let productList = [];

    const { data: fileData, error: downloadError } = await supabase.storage
      .from("products-json")
      .download("produtos.json");

    if (downloadError) {
      console.warn("Arquivo ainda não existe, será criado.");
    } else {
      const text = await fileData.text();
      try {
        const parsed = JSON.parse(text);
        productList = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error("Erro ao interpretar JSON existente:", e);
      }
    }

    // 5. Adicionar novo produto à lista
    productList.push(newProduct);

    const updatedJson = new Blob([JSON.stringify(productList)], {
      type: "application/json",
    });

    // 6. Substituir JSON no Supabase
    const { error: uploadError } = await supabase.storage
      .from("products-json")
      .upload("produtos.json", updatedJson, { upsert: true });

    if (uploadError) {
      alert("Erro ao salvar JSON");
      console.error(uploadError);
    } else {
      alert("Produto cadastrado com sucesso!");
      // Resetar formulário
      setName("");
      setPrice("");
      setDescription("");
      setStock("");
      setCategory("");
      setGender("");
      setImage(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Estoque"
        required
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoria"
        required
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Selecione o gênero</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="unissex">Unissex</option>
      </select>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}
