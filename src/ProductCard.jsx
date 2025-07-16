import React, { useState } from 'react';
import './ProductCard.css';
import DeleteIcon from './assets/trash.svg';
import EditIcon from './assets/pencil.svg';
import BadgesEstoque from './Badges/BadgesEstoque';
import BadgesGenero from './Badges/BadgesGenero';
import BadgesCategoria from './Badges/BadgesCategoria';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const produto = {
    id,
    name,
    price,
    description,
    stock: estoque,
    category: categoria,
    gender: genero,
    imagePath: image.split('/').pop(), 
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
            <img src={EditIcon} alt="Ícone de editar" />
            <span>Editar</span>
          </button>
        </Link>
        <button className="delete-button" onClick={() => setShowConfirm(true)}>
          <img src={DeleteIcon} alt="Ícone de excluir" />
          <span>Excluir</span>
        </button>
      </div>

      {showConfirm && (
        <DeleteConfirmation
          produto={produto}
          onCancel={() => setShowConfirm(false)}
          onDeleted={() => {
            setShowConfirm(false);
            if (onDelete) {
              onDelete(); 
            } else {
              navigate('/'); 
            }
          }}
        />
      )}
    </div>
  );
}
