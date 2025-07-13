import React, { useState } from 'react';
import './ProductCard.css';
import DeleteIcon from './assets/trash.svg';
import EditIcon from './assets/pencil.svg';
import BadgesEstoque from './Badges/BadgesEstoque';
import BadgesGenero from './Badges/BadgesGenero';
import BadgesCategoria from './Badges/BadgesCategoria';
import { Link, useNavigate } from 'react-router-dom'; // <-- import useNavigate
import DeleteConfirmation from './DeleteConfirm';
import { supabase } from './supabase';

export default function ProductCard({
  name,
  price,
  image,
  description,
  estoque,
  categoria,
  genero,
  id,
  onDelete,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate(); // <-- inicializa o hook

  const handleDelete = async () => {
    const { data, error } = await supabase.storage
      .from('products-json')
      .download('produtos.json');

    if (error) {
      alert('Erro ao buscar produtos.');
      return;
    }

    const text = await data.text();
    const produtos = JSON.parse(text);

    const produtosAtualizados = produtos.filter((produto) => produto.id !== id);

    const novoJSON = new Blob([JSON.stringify(produtosAtualizados)], {
      type: 'application/json',
    });

    const { error: uploadError } = await supabase.storage
      .from('products-json')
      .upload('produtos.json', novoJSON, { upsert: true });

    if (uploadError) {
      alert('Erro ao excluir o produto.');
      return;
    }

    alert('Produto excluído com sucesso!');
    setShowConfirm(false);

    if (onDelete) {
      onDelete();
    } else {
      navigate('/'); // <-- redireciona para a listagem
    }
  };

  return (
    <div className="product-card">
      <figure className="img-container">
        <img src={image} alt={`Foto do produto ${name}`} />
        <span className="price">
          R$ {String(price.toFixed(2)).replace('.', ', ')}
        </span>
      </figure>
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

        <ul className="badges-list">
          <BadgesEstoque estoque={estoque} />
          <BadgesCategoria categoria={categoria} />
          <BadgesGenero genero={genero} />
        </ul>
      </div>
      <div className="action-buttons">
        <Link to={`/editarproduto/${id}`}>
          <button className="edit-button">
            <img src={EditIcon} alt="" />
            <span>Editar</span>
          </button>
        </Link>
        <button className="delete-button" onClick={() => setShowConfirm(true)}>
          <img src={DeleteIcon} alt="" />
          <span>Excluir</span>
        </button>
      </div>

      {showConfirm && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
