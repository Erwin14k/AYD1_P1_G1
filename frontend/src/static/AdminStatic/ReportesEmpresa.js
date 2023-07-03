import React, { useState, useEffect, useCallback } from 'react';
import MostSelledProduct from "./companyReports/MostSelledProduct";
import OrdersHistory from './companyReports/OrdersHistory';

import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ReportesEmpresa = () => {

    const [product, setProduct] = useState({});
    const [orders, setOrders] = useState([]);

    const getMostSelledProduct = useCallback(() => {
        fetch(`http://${process.env.REACT_APP_PUERTO}:4200/company/get-most-selled-products`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                if (response.companyData[0].products.length > 0) {
                    setProduct(response.companyData[0].products[0])
                } else {
                    setProduct(null)
                }
            })
    }, []);

    const getAllOrders = useCallback(() => {
        fetch(`http://${process.env.REACT_APP_PUERTO}:4200/company/get-all-orders`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                setOrders(response.companyData);
            })
    }, []);

    useEffect(() => {
        getMostSelledProduct();
        getAllOrders();
    }, [getMostSelledProduct, getAllOrders]);

    return (
        <div>
            <h1>Reportes</h1>

            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Informe de producto
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Historial de pedidos
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    <center><h3>PRODUCTO MÁS VENDIDO</h3></center>
                    <MostSelledProduct product={product} />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>HISTORIAL DE PEDIDOS</h3></center>
                    <OrdersHistory orders={orders}/>
                </div>
            </div>
        </div>
    );
}

export default ReportesEmpresa;