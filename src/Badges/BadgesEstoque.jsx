import React from "react";
import boxIcon from "../assets/box.svg";
import boxWithoutIcon from "../assets/box-without-estoque.svg";
import "./Badges.css";

const BadgesEstoque = ({ estoque }) => {
  const icone = estoque ? boxIcon : boxWithoutIcon;
  const texto = estoque ? `${estoque} em estoque` : "sem estoque";
  const classe = estoque ? "badge-estoque" : "badge-sem-estoque";

  return (
    <li className={`${classe} badge`}>
      <img src={icone} alt="" />
      <span>{texto}</span>
    </li>
  );
};

export default BadgesEstoque;
