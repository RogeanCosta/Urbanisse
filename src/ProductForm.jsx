import { useRef, useState } from 'react';
import { supabase } from './supabase';
import './ProductForm.css';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef = useRef();

  // Função que deixa a primeira letra maiúscula
  function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (!image) {
      alert('Selecione uma imagem');
      setIsLoading(false);
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(image.type)) {
      alert('Formato de imagem inválido. Use JPEG, PNG ou WEBP.');
      setIsLoading(false);
      return;
    }

    if (parseFloat(price) <= 0 || isNaN(price)) {
      alert('O preço deve ser um número positivo.');
      setIsLoading(false);
      return;
    }

    if (parseInt(stock) < 0 || isNaN(stock)) {
      alert('O estoque não pode ser negativo.');
      setIsLoading(false);
      return;
    }

    if (name.trim().length < 3 || description.trim().length < 5) {
      alert('Nome ou descrição muito curtos.');
      setIsLoading(false);
      return;
    }

    const imageName = `${Date.now()}_${image.name}`;
    const imagePath = `${imageName}`;

    // 1. Upload da imagem
    const { error: storageError } = await supabase.storage
      .from('images')
      .upload(imagePath, image);

    if (storageError) {
      alert('Erro ao enviar imagem');
      console.error(storageError);
      setIsLoading(false);
      return;
    }

    // 2. Obter URL pública da imagem
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(imagePath);

    const imageUrl = urlData.publicUrl;

    // 3. Criar novo produto com normalização
    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      stock: parseInt(stock),
      category: capitalizeFirst(category.trim()),
      gender: capitalizeFirst(gender.trim()),
      imageUrl,
      imagePath,
    };

    // 4. Obter produtos existentes
    let productList = [];

    const { data: fileData, error: downloadError } = await supabase.storage
      .from('products-json')
      .download('produtos.json');

    if (!downloadError) {
      const text = await fileData.text();
      try {
        const parsed = JSON.parse(text);
        productList = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error('Erro ao interpretar JSON existente:', e);
      }
    }

    // 5. Adicionar e ordenar produtos
    productList.push(newProduct);
    productList.sort((a, b) => b.id - a.id);

    const updatedJson = new Blob([JSON.stringify(productList)], {
      type: 'application/json',
    });

    // 6. Salvar JSON atualizado
    const { error: uploadError } = await supabase.storage
      .from('products-json')
      .upload('produtos.json', updatedJson, { upsert: true });

    if (uploadError) {
      alert('Erro ao salvar JSON');
      console.error(uploadError);
    } else {
      alert('Produto cadastrado com sucesso!');

      // Resetar formulário
      setName('');
      setPrice('');
      setDescription('');
      setStock('');
      setCategory('');
      setGender('');
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = null;
      }
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      <label htmlFor="image">Imagem do Produto</label>
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => setImage(e.target.files[0])}
        required
        name="image"
      />

      <label htmlFor="name">Nome do Produto</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        required
        name="name"
      />

      <label htmlFor="price">Preço</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
        name="price"
        required
      />

      <label htmlFor="description">Descrição</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
        name="description"
      />

      <label htmlFor="stock">Quantidade no estoque</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Estoque"
        required
        name="stock"
      />

      <label htmlFor="category">Categoria</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
        name="gender"
      >
        <option value="">Selecione o gênero</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
        <option value="Unissex">Unissex</option>
      </select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : 'Cadastrar Produto'}
      </button>
    </form>
  );
}
