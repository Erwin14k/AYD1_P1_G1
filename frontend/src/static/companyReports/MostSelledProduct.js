import '../../styles/selledProductCSS.css'

const MostSelledProduct = () => {
    const product = {
        product_type: "Platos Fuertes",
        product_name: "Ensalada",
        product_price: "50.00",
        product_description: "Ensalada Mixta",
        product_img: "https://ayd1storagedata.s3.us-east-2.amazonaws.com/a5b420e2-30f1-4e5b-81c1-f626ddbbc373.img",
        product_number_of_sales: 0,
        company_name: "La ensaladera"
    };

    return (
        <div className="report-container">
            <center>
                <div className="card">
                    <img className="card-img-top" src={product.product_img} alt="Product" />
                    <div className="card-body">
                        <h5 className="card-type">Categoría: {product.product_type}</h5>
                        <h5 className="card-title">{product.product_name}</h5>
                        <p className="card-text">{product.product_description}</p>
                        <div className="details-container">
                            <p className="price">Precio: Q.{product.product_price}</p>
                            <p className="sales">No. Ventas: {product.product_number_of_sales}</p>
                        </div>
                        <p className="company">Compañía: {product.company_name}</p>
                    </div>
                </div>
            </center>

        </div>
    );
}

export default MostSelledProduct;