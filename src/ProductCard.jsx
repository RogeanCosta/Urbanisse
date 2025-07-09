import React from "react";
import "./ProductCard.css";
import SunglassesIcon from "./assets/sunglasses.svg";
import DeleteIcon from "./assets/trash.svg";
import EditIcon from "./assets/pencil.svg";
import BadgesEstoque from "./Badges/BadgesEstoque";
import BadgesGenero from "./Badges/BadgesGenero";
import BadgesCategoria from "./Badges/BadgesCategoria";

export default function ProductCard({
  name,
  price,
  image,
  description,
  estoque,
  categoria,
  genero,
}) {
  return (
    <div className="product-card">
      <figure className="img-container">
        <img src={image} alt={`Foto do produto ${name}`} />
        <span className="price">
          R$ {String(price.toFixed(2)).replace(".", ", ")}
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
        <button className="edit-button">
          <img src={EditIcon} alt="" />
          <span>Editar</span>
        </button>
        <button className="delete-button">
          <img src={DeleteIcon} alt="" />
          <span>Excluir</span>
        </button>
      </div>
    </div>
  );
}
