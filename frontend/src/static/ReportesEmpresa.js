const ReportesEmpresa = () => {
    return (
        <div>
            <h1>Reportes</h1>

            <ul class="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Informe de producto más vendido
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Hitorial de pedidos
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>          
                    <center><h3>INFORME DE PRODUCTO</h3></center>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>HISTORIAL DE PEDIDOS</h3></center>
                </div>
            </div>
        </div>
    );
}

export default ReportesEmpresa;