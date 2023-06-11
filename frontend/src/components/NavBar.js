import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import MiLogo from '../assets/AlChilazoLogo.png'
import LoginIMG from '../assets/login.png'
import regimg from '../assets/registro.png'

function NavBar() {
    return (
        <div className='App'>
            <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{ backgroundColor: "black", position:"fixed", top:"0", left:"0", width:"100%" }}>
                <div className="container-fluid">
                    <img src={MiLogo} alt="Bootstrap" width="30" height="30" />
                    <Link to="/" className="navbar-brand" style={{ marginLeft: "0.5%" }}>AlChilazo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <ul className="navbar-nav">
                            <li class="nav-item dropdown" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                                <img src={regimg} alt="Bootstrap" width="32" height="27" />
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Regístrate
                                </a>
                                <ul class="dropdown-menu" style={{ backgroundColor: "black" }}>
                                    <li><Link to="/" className="dropdown-item">Cliente</Link></li>
                                    <li><Link to="/" className="dropdown-item">Repartidor</Link></li>
                                    <li><Link to="/" className="dropdown-item">Empresa</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                                <img src={LoginIMG} alt="Bootstrap" width="32" height="27" />
                                <Link to="/" className="nav-link">Iniciar sesión</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav></div>
    );
}

export default NavBar;