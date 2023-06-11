import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


function Politicas() {
    return (
        <div style={{ width: "80%", margin: "auto", textAlign: "justify" }}>
            <NavBar />
            <h1 style={{ marginTop: "6%" }}>Politicas de seguridad</h1>
            <br></br>

            <h2>Protección de datos personales</h2>
            <p>
                Recopilamos y utilizamos tu información personal de acuerdo con nuestra Política de Privacidad. Mantenemos tus datos personales seguros y los utilizamos solo para los fines especificados, como procesar tus pedidos y brindarte un servicio personalizado.
            </p>

            <h2>Seguridad de los pagos en línea</h2>
            <p>
                Utilizamos tecnologías de encriptación y métodos de pago seguros para proteger tus transacciones en línea. Trabajamos con proveedores de servicios confiables y certificados que cumplen con los estándares de seguridad más altos.
            </p>

            <h2>Acceso seguro a tu cuenta</h2>
            <p>
                Implementamos medidas de seguridad para proteger tu cuenta y prevenir el acceso no autorizado. Te recomendamos utilizar una contraseña segura y mantenerla confidencial. Si sospechas que tu cuenta ha sido comprometida, contáctanos de inmediato.
            </p>

            <h2>Protección contra fraudes</h2>
            <p>
                Estamos comprometidos en protegerte contra actividades fraudulentas. Monitoreamos de cerca todas las transacciones y utilizamos sistemas de detección de fraudes avanzados para identificar y prevenir actividades sospechosas.
            </p>

            <h2>Política de privacidad</h2>
            <p>
                Nuestra Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tus datos personales. Te invitamos a leerla para obtener más información sobre cómo manejamos tus datos y respetamos tu privacidad.
            </p>

            <h2>Actualización de políticas de seguridad</h2>
            <p>
                Nos esforzamos por mantener nuestras políticas de seguridad actualizadas de acuerdo con los avances tecnológicos y las mejores prácticas de la industria. Nos reservamos el derecho de realizar cambios y actualizaciones en nuestras políticas de seguridad sin previo aviso.
            </p>

            <p>
                Nos comprometemos a mantener tus datos seguros y a brindarte un entorno confiable para tus transacciones en línea. Si tienes alguna pregunta o inquietud sobre nuestras políticas de seguridad, no dudes en contactarnos.
            </p>
            <Footer />
        </div>
    );
}

export default Politicas;