import React, { useState, useEffect, useCallback } from 'react';
import swal from 'sweetalert';
import Cookie from "cookie-universal";
import ModalOrden from '../../components/ModalOrden';
const cookies = Cookie();
const crr_user = cookies.get("crr_user");



const CompanyOrders = ({refresh}) => {
    const [orders, setOrders] = useState([]);

    const llenarOrdenes = useCallback(() => {
        console.log("Llenar Ordenes")
        fetch(`http://localhost:4200/company/get-all-waiting-orders`, {
            method: "GET",
            headers: {
                /* "Content-Type": "application/json", */
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data)
                console.log(data.companyData)
                setOrders(Object.values(data.companyData))
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });

    }, []);

    const handleStatusChange = (id, url) => {
        const body = {
            orderId: id
        }
        fetch(`http://localhost:4200/company/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: JSON.stringify(body)
        })
            .then((response) => response.json())
            .then(async (data) => {
                await swal({
                    title: `Querido Usuario: ${crr_user.data[0].companyName}`,
                    text: data.message,
                    icon: data.status === 200 ? "success" : "error",
                    button: true,
                })
                llenarOrdenes();
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });
    };

    useEffect(() => {
        llenarOrdenes();
    }, [refresh, llenarOrdenes]);

    return (
        <div className="container">
            <table className="table table-light table-striped">
                <thead class="table-dark">
                    <tr >
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Detalle</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.user_name}</td>
                            <td>
                            <ModalOrden items={order.items}   total={order.order_total} tipo={1} comision={order.order_commission}/>
                                {/* <ul>
                                    {order.items.map((product, index) => (
                                        <li key={index}>{product.product_ammount} {" -> "} {product.product_name === null ? product.combo_name : product.product_name}</li>
                                    ))}
                                </ul> */}
                            </td>
                            <td>Q. {order.order_total}</td>
                            <td>{order.order_status}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleStatusChange(order.order_id, 'approve-order')}
                                >
                                    Listo
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleStatusChange(order.order_id, 'cancel-order')}
                                    style={{ marginLeft: "2%" }}
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyOrders;