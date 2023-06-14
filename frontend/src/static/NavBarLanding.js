import React from 'react';
import { Link } from 'react-router-dom';
import LoginIMG from '../assets/login.png'
import regimg from '../assets/registro.png'

const NavBarLanding = () => { 
  return (
    <ul className="navbar-nav">
      <li className="nav-item dropdown" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
        <img src={regimg} alt="Bootstrap" width="32" height="27" />
        <button type="button" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Regístrate
        </button>
        <ul className="dropdown-menu" style={{ backgroundColor: "black" }}>
          <li><Link to="/SingUp-Cliente" className="dropdown-item">Cliente</Link></li>
          <li><Link to="/SingUp-Repartidor" className="dropdown-item">Repartidor</Link></li>
          <li><Link to="/SingUp-Empresa" className="dropdown-item">Empresa</Link></li>
        </ul>
      </li>

      <li className="nav-item dropdown" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
        <img src={LoginIMG} alt="Bootstrap" width="32" height="27" />
        <button type="button" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Login
        </button>
        <ul className="dropdown-menu" style={{ backgroundColor: "black" }}>
          <li><Link to="/Login-Cliente" className="dropdown-item">Cliente</Link></li>
          <li><Link to="/Login-Repartidor" className="dropdown-item">Repartidor</Link></li>
          <li><Link to="/Login-Empresa" className="dropdown-item">Empresa</Link></li>
        </ul>
      </li>
    </ul>
  );
};

export default NavBarLanding;
