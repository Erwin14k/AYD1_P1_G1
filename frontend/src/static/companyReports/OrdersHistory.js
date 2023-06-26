import React, { useState } from 'react';

const OrdersHistory = ({orders}) => {
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const handleNameFilter = (event) => {
        setSearchName(event.target.value);
    };

    const handleDateFilter = (event) => {
        setSearchDate(event.target.value);
    };

    // Filtrar pedidos según el nombre y la fecha
    const filteredOrders = orders.filter((order) => {
        const orderName = order.user_name.toLowerCase();
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
                                    <h5 className="card-title">Orden #{order.order_id}</h5>
                                    <p className="card-text">Cliente: {order.user_name}</p>
                                    <p className="card-text">Fecha: {order.order_date}</p>
                                    <p className="card-text">Monto total: Q.{order.order_total}</p>
                                    <p className="card-text">Estado: {order.order_status}</p>
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