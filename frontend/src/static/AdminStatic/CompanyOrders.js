import React, { useState } from 'react';

const CompanyOrders = () => {
    const [orders, setOrders] = useState([
        {
            order_id: 1,
            user_name: 'Juan',
            order_total: 100.00,
            status: 'pendiente',
            products: ['Producto 1', 'Producto 2', 'Producto 3'],
        },
        {
            order_id: 2,
            user_name: 'Mario',
            order_total: 200.00,
            status: 'pendiente',
            products: ['Producto 4', 'Producto 5'],
        },
        {
            order_id: 3,
            user_name: 'Cristian',
            order_total: 300.00,
            status: 'pendiente',
            products: ['Producto 6'],
        },
        // Agrega más órdenes aquí si es necesario
    ]);

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.order_id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <div className="container">
            <table className="table table-light table-striped">
                <thead class="table-dark">
                    <tr >
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Productos</th>
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
                                <ul>
                                    {order.products.map((product, index) => (
                                        <li key={index}>{product}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>Q. {order.order_total}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === 'pendiente' && (
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleStatusChange(order.order_id, 'listo')}
                                    >
                                        Listo
                                    </button>
                                )}
                                {order.status !== 'cancelado' && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleStatusChange(order.order_id, 'cancelado')}
                                        style={{ marginLeft: "2%" }}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyOrders;