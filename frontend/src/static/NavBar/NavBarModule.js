import React from 'react';
import { Link } from 'react-router-dom';

import OnOff from '../../assets/OnOff.png'
import LoginIMG from '../../assets/login.png'
import Home from '../../assets/home.png'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import Cookie from 'cookie-universal'
const cookies = Cookie()


const NavBarModule = ({ noUrl }) =>  {


    const logout = (e) => {
        cookies.remove("crr_user")
        window.location.reload();
    }


    return (
        <ul className="navbar-nav">
            {noUrl === 2 ||  noUrl === 0 || noUrl === 3  || noUrl === 1 ? <li className="nav-item" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                <img src={Home} alt="Bootstrap" width="32" height="27" />
                <Link to={noUrl === 2 ? "/Module-Repartidor" : noUrl === 0 ? "/Module-Admin" :  noUrl === 3 ? "/Module-Empresa" : "/Module-Cliente"} className="nav-link">Inicio</Link>
            </li> : <li></li>}

            {noUrl === 2 ? <li className="nav-item" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                <img src={LoginIMG} alt="Bootstrap" width="32" height="27" />
                <Link to="/MiPerfil" className="nav-link">Ver Perfil</Link>
            </li> : <li></li>}

            {noUrl === 0 || noUrl === 3 ? <li className="nav-item" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                <img src={LoginIMG} alt="Bootstrap" width="32" height="27" />
                <Link to={noUrl === 0 ? "/Reportes-Admin" : "/Reportes-Empresa"} className="nav-link">Ver Reportes</Link>
            </li> : <li></li>}

            {noUrl === 1 ? <li className="nav-item" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                {/* <img src={carrt} alt="Bootstrap" width="32" height="27" /> */}
                <NewspaperIcon sx={{ fontSize: 30,  color: 'white' }} />
                <Link to="/Ordenes-Cliente" className="nav-link">Pedidos</Link>
                <ShoppingCartIcon sx={{ fontSize: 30,  color: 'white' }} />
                <Link to="/Carrito-Cliente" className="nav-link">Carrito</Link>
               
            </li> : <li></li>}

            <li className="nav-item" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }} onClick={logout}>
                <img src={OnOff} alt="Bootstrap" width="30" height="27" />
                <Link to="/" className="nav-link">Cerrar Sesión</Link>
            </li>
        </ul>
    );
};

export default NavBarModule;