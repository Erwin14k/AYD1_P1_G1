import React, { useState, useEffect, useCallback } from 'react';
import swal from 'sweetalert';
import Cookie from "cookie-universal";

import Historial from '../DeliveryStatic/Historial';

const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModuleDelivery = () => {

    const [historial, setHistorial] = useState([]);

    const getComisiones = useCallback(() => {
        fetch(`http://localhost:4200/delivery-man/get-comission`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });
    }, []);

    const getOrdenesDisponible = useCallback(() => {
        fetch(`http://localhost:4200/delivery-man/get-avaliable-orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });
    }, []);

    const getHistorial = useCallback(() => {
        fetch(`http://localhost:4200/delivery-man/get-all-orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setHistorial(data.deliveryManData[0].orders)
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });
    }, []);

    useEffect(() => {
        getHistorial();
        getComisiones();
        getOrdenesDisponible();
    }, [getHistorial, getComisiones, getOrdenesDisponible]);

    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "10%" }}>
            <h1>Bienvenido Repartidor, </h1>
            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Pedido Asignado
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Solicitudes de entrega
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="historial-tab" data-bs-toggle="tab" data-bs-target="#historial" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Historial
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="comisiones-tab" data-bs-toggle="tab" data-bs-target="#comisiones" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Comisiones
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <center><h3 style={{ marginTop: "2%" }}>PEDIDO ASIGNADO</h3></center>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <center><h3 style={{ marginTop: "2%" }}>SOLICITUDES DE ENTREGA</h3></center>
                </div>
                <div className="tab-pane fade" id="historial" role="tabpanel" aria-labelledby="profile-tab">
                    <center><h3 style={{ marginTop: "2%" }}>HISTORIAL DE ENTREGA</h3></center>
                    <Historial historial={historial}/>
                </div>
                <div className="tab-pane fade" id="comisiones" role="tabpanel" aria-labelledby="profile-tab">
                    <center><h3 style={{ marginTop: "2%" }}>COMISIONES GENERADAS</h3></center>
                </div>
            </div>
        </div>
    );
}

export default ModuleDelivery;