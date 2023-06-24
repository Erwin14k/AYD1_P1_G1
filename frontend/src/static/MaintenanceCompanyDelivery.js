import React, { useState, useEffect } from 'react';
import Cookie from "cookie-universal";
import swal from 'sweetalert';
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const MaintenaceCompanyDelivery = ({ refresh, url, noUrl }) => {
    const [usersInfo, setUsersInfo] = useState([])

    const llenarTabla = () => {
        const body = {
            adminId: -1
        }
        fetch(`http://localhost:4200/admin/${url}`, {
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
                const users = noUrl === 2 ? response.adminData[0].deliveryMen : response.adminData[0].companies
                setUsersInfo(users)
            })
    }

    const deshabilitar = async (e, id, furl) => {
        e.preventDefault();
        const body = noUrl === 2 ? { deliveryManId: id } : { companyId: id }

        const willDelete = await swal({
            title: "¿Estás seguro?",
            text: "¿Estás seguro de que deseas deshabilitar el usuario?",
            icon: "warning",
            content: {
                element: 'input',
                attributes: {
                    id: 'swal-input',
                    placeholder: 'Ingrese la razón ...',
                    type: 'text'
                }
            },
            dangerMode: true,
        })

        if (willDelete) {

            fetch(`http://localhost:4200/admin/disable-${furl}`, {
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
                });
        }else if (willDelete === ""){
            swal({
                title: "Querido Usuario Administrador",
                text: "Para deshabilitar un usuario, debe de ingresar una razón.",
                icon: "error",
                button: true,
            })
        }
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
                    <th>{noUrl === 2 ? "Apellido" : "Categoría"}</th>
                    <th>Departamento</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {usersInfo.map((user, index) => {
                    return (
                        <tr className='table-light' key={`P${index}`}>
                            <td>{noUrl === 2 ? user.delivery_man_id : user.company_id}</td>
                            <td>{noUrl === 2 ? user.delivery_man_name : user.company_name}</td>
                            <td>{noUrl === 2 ? user.delivery_man_surname : user.company_category}</td>
                            <td>{noUrl === 2 ? user.delivery_man_municipality : user.company_department}</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={(e) => deshabilitar(e, noUrl === 2 ? user.delivery_man_id : user.company_id, noUrl === 2 ? "delivery-man" : "company")}>Deshabilitar</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    );
}

export default MaintenaceCompanyDelivery;