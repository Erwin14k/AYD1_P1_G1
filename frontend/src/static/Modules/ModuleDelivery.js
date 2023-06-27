

const ModuleDelivery = () => {
    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "10%" }}>
            <h1>Bienvenido Repartidor, </h1>
            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Listado de solicitud de entrega
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Pedidos Asignados</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">SOLICITUDES DE ENTREGA</div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">PEDIDOS ASIGNADOS</div>
            </div>
        </div>
    );
}

export default ModuleDelivery;