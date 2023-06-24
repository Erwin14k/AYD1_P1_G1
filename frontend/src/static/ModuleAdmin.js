import React, { useState, useEffect } from 'react';
import DataCompany from './DataCompany';
import DataDeliveryMan from './DataDeliveryMan';
import UsersTable from './UsersTable';
import MaintenaceCompanyDelivery from './MaintenanceCompanyDelivery';
import swal from 'sweetalert';
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");



const ModuleAdmin = () => {
    const [deliveryRequest, setDeliveryRequest] = useState([]);
    const [companyRequest, setcompanyRequest] = useState([]);
    const [deliveryInfo, setDeliveryInfo] = useState({});
    const [companyInfo, setCompanyInfo] = useState({});

    const [refresh, setRefresh] = useState(false);

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
                //console.log("delivery",delivery)
                setcompanyRequest(company)
                setRefresh(!refresh);
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
            .then(async response => {
                await swal({
                    title: "Querido Usuario Administrador",
                    text: response.message,
                    icon: response.status===200 ? "success":"error",
                    button: true,
                 })
                peticion();
            })

      
    }


    const handleReqCompany = (e,id) => {
        e.preventDefault();
        const body = {
            companyId: id,
            companyStatus: e.target.value
        }
        console.log("botton",body)
        fetch(`http://localhost:4200/admin/company-request`, {
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
                    icon: response.status===200 ? "success":"error",
                    button: true,
                 })
                peticion();
            })
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
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#mantenimientoR" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Mantenimiento de repartidores
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#mantenimientoP" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Mantenimiento de empresas
                    </button>
                </li>
            </ul>

            {/* CONTENEDORES */}

           
            <div className="tab-content" id="myTabContent">
                {/* DELIVERY REQUEST */}
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    <center><h3>SOLICITUDES DE REPARTIDORES</h3></center>
                    <table className="table" style={{ width: "100%", margin: "auto", marginTop: "2%" }}>
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
                    <table className="table" style={{ width: "100%", margin: "auto", marginTop: "2%" }}>
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
                            {companyRequest.map((company,index) => (
                                <tr className='table-light' key={index}>
                                    <td>{company.company_id}</td>
                                    <td>{company.company_name}</td>
                                    <td>{company.company_category}</td>
                                    <td>{company.company_department}</td>
                                    <td>
                                        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#companyModal" onClick={() => verInfoCompany(company.company_id)}>Ver Más</button>
                                        <button type="button" className="btn btn-success" style={{ marginLeft: "2%" }} value='Approved' onClick={(e) => handleReqCompany(e, company.company_id)}>Aceptar</button>
                                        <button type="button" className="btn btn-danger" style={{ marginLeft: "2%" }} value='Declined' onClick={(e) => handleReqCompany(e, company.company_id)}>Rechazar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DISABLE USERS */}
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>DESHABILITAR USUARIOS</h3></center>
                    <UsersTable refresh={refresh} />
                </div>

                {/* MAINTENANCE */}
                <div className="tab-pane fade" id="mantenimientoR" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>MANTENIMIENTO DE REPARTIDORES</h3></center>
                    <MaintenaceCompanyDelivery refresh={refresh} url="get-all-delivery-man" noUrl={2}/>
                </div>

                {/* MAINTENANCE */}
                <div className="tab-pane fade" id="mantenimientoP" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>MANTENIMIENTO DE EMPRESAS</h3></center>
                    <MaintenaceCompanyDelivery refresh={refresh} url="get-all-companies" noUrl={3}/>
                </div>
            </div>
            
            {/* MODAL EMPRESA */}
             <div className="modal fade" id="companyModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-10" id="staticBackdropLabel">Más Información - Empresa</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <DataCompany companyInfo={companyInfo}  />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" value='Approved' onClick={(e) => handleReqCompany(e, companyInfo.company_id)}>Aceptar</button>
                            <button type="button" className="btn btn-danger" style={{ marginLeft: "1%" }} value='Declined' data-bs-dismiss="modal" onClick={(e) => handleReqCompany(e, companyInfo.company_id)}>Rechazar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ marginLeft: "1%" }} >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* MODAL DELIVERY */}
            <div className="modal fade" id="deliveryModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-10" id="staticBackdropLabel">Más Información - Repartidor</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <DataDeliveryMan 
                        delivery_man_name = {deliveryInfo.delivery_man_name}
                        delivery_man_surname = {deliveryInfo.delivery_man_surname}
                        delivery_man_department= {deliveryInfo.delivery_man_department}
                        delivery_man_municipality= {deliveryInfo.delivery_man_municipality}
                        delivery_man_transport= {deliveryInfo.delivery_man_transport}
                        delivery_man_email= {deliveryInfo.delivery_man_email}
                        delivery_man_phone= {deliveryInfo.delivery_man_phone}
                        delivery_man_license_type= {deliveryInfo.delivery_man_license_type}
                        delivery_man_resume= {deliveryInfo.delivery_man_resume}
                        />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" style={{ marginLeft: "2%" }} value='Approved' onClick={(e) => handleReqDeliveryMan(e, deliveryInfo.delivery_man_id)}>Aceptar</button>
                            <button type="button" className="btn btn-danger" style={{ marginLeft: "2%" }} value='Declined' onClick={(e) => handleReqDeliveryMan(e, deliveryInfo.delivery_man_id)}>Rechazar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ marginLeft: "1%" }}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    );
}

export default ModuleAdmin;