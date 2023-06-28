import React, { useState, useEffect } from 'react';
import Cookie from "cookie-universal";
import swal from 'sweetalert';
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const DeliveryManTable = ({ refresh }) => {

    const [deliveryInfo, setDeliveryInfo] = useState([])

    const actualizar = () => {
        /* fetch(`http://localhost:4200//admin/delivery-man-change-address-request`, {
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
                console.log("REPONSE///", response)
                const users = response.adminData[0].clients
                setDeliveryInfo(users)
            }) */
    }

    useEffect(() => {
        actualizar();
    }, [refresh]);

    return (
        <table className="table" style={{ width: "100%", margin: "auto", marginTop: "2%" }}>
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Razón de cambio</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {deliveryInfo.map((user, index) => {
                    return (
                        <tr className='table-light' key={`P${index}`}>
                            <td>{user.delivery_man_id}</td>
                            <td>{user.delivery_man_name + " " + user.delivery_man_surname}</td>
                            <td>{user.delivery_man_phone}</td>
                            <td>{user.razon}</td>
                            <td>
                                <button type="button" className="btn btn-danger" >Aceptar</button>
                                <button type="button" className="btn btn-danger" >Rechazar</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default DeliveryManTable;