import React, { useState, useEffect } from 'react';

const ReportesAdmin = () => {

    const [usersInfo, setUsersInfo] = useState({})

    const actualizar = () =>{
        fetch(`http://localhost:4200/admin/users-counters`)
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                const users = response.data/* JSON.stringify(response.adminData[1].deliveryMenWating) */
                setUsersInfo(users)
            })
    }

    useEffect(() => {
        actualizar();
    }, []);

    return (
        <div>
            <h1>Reportes</h1>
            <button type="button" onClick={() => actualizar()} class="btn" style={{ marginTop: "2%", backgroundColor: "#DB4F23", color: "white" }}>Actualizar</button>
            <ul class="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "2%" }}>
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Informe de ventas
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Informe de usuarios
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#repartidores" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Informe de repartidores
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    INFORME DE VENTAS
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>INFORME DE USUARIOS</h3></center>
                    <div className="row" style={{ marginTop: "2%" }}>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Usuarios Activos
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.activeUserCount}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Usuarios Bloqueados
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.blockedUserCount}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Repartidores Activos
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.activeDeliveryManCount}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Repartidores Esperando
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.waitingDeliveryManCount}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Repartidores Rechazados
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.declinedDeliveryManCount}</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Empresas Activas
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.activeCompaniesCount}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Empresas Esperando
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.waitingCompaniesCount}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    Empresas Rechazadas
                                </div>
                                <div className="card-body">
                                    <p>Cantidad: <strong>{usersInfo.declinedCompaniesCount}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="repartidores" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    INFORME DE REPARTIDORES
                </div>
            </div>
        </div >
    );
}

export default ReportesAdmin;