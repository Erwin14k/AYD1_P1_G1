import MostSelledProduct from "./companyReports/MostSelledProduct";

const ReportesEmpresa = () => {
    return (
        <div>
            <h1>Reportes</h1>

            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Informe de producto
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Hitorial de pedidos
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>          
                    <center><h3>PRODUCTO MÁS VENDIDO</h3></center>
                    <MostSelledProduct />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>HISTORIAL DE PEDIDOS</h3></center>
                </div>
            </div>
        </div>
    );
}

export default ReportesEmpresa;