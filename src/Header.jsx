import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from './assets/Urbanisse-logo.svg'
import './Header.css'
import Camisas from './camisas.jsx'
import Calcas from './calcas.jsx'
import Acessorios from './acessorios.jsx'
import Intimas from './intimas.jsx'
import Calcados from './calcados.jsx'

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
                    <nav className="route">
                        <a className='colorLink' href="/camisas"><button className='botaoLink'>Camisas</button></a>
                        <a className='colorLink' href="/calcas"><button className='botaoLink'>Calças</button></a>
                        <a className='colorLink' href="/acessorios"><button className='botaoLink'>Acessórios</button></a>
                        <a className='colorLink' href="/calcados"><button className='botaoLink'>Calçados</button></a>
                        <a className='colorLink' href="/intimas"><button className='botaoLink'>Roupas íntimas</button></a>
                    </nav>
                </div>
            </header>
            <hr/><br/>
                <Routes>
                    <Route path='/camisas' element={<Camisas/>}/>
                    <Route path='/calcas' element={<Calcas/>}/>
                    <Route path='/acessorios' element={<Acessorios/>}/>
                    <Route path='/calcados' element={<Calcados/>}/>
                    <Route path='/intimas' element={<Intimas/>}/>
                </Routes>
            </BrowserRouter>
        </span>        
        </>
    )
}