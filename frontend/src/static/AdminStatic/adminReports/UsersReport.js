import React from 'react';

const UsersReport = ({ usersInfo }) => {
    return (
        <div className="row" style={{ marginTop: "2%" }}>
            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">Clientes Activos</div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>{usersInfo.activeUserCount}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">Clientes Deshabilitados</div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>{usersInfo.blockedUserCount}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">Repartidores Activos</div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>
                                {usersInfo.activeDeliveryManCount}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">
                        Repartidores Esperando
                    </div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>
                                {usersInfo.waitingDeliveryManCount}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">
                        Repartidores Rechazados
                    </div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>
                                {usersInfo.declinedDeliveryManCount}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">
                        Repartidores Deshabilitados
                    </div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>
                                {usersInfo.blockedDeliveryManCount}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">Empresas Activas</div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>{usersInfo.activeCompaniesCount}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">Empresas Esperando</div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>{usersInfo.waitingCompaniesCount}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">Empresas Rechazadas</div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>
                                {usersInfo.declinedCompaniesCount}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-header">
                        Empresas Deshabilitadas
                    </div>
                    <div className="card-body">
                        <p>
                            Cantidad:{" "}
                            <strong>
                                {usersInfo.blockedCompaniesCount}
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersReport;