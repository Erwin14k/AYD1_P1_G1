import React from 'react';

const MostSelledProduct = ({ product }) => {

    if (product === null) {
        return (
            <div className="report-container">
                <div className="error-message">
                    <p>No se encontró el producto más vendido.</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="report-container">
                <center>
                    <div className="card" style={{ width: "480px" }}>
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
}

export default MostSelledProduct;