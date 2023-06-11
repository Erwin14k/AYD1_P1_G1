import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


function Preguntas() {
    return (
        <div style={{ width: "80%", margin: "auto", textAlign: "justify" }}>
            <NavBar />
            <h1 style={{ marginTop: "6%" }}>Preguntas frecuentes</h1>
            <br></br>
            <h2>¿Cómo funciona AlChilazo?</h2>
            <p>
                AlChilazo es una plataforma en línea que te permite realizar pedidos de comida rápida y otros productos. Simplemente selecciona los productos deseados, elige el restaurante o tienda, realiza el pago y espera la entrega en la comodidad de tu hogar.
            </p>

            <h2>¿Cuáles son los métodos de pago aceptados?</h2>
            <p>
                Aceptamos pagos en línea a través de tarjetas de crédito, tarjetas de débito y otros métodos de pago electrónicos seguros. Puedes consultar las opciones disponibles durante el proceso de pago.
            </p>

            <h2>¿Cuál es el tiempo de entrega promedio?</h2>
            <p>
                El tiempo de entrega promedio varía según la ubicación y el restaurante o tienda seleccionados. Hacemos todo lo posible para entregar tus pedidos lo más rápido posible y te proporcionaremos una estimación del tiempo de entrega durante el proceso de pedido.
            </p>

            <h2>¿Qué medidas de seguridad se toman para garantizar la calidad y frescura de los productos?</h2>
            <p>
                En AlChilazo trabajamos en estrecha colaboración con nuestros restaurantes y tiendas asociadas para asegurar que se cumplan los más altos estándares de calidad y frescura. Realizamos un riguroso proceso de selección y evaluación de nuestros socios comerciales para ofrecerte productos de la mejor calidad.
            </p>

            <h2>¿Qué hago si tengo algún problema con mi pedido o necesito realizar una consulta?</h2>
            <p>
                Si tienes algún problema con tu pedido o tienes alguna consulta, puedes contactarnos a través de nuestro servicio de atención al cliente. Estamos disponibles para ayudarte y resolver cualquier problema que puedas tener. Puedes comunicarte con nosotros por teléfono, correo electrónico o a través del formulario de contacto en nuestra página web.
            </p>
            <Footer />
        </div>
    );
}

export default Preguntas;