import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


function Terminos() {
    return (
        <div style={{width:"80%", margin:"auto", textAlign:"justify"}}>
            <NavBar />
            <h1 style={{ marginTop: "6%" }}>Terminos y Condiciones</h1>
            <br></br>
            <p className="intro-text">
                Bienvenido a la plataforma AlChilazo. Al utilizar nuestros servicios, estás aceptando los siguientes términos y condiciones. Te recomendamos leer detenidamente esta información antes de realizar cualquier pedido.
            </p>
            <h2>Uso de la plataforma</h2>
            <p>
                AlChilazo proporciona una plataforma en línea para realizar pedidos de comida y otros productos. Está prohibido utilizar nuestra plataforma con fines ilegales o no autorizados. El uso de nuestra plataforma implica tu compromiso de cumplir con todas las leyes y regulaciones aplicables.
            </p>
            <h2>Pedidos y pagos</h2>
            <p>
                Al realizar un pedido a través de AlChilazo, aceptas proporcionar información precisa y actualizada. Los precios y las opciones de pago se indican claramente en la plataforma. Nos reservamos el derecho de rechazar o cancelar pedidos en caso de irregularidades o incumplimiento de las políticas de pago.
            </p>
            <h2>Entrega</h2>
            <p>
                Nos esforzamos por brindar una entrega rápida y confiable. Sin embargo, ten en cuenta que pueden surgir circunstancias imprevistas que puedan afectar los tiempos de entrega. Nos comprometemos a informarte sobre cualquier retraso y a resolver cualquier problema que pueda surgir.
            </p>
            <h2>Responsabilidad del usuario</h2>
            <p>
                Eres responsable de mantener la confidencialidad de tu cuenta y de cualquier actividad que ocurra bajo tu nombre de usuario. No debes compartir tu información de inicio de sesión ni permitir que terceros utilicen tu cuenta.
            </p>
            <h2>Propiedad intelectual</h2>
            <p>
                Todos los derechos de propiedad intelectual relacionados con la plataforma y su contenido (textos, imágenes, logotipos, etc.) son propiedad de AlChilazo o de terceros con licencia. Está prohibido utilizar, reproducir o distribuir cualquier contenido sin autorización previa.
            </p>
            <h2>Limitación de responsabilidad</h2>
            <p>
                AlChilazo no se hace responsable de los daños directos, indirectos, incidentales o consecuentes derivados del uso de la plataforma o de los productos entregados. No nos hacemos responsables de la calidad de los alimentos proporcionados por los restaurantes asociados.
            </p>
            <h2>Modificaciones</h2>
            <p>
                Nos reservamos el derecho de realizar modificaciones en estos términos y condiciones en cualquier momento. Te notificaremos sobre cualquier cambio relevante y te recomendamos revisar regularmente esta sección.
            </p>
            <p className="contact-info">
                Si tienes alguna pregunta o inquietud sobre nuestros términos y condiciones, no dudes en contactarnos. Agradecemos tu confianza en AlChilazo y esperamos brindarte una experiencia satisfactoria.
            </p>
            <p className="effective-date">
                Fecha de entrada en vigencia: 10/06/2023
            </p>
            <Footer />
        </div >
    );
}

export default Terminos;