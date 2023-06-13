import {  Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import MiLogo from '../assets/AlChilazoLogo.png'

function NavBar({customContend}) {
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
                       {customContend}
                    </div>
                </div>
            </nav></div>
    );
}

export default NavBar;