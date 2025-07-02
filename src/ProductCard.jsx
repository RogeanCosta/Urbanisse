import React from "react";
import "./ProductCard.css";
import boxIcon from "./assets/box.svg";
import SunglassesIcon from "./assets/sunglasses.svg";
import UnissexIcon from "./assets/unissex-gender.svg";
import DeleteIcon from "./assets/trash.svg";
import EditIcon from "./assets/pencil.svg";

export default function ProductCard({
  name,
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
      </figure>
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

        <ul className="badges-list">
          <li className="badge-estoque">
            <img src={boxIcon} alt="" />
            <span>{estoque} em estoque</span>
          </li>
          <li className="badge-categoria">
            <img src={SunglassesIcon} alt="" />
            <span>{categoria}</span>
          </li>
          <li className="badge-genero">
            <img src={UnissexIcon} alt="" />
            <span>{genero}</span>
          </li>
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
