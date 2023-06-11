import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='App'>
            <footer>
                <div className="container">
                    <div className="row" style={{ alignContent: "center" }}>
                        <div className="col">
                            <h1>&nbsp;</h1>
                        </div>
                        <div className="col">
                            <h7>&nbsp;</h7>
                            <ul className="link-list">
                                <li ><Link to="/preguntas" className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Preguntas Frecuentes</Link></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h7>&nbsp;</h7>
                            <ul className="link-list">
                                <li ><Link to="/terminos" className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Términos y condiciones</Link></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h7>&nbsp;</h7>
                            <ul className="link-list">
                                <li ><Link to="/politicas" className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Políticas de Privacidad</Link></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h1>&nbsp;</h1>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;