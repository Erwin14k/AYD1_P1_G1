import React, { useState, useEffect, useCallback } from 'react';
import swal from 'sweetalert';
import Cookie from "cookie-universal";

import Historial from '../DeliveryStatic/Historial';

const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModuleDelivery = () => {

    const [historial, setHistorial] = useState([]);
    const [comision, setComision] = useState(0);
    const [solicitudes, setSolicitudes] = useState([]);
    const [pedidoAsignado, setPedidoAsignado] = useState({})

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
                setComision(data.deliveryManData.totalComissions)
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
                setSolicitudes(data.deliveryManData[0].orders)
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
                setHistorial(data.deliveryManData[0].orders)
                const actual = data.deliveryManData[0].orders.find(pedido => pedido.order_status === 'En camino');
                console.log(actual);
                setPedidoAsignado(actual)
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });
    }, []);

    const handleEntregado = () => {
        const body = {
            orderId: pedidoAsignado.order_id
        }

        fetch(`http://localhost:4200/delivery-man/deliver-order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(async response => {
                await swal({
                    title: "Querido Usuario Repartidor",
                    text: response.message,
                    icon: response.status === 200 ? "success" : "error",
                    button: true,
                })
            })
    };

    const handleCancelar = () => {
        const body = {
            orderId: pedidoAsignado.order_id
        }

        fetch(`http://localhost:4200/delivery-man/cancel-order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(async response => {
                await swal({
                    title: "Querido Usuario Repartidor",
                    text: response.message,
                    icon: response.status === 200 ? "success" : "error",
                    button: true,
                })
            })
    };

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
                    {pedidoAsignado !== undefined ? <div className="pedido-container">
                        <div className="pedido-header">
                            <h3>Pedido #{pedidoAsignado.order_id}</h3>
                        </div>
                        <div className="pedido-body">
                            <p>
                                <strong>Empresa:</strong> {pedidoAsignado.company_name}
                            </p>
                            <p>
                                <strong>Cliente:</strong> {pedidoAsignado.user_name}
                            </p>
                            <p>
                                <strong>Estatus:</strong> {pedidoAsignado.order_status}
                            </p>
                            <p>
                                <strong>Total:</strong> Q.{pedidoAsignado.order_total}
                            </p>
                        </div>
                        <div className="pedido-footer">
                            <button className="btn btn-success" onClick={handleEntregado}>
                                Marcar como entregado
                            </button>
                            <button className="btn btn-danger" style={{ marginLeft: "2%" }} onClick={handleCancelar}>
                                Cancelar pedido
                            </button>
                        </div>
                    </div> : <div className="col">
                        <div className="no-orders-message">No tiene pedido asignado.</div>
                    </div>}


                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <center><h3 style={{ marginTop: "2%" }}>SOLICITUDES DE ENTREGA</h3></center>
                </div>
                <div className="tab-pane fade" id="historial" role="tabpanel" aria-labelledby="profile-tab">
                    <center><h3 style={{ marginTop: "2%" }}>HISTORIAL DE ENTREGA</h3></center>
                    <Historial historial={historial} />
                </div>
                <div className="tab-pane fade" id="comisiones" role="tabpanel" aria-labelledby="profile-tab">

                    <div className="card bg-dark text-white" style={{ width: "40%", margin: "auto", marginTop: "5%" }}>
                        <div className="card-header">
                            <h4 className="mb-0">Total de Comisiones Generadas</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center" style={{ color: "Black" }}>Monto Total:</h5>
                            <p className="card-text text-center">Q. {comision}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ModuleDelivery;