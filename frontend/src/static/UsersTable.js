import React, { useState, useEffect } from 'react';
import Cookie from "cookie-universal";
import swal from 'sweetalert';
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const UsersTable = ({ refresh }) => {
    const [usersInfo, setUsersInfo] = useState([])

    const llenarTabla = () => {
        const body = {
            adminId: -1
        }
        fetch(`http://localhost:4200/admin/get-all-clients`, {
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
            .then(response => {
                console.log("REPONSE///", response)
                const users = response.adminData[0].clients
                console.log(users)
                setUsersInfo(users)
            })
    }

    const deshabilitar = (e, id) => {
        e.preventDefault();
        const body = {
            userId: id
        }
        fetch(`http://localhost:4200/admin/disable-client`, {
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
                    title: "Querido Usuario Administrador",
                    text: response.message,
                    icon: response.status === 200 ? "success" : "error",
                    button: true,
                })
                llenarTabla();
            })
    }

    useEffect(() => {
        llenarTabla();
    }, [refresh]);

    return (
        <table className="table" style={{ width: "100%", margin: "auto", marginTop: "2%" }}>
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {usersInfo.map((user, index) => {
                    return (
                        <tr className='table-light' key={`P${index}`}>
                            <td>{user.user_id}</td>
                            <td>{user.user_name}</td>
                            <td>{user.user_surname}</td>
                            <td>{user.user_email}</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={(e) => deshabilitar(e, user.user_id)}>Deshabilitar</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default UsersTable;