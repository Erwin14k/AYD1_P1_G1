import React from 'react';

const ProductReport = ({productos}) => {
    return (
        <div className="container" style={{ marginTop: "3%" }}>
            <h4  style={{ marginTop: "2%" }}>Productos Más Vendidos a Nivel Global</h4>
            <div style={{ width:"80%", margin: "auto", marginTop: "2%" }}>
                <table className="table table-hover table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Top</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Empresa</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{producto.product_name}</td>
                                <td>Q. {producto.product_price}</td>
                                <td>{producto.product_number_of_sales}</td>
                                <td>{producto.company_name}</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <img
                                        src={producto.product_img}
                                        alt={producto.product_name}
                                        style={{ width: '150px' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductReport;