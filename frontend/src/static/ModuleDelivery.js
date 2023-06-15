

const ModuleDelivery = () => {
    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "10%" }}>
            <h1>Bienvenido Repartidor, </h1>
            <ul class="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Listado de solicitud de entrega
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Pedidos Asignados</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">SOLICITUDES DE ENTREGA</div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">PEDIDOS ASIGNADOS</div>
            </div>
        </div>
    );
}

export default ModuleDelivery;