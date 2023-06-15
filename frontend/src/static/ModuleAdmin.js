

const ModuleAdmin = () => {
    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "8%" }}>
            <h1>Bienvenido Administrador, </h1>
            <ul class="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Solicitud de Repartidores
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Solicitud de Empresas
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Deshabilitar usuarios
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#mantenimiento" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Mantenimiento de repartidores y empresas
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    <center><h3>SOLICITUDES DE REPARTIDORES</h3></center>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                <center><h3>SOLICITUDES DE EMPRESA</h3></center>
                </div>
                <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    DESHABILITAR USUARIOS
                </div>
                <div class="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    MANTENIMIENTO
                </div>
            </div>
        </div>
    );
}

export default ModuleAdmin;