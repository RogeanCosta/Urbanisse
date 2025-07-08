import { BrowserRouter, Route, Routes, Link, Router  } from 'react-router-dom'
import logo from './assets/Urbanisse-logo.svg'
import './Header.css'
import Camisas from './camisas.jsx'
import Calcas from './calcas.jsx'
import Acessorios from './acessorios.jsx'
import Intimas from './intimas.jsx'
import Calcados from './calcados.jsx'
import Error from './paginaErro.jsx'

export default function Header(){

    return (
        <>
        <span>
        <BrowserRouter>
            <header className='header'>
                <div className='headerContent'>
                    <div className='logo'>
                        <h2>Urbanisse</h2>
                    </div>
                    <nav style={{ display: "flex", gap: "20px" }}>
                        <Link to="/camisas"><button className='botaoLink'>Camisas</button></Link>
                        <Link to="/calcas"><button className='botaoLink'>Calças</button></Link>
                        <Link to="/acessorios"><button className='botaoLink'>Acessórios</button></Link>
                        <Link to="/calcados"><button className='botaoLink'>Calçados</button></Link>
                        <Link to="/intimas"><button className='botaoLink'>Roupas íntimas</button></Link>
                    </nav>
                </div>
            </header><br />
            <hr/><br/>
                <Routes>
                    <Route path='/camisas' element={<Camisas/>}/>
                    <Route path='/calcas' element={<Calcas/>}/>
                    <Route path='/acessorios' element={<Acessorios/>}/>
                    <Route path='/calcados' element={<Calcados/>}/>
                    <Route path='/intimas' element={<Intimas/>}/>
                    <Route path='*' element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </span>        
        </>
    )
}