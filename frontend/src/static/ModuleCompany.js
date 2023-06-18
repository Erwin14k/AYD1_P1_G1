import React, { useState, useEffect } from 'react';
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");


const FormAgregar = (props) => {
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);

    const handleStockChange = (event) => {
        const value = event.target.value;
        const intValue = parseInt(value);

        if (!isNaN(intValue) && intValue >= 0) {
            setStock(intValue.toString());
        }
    };
    const handleStockPrice = (event) => {
        const value = event.target.value;

        // Validar el formato utilizando una expresión regular
        const regex = /^\d+(\.\d{0,2})?$/;
        if (regex.test(value)) {
            setPrice(value);
        }
    };
    const handleFileSelect = (event) => {
        const files = event.target.files;
        if (files.length > 1) {
            alert("Solo se permiten un máximo de 1 archivo.");
            event.target.value = null; // Limpiar los archivos seleccionados si se excede el límite
        }
    };

    const handelSubmit = (e) => {
        e.preventDefault();


        var formData = new FormData();
        formData.append("companyId", "121")/* formData.append("companyId", crr_user.data[0].companyId) */

        var url = ""
        if (props.type === 0) {
            formData.append("productType", e.target[4].value)
            formData.append("productName", e.target[0].value)
            formData.append("productPrice", e.target[3].value)
            formData.append("product_description", e.target[2].value)
            formData.append("product_img", e.target[1].files[0])
            formData.append("product_number_of_sales", 0)
            formData.append("product_stock", e.target[5].value)

            url = "company/new-product"
        } else {
            formData.append("comboName", e.target[0].value)
            formData.append("comboPrice", e.target[3].value)
            formData.append("comboDescription", e.target[2].value)
            formData.append("comboImg", e.target[1].files[0])
            formData.append("comboNumberOfSales", 0)
            formData.append("combo_stock", e.target[4].value)

            url = "company/new-combo"
        }

        console.log(formData)

        fetch(`http://localhost:4200/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer 1123123123`,//Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message)
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });

        console.log("Formulario Enviado Company");
    };
    return (
        <div>
            <form onSubmit={handelSubmit} style={{ width: "80%", margin: "auto", marginTop: "3%" }}>
                <div className="form-outline mb-4">
                    <div className="form-outline mb-4">
                        <input type="text" id="form3Example3" className="form-control" />
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
                        Seleccionar imagen
                    </label>

                    <div className="form-outline mb-4">
                        <textarea id="form3Example3" className="form-control" />
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
                                    value={price}
                                    id="formPrice"
                                    onChange={handleStockPrice}
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
                                        <option key={index} value={option}>
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
                                    value={stock}
                                    id="formStock"
                                    onChange={handleStockChange}
                                />
                                <label className="form-label" htmlFor="formStock">
                                    Stock
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
                <center><button type="submit" className="btn btn-primary">Agregar</button></center>
            </form>
        </div>
    );
}

const ModuleCompany = () => {
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
                    <FormAgregar type={0} />

                </div>
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>PEDIDOS</h3></center>
                </div>
                <div className="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>AGREGA UN NUEVO COMBO</h3></center>
                    <FormAgregar type={1} />
                </div>
            </div>
        </div>
    );
}



export default ModuleCompany;