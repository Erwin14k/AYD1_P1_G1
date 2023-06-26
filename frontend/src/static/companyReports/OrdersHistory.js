import React, { useState } from 'react';

const OrdersHistory = () => {
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const orders = [
        {
            id: 1,
            order_number: "2023-123",
            customer_name: "John Doe",
            order_date: "2023-06-20",
            total_amount: 50.99,
            status: "Delivered"
        },
        {
            id: 2,
            order_number: "2023-456",
            customer_name: "Jane Smith",
            order_date: "2023-06-22",
            total_amount: 75.5,
            status: "Pending"
        },
        // Agregar más pedidos aquí
    ];

    const handleNameFilter = (event) => {
        setSearchName(event.target.value);
    };

    const handleDateFilter = (event) => {
        setSearchDate(event.target.value);
    };

    // Filtrar pedidos según el nombre y la fecha
    const filteredOrders = orders.filter((order) => {
        const orderName = order.customer_name.toLowerCase();
        const orderDate = order.order_date;

        return (
            orderName.includes(searchName.toLowerCase()) &&
            orderDate.includes(searchDate)
        );
    });

    return (
        <div className="container" style={{ marginTop: "2%" }}>
            <form className="row">
                <div className="col">
                    <label htmlFor="nameInput" style={{ color: "#A89D8F", fontWeight: "bold" }}>Buscar por nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        placeholder="Nombre del cliente"
                        value={searchName}
                        onChange={handleNameFilter}
                        style={{ borderColor: "#A89D8F" }}
                    />
                </div>
                <div className="col">
                    <label htmlFor="dateInput" style={{ color: "#A89D8F", fontWeight: "bold" }}>Buscar por fecha:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateInput"
                        value={searchDate}
                        onChange={handleDateFilter}
                        style={{ borderColor: "#A89D8F" }}
                    />
                </div>
            </form>
            <div className="row" style={{ marginTop: "3%" }}>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className="col-md-4">
                            <div className="card" style={{ marginBottom: "20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Orden #{order.order_number}</h5>
                                    <p className="card-text">Cliente: {order.customer_name}</p>
                                    <p className="card-text">Fecha: {order.order_date}</p>
                                    <p className="card-text">Monto total: ${order.total_amount}</p>
                                    <p className="card-text">Estado: {order.status}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <div className="no-orders-message">No se encontraron pedidos.</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdersHistory;