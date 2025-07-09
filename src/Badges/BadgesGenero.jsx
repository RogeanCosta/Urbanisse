import React from "react";
import UnissexIcon from "../assets/unissex-gender.svg";
import MasculineIcon from "../assets/masculino-icon.svg";
import FeminineIcon from "../assets/feminino-icon.svg";
import "./Badges.css";

const BadgesGenero = ({ genero }) => {
  let icone;
  let classe;

  switch (genero.toLowerCase()) {
    case "unissex":
      icone = UnissexIcon;
      classe = "badge-unissex";
      break;
    case "masculino":
      icone = MasculineIcon;
      classe = "badge-masculino";
      break;
    default:
      icone = FeminineIcon;
      classe = "badge-feminino";
  }

  return (
    <li className={`${classe} badge`}>
      <img src={icone} alt="" />
      <span>{genero}</span>
    </li>
  );
};

export default BadgesGenero;
