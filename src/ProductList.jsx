import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  let categoria;

  switch (params.categoria) {
    case 'camisas':
      categoria = 'Camisas';
      break;
    case 'calcas':
      categoria = 'Calças';
      break;
    case 'acessorios':
      categoria = 'Acessórios';
      break;
    case 'calcados':
      categoria = 'Calçados';
      break;
    case 'intimas':
      categoria = 'Intimo';
      break;
    default:
      categoria = null;
      break;
  }

  useEffect(() => {
    async function fetchProducts() {
      const { data: urlData, error } = supabase.storage
        .from('products-json')
        .getPublicUrl('produtos.json');

      if (error) {
        console.error('Erro ao obter URL do JSON:', error);
        return;
      }

      try {
        const response = await fetch(`${urlData.publicUrl}?t=${Date.now()}`);
        if (!response.ok) throw new Error('Erro ao carregar JSON');

        const json = await response.json();
        const lista = Array.isArray(json) ? json : [json];
        setProducts(lista);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '80px' }}>
      <h2 className="products-title">{categoria}</h2>
      {products.length === 0 && <p>Nenhum produto encontrado.</p>}
      <div className="products-list">
        {products
          .filter((p) => p.category === categoria || categoria === null)
          .map((p) => (
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
            />
          ))}
      </div>
    </div>
  );
}
