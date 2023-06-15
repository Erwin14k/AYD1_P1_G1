
const ModuleCompany = () => {
    const handleFileSelect = (event) => {
        const files = event.target.files;
        if (files.length > 3) {
            alert("Solo se permiten un máximo de 3 archivos.");
            event.target.value = null; // Limpiar los archivos seleccionados si se excede el límite
        }
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
     };
    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "8%" }}>
            <h1>Bienvenido Empresa,</h1>

            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "5%" }}>
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        Catálogo de productos
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Panel de control
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Pedidos
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#mantenimiento" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        Combos
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    <center><h3>CATÁLOGO DE PRODUCTOS</h3></center>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>AGREGA UN NUEVO PRODUCTO</h3></center>
                    <form onSubmit={handelSubmit} style={{ width: "80%", margin: "auto", marginTop: "3%" }}>
                        <div className="form-outline mb-4">
                            <input
                                type="file"
                                id="form3Example3"
                                className="form-control"
                                accept=".jpg, .jpeg, .png"
                                multiple
                                onChange={handleFileSelect}
                            />
                            <label className="form-label" htmlFor="form3Example3">
                                Seleccionar imágenes
                            </label>

                            <div className="form-outline mb-4">
                                <textarea id="form3Example3" className="form-control" />
                                <label className="form-label" htmlFor="form3Example3">
                                    Descripción de producto
                                </label>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            id="formPrice"
                                        />
                                        <label className="form-label" htmlFor="formPrice">
                                            Precio
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <input
                                            type="comboBox"
                                            id="form3Example2"
                                            className="form-control"
                                        />
                                        <label className="form-label" htmlFor="form3Example2">
                                            Categoria
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <center><button type="submit" className="btn btn-primary">Agregar Producto</button></center>
                    </form>
                </div>
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>PEDIDOS</h3></center>
                </div>
                <div className="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>COMBOS</h3></center>
                </div>
            </div>
        </div>
    );
}

export default ModuleCompany;