import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <>
      <header className="header">
        <div className=" headerContent">
          <Link to="/" className="logo">
            <h2>Urbanisse</h2>
          </Link>
          <nav className='categorias-header'>
            <Link to="produtos/camisas">
              <button className="botaoLink">Camisas</button>
            </Link>
            <Link to="produtos/calcas">
              <button className="botaoLink">Calças</button>
            </Link>
            <Link to="produtos/acessorios">
              <button className="botaoLink">Acessórios</button>
            </Link>
            <Link to="produtos/calcados">
              <button className="botaoLink">Calçados</button>
            </Link>
            <Link to="produtos/intimas">
              <button className="botaoLink">Roupas íntimas</button>
            </Link>
          </nav>
          <nav className='novo-produto'>
            <Link to="novoproduto">
              <button className='botaoNovoProduto'>+ Novo Produto</button>
            </Link>
          </nav>
        </div>
        <hr />
      </header>
    </>
  );
}