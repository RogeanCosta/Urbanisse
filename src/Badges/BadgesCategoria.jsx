import React from "react";
import CalcasIcon from "../assets/calcas.svg";
import CamisasIcon from "../assets/camisas.svg";
import CalcadosIcon from "../assets/calcado.svg";
import AcessoriosIcon from "../assets/sunglasses.svg";
import IntimosIcon from "../assets/intimo.svg";
import "./Badges.css";

const BadgesCategoria = ({ categoria }) => {
  let icone;
  let classe;

  switch (categoria.toLowerCase()) {
    case "calças":
      icone = CalcasIcon;
      classe = "badge-calcas";
      break;
    case "intimo":
      icone = IntimosIcon;
      classe = "badge-intimo";
      break;
    case "acessórios":
      icone = AcessoriosIcon;
      classe = "badge-acessorios";
      break;
    case "calçados":
      icone = CalcadosIcon;
      classe = "badge-calcados";
      break;
    default:
      icone = CamisasIcon;
      classe = "badge-camisas";
  }

  return (
    <li className={`${classe} badge`}>
      <img src={icone} alt="" />
      <span>{categoria}</span>
    </li>
  );
};

export default BadgesCategoria;
