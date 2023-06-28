import React, { useState, useEffect } from 'react';
import Cookie from "cookie-universal";
import swal from 'sweetalert';
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const DeliveryManTable = ({ refresh }) => {

    const [deliveryInfo, setDeliveryInfo] = useState([])

    const actualizar = () => {
        fetch(`http://localhost:4200/admin/get-all-waiting-change-address-request`, {
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
                const users = response.adminData[0].changeAddressRequests
                setDeliveryInfo(users)
            })
    }

    const handleReqChangeZone = (e, id, ndep, nmun, idSolicitud) => {
        e.preventDefault();
        const body = {
            deliveryManId: id,
            status: e.target.value,
            newDepartment : ndep,
            newMunicipality : nmun,
            changeAddressId: idSolicitud
        }
        console.log("botton", body)
        fetch(`http://localhost:4200/admin/delivery-man-change-address-request`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .catch(err => {
                /* console.error('Error:', err) */
            })
            .then(async response => {
                await swal({
                    title: "Querido Usuario Administrador",
                    text: response.message,
                    icon: response.status === 200 ? "success" : "error",
                    button: true,
                })
                actualizar();
            })
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
                    <th>Nuevo Dep.</th>
                    <th>Nuevo Mun.</th>
                    <th>Razón de cambio</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {deliveryInfo.map((user, index) => {
                    return (
                        <tr className='table-light' key={`P${index}`}>
                            <td>{user.delivery_man_id}</td>
                            <td>{user.delivery_man_name}</td>
                            <td>{user.new_department}</td>
                            <td>{user.new_municipality}</td>
                            <td>{user.change_description}</td>
                            <td>
                                <button type="button" className="btn btn-success" value='Approved' onClick={(e) => handleReqChangeZone(e, user.delivery_man_id, user.new_department, user.new_municipality, user.delivery_man_change_address_id)} >Aceptar</button>
                                <button type="button" className="btn btn-danger" value='Declined' onClick={(e) => handleReqChangeZone(e, user.delivery_man_id, "" , "", user.delivery_man_change_address_id)} style={{ marginLeft: "2%" }}>Rechazar</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default DeliveryManTable;