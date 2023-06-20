<div>
<form onSubmit={handelSubmit} style={{ width: "80%", margin: "auto", marginTop: "3%" }}>
    <div className="form-outline mb-4">
        <div className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control" defaultValue={props.type === 0 ? props.info.product_name : props.info.combo_name} />
            <label className="form-label" htmlFor="form3Example3">
                Nombre
            </label>
        </div>
        <input
            type="file"
            id="form3Example3"
            className="form-control"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleFileSelect}
        />
        <label className="form-label" htmlFor="form3Example3">
            {props.edit === 1 ? "Si no desea cambiar la imagen, no suba ningun archivo a este apartado." : "Seleccionar imagen"}
        </label>

        <div className="form-outline mb-4">
            <textarea id="form3Example3" className="form-control"
                defaultValue={props.type === 0 ? props.info.product_description : props.info.combo_description} />
            <label className="form-label" htmlFor="form3Example3">
                Descripción
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
                        onChange={handleStockPrice}
                        value={props.type === 0 && props.edit === 1 ? props.info.product_price : props.type === 1 && props.edit === 1 ? props.info.combo_price : price}
                    />
                    <label className="form-label" htmlFor="formPrice">
                        Precio
                    </label>
                </div>
            </div>
            {props.type === 0 ? <div className="col-md-6 mb-4">
                <div className="form-outline">
                    <select
                        className="form-control"
                        id="form3Example4"
                    >
                        {["Entradas", "Platos Fuertes", "Postres", "Bebidas", "Medicamento", "Producto Básico"].map((option, index) => (
                            <option key={index} value={option} selected={props.info.product_type === option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label className="form-label" htmlFor="form3Example4">
                        Categoria
                    </label>
                </div>
            </div> : <></>}

            <div className="col-md-6 mb-4">
                <div className="form-outline">
                    <input
                        type="number"
                        step="1"
                        className="form-control"
                        id="formStock"
                        onChange={handleStockChange}
                        value={props.type === 0 && props.edit === 1 ? props.info.product_stock : props.type === 1 && props.edit === 1 ? props.info.combo_stock : stock}
                    />
                    <label className="form-label" htmlFor="formStock">
                        Stock
                    </label>
                </div>
            </div>
        </div>

    </div>
    <center><button type="submit" data-bs-dismiss={props.edit === 1 ? "modal" : ""} className="btn btn-primary" >{props.edit === 1 ? "Actualizar" : "Agregar"}</button></center>
</form>
</div>