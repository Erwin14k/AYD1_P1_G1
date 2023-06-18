import React, { useState, useEffect } from 'react';
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModuleAdmin = () => {
    const deliveryMan_Req = 'admin/delivery-man-request'
    const [deliveryRequest, setDeliveryRequest] = useState([]);
    const [companyRequest, setcompanyRequest] = useState([]);
    const [deliveryInfo, setDeliveryInfo] = useState({})
    const [companyInfo, setCompanyInfo] = useState({})

    const peticion = () => {
        const body = {
            adminId: -1
        }
        // console.log(`Bearer ${crr_user.data[0].authToken}`);

        fetch(`http://localhost:4200/admin/info`, {
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
                console.log("REPONSE///",response)
                const delivery = response.adminData[1].deliveryMenWating /* JSON.stringify(response.adminData[1].deliveryMenWating) */
                const company = response.adminData[2].CompaniesWaiting
                setDeliveryRequest(delivery)
                console.log("delivery",delivery)
                setcompanyRequest(company)
            })
    }

    const handleReqDeliveryMan = (e,id) => {
        e.preventDefault();
        const body = {
            deliveryManId: id,
            deliveryManStatus: e.target.value
        }
        console.log("botton",body)
        fetch(`http://localhost:4200/admin/delivery-man-request`, {
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
            .then(response => {
                alert(response.message)
                peticion();
            })

      
    }


    const handleReqCompany = (e) => {
        e.preventDefault();
        // const body = {
        //     companyId: value,
        //     companyStatus: message
        // }
        console.log("botton")
        // fetch(`http://localhost:4200/admin/company-request`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
        //      },
        //     body: JSON.stringify(body)
        // })
        //     .then(res => res.json())
        //     .catch(err => {
        //         /* console.error('Error:', err) */
        //     })
        //     .then(response => {
        //         alert(response)
        //     })

        peticion();
    }

    useEffect(() => {
        peticion();
    }, []);

    const verInfoDelivery = (value) => {
        deliveryRequest.map((fila) => {
            if (fila.delivery_man_id === value) {
                setDeliveryInfo(fila);
            }
            return null; // Agrega esta línea si no hay un valor de retorno requerido
        });
    };

    const verInfoCompany = (value) => {
        companyRequest.map((fila) => {
            if (fila.company_id === value) {
                setCompanyInfo(fila);
            }
            return null; // Agrega esta línea si no hay un valor de retorno requerido
        });
    };


    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "8%" }}>
            <h1>Bienvenido Administrador, </h1>
            <button type="button" onClick={() => peticion()} className="btn" style={{ marginTop: "2%", backgroundColor: "#DB4F23", color: "white" }}>Actualizar</button>

            {/* FILA DE BOTONES */}
            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "2%" }}>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Solicitud de Repartidores
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Solicitud de Empresas
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Deshabilitar usuarios
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#mantenimiento" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Mantenimiento de repartidores y empresas
                    </button>
                </li>
            </ul>

            {/* CONTENEDORES */}

            {/* DELIVERY REQUEST */}
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    <center><h3>SOLICITUDES DE REPARTIDORES</h3></center>
                    <table className="table" style={{ width: "80%", margin: "auto", marginTop: "2%" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Departamento</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryRequest.map((repartidor,index) => (
                                <tr className='table-light' key={`P${index}`}>
                                    <td>{repartidor.delivery_man_id}</td>
                                    <td>{repartidor.delivery_man_name}</td>
                                    <td>{repartidor.delivery_man_surname}</td>
                                    <td>{repartidor.delivery_man_department}</td>
                                    <td>
                                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#deliveryModal" onClick={() => verInfoDelivery(repartidor.delivery_man_id)}>Ver Más</button>
                                        <button type="button" className="btn btn-success" style={{ marginLeft: "2%" }} value='Approved' onClick={(e) => handleReqDeliveryMan(e, repartidor.delivery_man_id)}>Aceptar</button>
                                        <button type="button" className="btn btn-danger" style={{ marginLeft: "2%" }} value='Declined' onClick={(e) => handleReqDeliveryMan(e, repartidor.delivery_man_id)}>Rechazar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* COMPANY REQUEST */}

                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>SOLICITUDES DE EMPRESA</h3></center>
                    <table className="table" style={{ width: "80%", margin: "auto", marginTop: "2%" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoria</th>
                                <th>Departamento</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyRequest.map((fila,index) => (
                                <tr className='table-light' key={index}>
                                    <td>{fila.company_id}</td>
                                    <td>{fila.company_name}</td>
                                    <td>{fila.company_category}</td>
                                    <td>{fila.company_department}</td>
                                    <td>
                                        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#companyModal" onClick={() => verInfoCompany(fila.company_id)}>Ver Más</button>
                                        {/* <button type="button" className="btn btn-success" style={{ marginLeft: "2%" }} onClick={() => peticionRequest(company_Req, fila.company_id, 'Approved')}>Aceptar</button>
                                        <button type="button" className="btn btn-danger" style={{ marginLeft: "2%" }} onClick={() => peticionRequest(company_Req, fila.company_id, 'Declined')}>Rechazar</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>DESHABILITAR USUARIOS</h3></center>
                </div>
                <div className="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>MANTENIMIENTO</h3></center>
                </div>
            </div>


        </div>
    );
}

export default ModuleAdmin;