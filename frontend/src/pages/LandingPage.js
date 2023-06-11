import NavBar from "../components/NavBar";
import '../styles/LandingCSS.css'
import MiLogo from '../assets/AlChilazoLogo.png'
import f1 from '../assets/f1.jpg'
import r1 from '../assets/r1.png'
import r2 from '../assets/r2.jpg'
import r3 from '../assets/r3.jpg'
import v1 from '../assets/v1.jpg'

import Footer from "../components/Footer";


function LandingPage() {
    return (
        <div>
            <NavBar className="nav" />
            <div className="presentacion">
                <div className="frase">
                    <img src={MiLogo} className="logoFrase" alt="Logo" />
                    <h1 className="ff">Satisfacción en cada pedido, entregado directamente en tu puerta.</h1>
                    <img src={MiLogo} className="logoFrase" alt="Logo" />
                </div>
            </div>
            <div className="Registro2">
                <div className="box">
                    <center><img src={r1} className="rimg" alt="R1"></img></center>
                    <h2>Pide tu comida a tus familiares</h2>
                    <p>Crear una cuenta de cliente.</p>
                </div>
                <div className="box">
                    <center><img src={r2} className="rimg" alt="R2"></img></center>
                    <h2>Tu restaurante, a domicilio</h2>
                    <p>Agrega tu restaurante.</p>
                </div>
                <div className="box">
                    <center><img src={r3} className="rimg" alt="R3"></img></center>
                    <h2>Haz entregas con la app AlChilazo</h2>
                    <p>Regístrate para realizar entregas.</p>
                </div>
            </div>
            <div className="somos" id="somos">
                <div style={{ width: "90%" }}><h1>Quienes somos</h1>

                    <br />

                    <p>AlChilazo es la plataforma líder en entrega de comida rápida guatemalteca a domicilio.
                        Nos especializamos en ofrecer una amplia variedad de platillos auténticos y sabrosos, entregados
                        con conveniencia y puntualidad. Nuestro objetivo es satisfacer tus antojos y brindarte una experiencia
                        culinaria excepcional, directamente en la comodidad de tu hogar. Confía en nosotros para disfrutar de
                        sabores rápidos y auténticos en cada pedido.</p></div>
                <img src={f1} className="f1" alt="Ref"></img>
            </div>
            <div className="equipo" id="equipo">
                <h1> Equipo </h1>
                <div className="nombres">
                    <div class="row">
                        <div class="col">
                            <h3>Erwin Fernando Vásquez Peñate</h3>
                            <p>Desarrollador de Backend</p>
                            <h4>&nbsp;</h4>
                        </div>
                        <div class="col">
                            <h3>Sergie Daniel Arizandieta Yol</h3>
                            <p>Desarrollador de Frontend</p>
                            <h4>&nbsp;</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h3>Kevin Steve Martinez Lemus</h3>
                            <p>Desarrollador de Frontend</p>
                        </div>
                        <div class="col">
                            <h3>Kevin Golwer Enrique Ruiz Barbales</h3>
                            <p>Desarrollador de Backend</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ventajas">
                <h1>Descubre las ventajas de AlChilazo</h1>
                <div className="LVentajas"><img src={v1} alt="V1" style={{ width: "30%" }} />
                    <ol className="ventajas-list">
                        <li className="ventajas-item">
                            <strong>Amplia variedad de opciones:</strong> Explora una amplia selección de restaurantes y opciones de comida para satisfacer todos los gustos y preferencias.
                        </li>
                        <li className="ventajas-item">
                            <strong>Pedidos en línea:</strong> Realiza pedidos de comida de forma rápida y conveniente a través de la plataforma, sin necesidad de llamar por teléfono o esperar en fila.
                        </li>
                        <li className="ventajas-item">
                            <strong>Pagos en línea:</strong> Permite a los usuarios realizar pagos de forma segura y fácil a través de métodos de pago en línea, agilizando el proceso de compra.
                        </li>
                        <li className="ventajas-item">
                            <strong>Seguimiento de pedidos:</strong> Mantén un seguimiento en tiempo real del estado de tus pedidos, desde el momento en que se realiza hasta que llega a tu puerta.
                        </li>
                        <li className="ventajas-item">
                            <strong>Entrega rápida y confiable:</strong> Garantiza una entrega rápida y confiable de los pedidos, asegurando que los usuarios reciban sus comidas frescas y en el menor tiempo posible.
                        </li>
                        {/* <li className="ventajas-item">
                            <strong>Servicios adicionales:</strong> Ofrece servicios de entrega de productos de farmacia, supermercado y otros productos, brindando conveniencia adicional a los usuarios.
                        </li> */}
                        <li className="ventajas-item">
                            <strong>Experiencia de usuario intuitiva:</strong> Diseño de interfaz amigable y fácil de usar, que permite una experiencia de usuario fluida y agradable.
                        </li>
                        <li className="ventajas-item">
                            <strong>Calidad y autenticidad:</strong> Compromiso con la calidad de los alimentos y la autenticidad de los sabores guatemaltecos, asegurando una experiencia culinaria excepcional.
                        </li>
                    </ol></div>

            </div>

            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col" style={{ textAlign: "left" }}>
                            <h5>&nbsp;</h5>
                            <h2>AlChilazo</h2>
                        </div>
                        <div className="col">
                            <h1>&nbsp;</h1>
                        </div>
                        <div className="col">
                            <h7>&nbsp;</h7>
                            <ul className="link-list">
                                <li ><a href="#somos" className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Quienes somos</a></li>
                                <li ><a href="#equipo" className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Equipo</a></li>
                            </ul>
                        </div>
                        <div className="col">
                            <h7>&nbsp;</h7>
                            <ul className="link-list">
                                <li ><a className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Agrega tu restaurante</a></li>
                                <li ><a className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Regístrate para realizar entregas</a></li>
                                <li ><a className="link-dark link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" style={{ color: "black" }}>Crea tu cuenta</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <Footer></Footer>
        </div>
    );
}

export default LandingPage;