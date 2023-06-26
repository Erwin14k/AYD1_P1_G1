import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");



const ModuleCompany = () => {
    const [products, setProducts] = useState([]);
    const [combos, setCombos] = useState([]);

    const [productInfo, setProductInfo] = useState([]);
    const [comboInfo, setComboInfo] = useState([]);

    const verInfoProduct = (value) => {
        products.map((fila) => {
            if (fila.product_id === value) {
                setProductInfo(fila);
            }
            return null; // Agrega esta línea si no hay un valor de retorno requerido
        });
    };

    const verInfoCombo = (value) => {
        combos.map((fila) => {
            if (fila.combo_id === value) {
                setComboInfo(fila);
            }
            return null; // Agrega esta línea si no hay un valor de retorno requerido
        });
    };

    const actualizar = () => {
        console.log("actualizar")
        fetch(`http://localhost:4200/company/info`, {
            method: "GET",
            headers: {
                /* "Content-Type": "application/json", */
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }
        })
            .then((response) => response.json())
            .then((data) => {
                const productos = data.companyData[1].companyProducts
                const cc = data.companyData[2].companyCombos

                setProducts(productos);
                setCombos(cc);

                verInfoProduct(productInfo.product_id);
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error('Error:', error)
            });

    }

    const handleDelete = async (url, productId) => {
        const body = {
            productId: productId
        }
        const willDelete = await swal({
            title: "¿Estás seguro?",
            text: "¿Estás seguro de que deseas eliminar el producto?",
            icon: "warning",
            dangerMode: true,
        })

        //console.log("RESULRS", willDelete)
        if (willDelete) {
            fetch(`http://localhost:4200/company/${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
                },
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then(async (data) => {
                    await swal({
                        title: `Querido Usuario: ${crr_user.data[0].companyName}`,
                        text: data.message,
                        icon: data.status === 200 ? "success" : "error",
                        button: true,
                    })
                    actualizar();
                })
                .catch((error) => {
                    // Handle any errors that occur during the request
                    console.error('Error:', error)
                });
        }

    };

    const handleDeleteCombo = async (url, productId) => {
        const body = {
            comboId: productId
        }
        const willDelete = await swal({
            title: "¿Estás seguro?",
            text: "¿Estás seguro de que deseas eliminar el combo?",
            icon: "warning",
            dangerMode: true,
        })

        console.log("RESULRS", willDelete)
        if (willDelete) {
            fetch(`http://localhost:4200/company/${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
                },
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then(async (data) => {

                    await swal({
                        title: `Querido Usuario: ${crr_user.data[0].companyName}`,
                        text: data.message,
                        icon: data.status === 200 ? "success" : "error",
                        button: true,
                    })
                    actualizar();
                })
                .catch((error) => {
                    // Handle any errors that occur during the request
                    console.error('Error:', error)
                });
        }

    };

    const FormAgregar = (props) => {
        const [stock, setStock] = useState(0);
        const [price, setPrice] = useState(0.01);

        const handleStockChange = async (event) => {
            const value = event.target.value;
            const intValue = parseInt(value);

            if (intValue >= 0) {
                setStock(intValue.toString());
            } else {
                setStock(0)
                event.target.value = 0
                await swal({
                    title: "Error en el stock",
                    text: "El stock debe ser un 0 o positivo",
                    icon: "error",
                    button: true,
                });
            }
        };
        const handleStockPrice = async (event) => {
            const value = event.target.value;

            // Validar el formato utilizando una expresión regular
            if (event.target.value > 0) {
                setPrice(value);
            } else {
                setStock(1)
                event.target.value = 1
                await swal({
                    title: "Error en el precio",
                    text: "El precio debe ser mayor a 0",
                    icon: "error",
                    button: true,
                });
            }
        };
        const handleFileSelect = async (event) => {
            const files = event.target.files;
            if (files.length > 1) {
                await swal({
                    title: "Error en las imagenes",
                    text: "Solo se permiten un máximo de 1 archivo.",
                    icon: "error",
                    button: true,
                });
                event.target.value = null; // Limpiar los archivos seleccionados si se excede el límite
            }
        };

        const handelSubmit = async (e) => {
            e.preventDefault();

            if (e.target[0].value === "")
                return await swal({
                    title: `Querido Usuario ${crr_user.data[0].companyName}`,
                    text: "Nombre Inválido",
                    icon: "warning",
                    button: true,
                });

            if (e.target[2].value === "")
                return await swal({
                    title: `Querido Usuario ${crr_user.data[0].companyName}`,
                    text: "Descripción Inválida",
                    icon: "warning",
                    button: true,
                });

            if (props.edit !== 1) {
                if (!e.target[1].value)
                    return await swal({
                        title: `Querido Usuario ${crr_user.data[0].companyName}`,
                        text: "Ingrese una imagen.",
                        icon: "warning",
                        button: true,
                    });
            }

            var formData = new FormData();
            formData.append("companyId", crr_user.data[0].companyId)

            var url = ""
            if (props.type === 0) {
                formData.append("productType", e.target[4].value)
                formData.append("productName", e.target[0].value)
                formData.append("productPrice", e.target[3].value)
                formData.append("productDescription", e.target[2].value)
                formData.append("img", e.target[1].files[0])
                formData.append("productNumberOfSales", props.edit === 1 ? productInfo.product_number_of_sales : 0)
                formData.append("productStock", e.target[5].value)

                if (props.edit === 1) {
                    formData.append("productId", productInfo.product_id)
                    url = "company/edit-product"
                } else {
                    url = "company/new-product"
                }

            } else {
                formData.append("comboName", e.target[0].value)
                formData.append("img", e.target[1].files[0])
                formData.append("comboDescription", e.target[2].value)
                formData.append("comboPrice", e.target[3].value)
                formData.append("comboStock", e.target[4].value)
                formData.append("comboNumberOfSales", props.edit === 1 ? comboInfo.comboNumberOfSales : 0)

                console.log("DATA")
                console.log(props)

                console.log(e.target[0].value)
                console.log(e.target[1].files[0])
                console.log(e.target[2].value)
                console.log(e.target[3].value)
                console.log(e.target[4].value)
                console.log(props.edit === 1 ? comboInfo.comboNumberOfSales : 0)
                console.log(comboInfo.combo_id)

                if (props.edit === 1) {
                    formData.append("comboId", comboInfo.combo_id)
                    url = "company/edit-combo"
                } else {
                    url = "company/new-combo"
                }

            }

            fetch(`http://localhost:4200/${url}`, {
                method: "POST",
                headers: {
                    /* "Content-Type": "application/json", */
                    Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
                },
                body: formData,
            })
                .then((response) => response.json())
                .then(async (data) => {
                    await swal({
                        title: `Querido Usuario: ${crr_user.data[0].companyName}`,
                        text: data.message,
                        icon: data.status === 200 ? "success" : "error",
                        button: true,
                    })
                    actualizar();
                })
                .catch((error) => {
                    // Handle any errors that occur during the request
                    console.error('Error:', error)
                });
        };

        return (
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
                                        Value={props.type === 0 && props.edit === 1 ? props.info.product_price : props.type === 1 && props.edit === 1 ? props.info.combo_price : price}
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
                                        Value={props.type === 0 && props.edit === 1 ? props.info.product_stock : props.type === 1 && props.edit === 1 ? props.info.combo_stock : stock}
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
        );
    }

    useEffect(() => {
        actualizar();
    }, []);

    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "8%" }}>
            <h1>Bienvenido Empresa,</h1>
            <button type="button" onClick={() => actualizar()} className="btn" style={{ marginTop: "2%", backgroundColor: "#DB4F23", color: "white" }}>Actualizar</button>
            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ marginTop: "3%" }}>
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
                    <div className="row" style={{ marginTop: "2%" }}>
                        {products.map((product) => (
                            <div className="col-md-4 mb-4" key={product.product_id} >
                                <div className="card">
                                    <img src={product.product_img} className="card-img-top" alt={product.product_name} style={{ height: "30vh" }} />
                                    <div className="card-body">
                                        <h5 className="card-type">Categoría: {product.product_type}</h5>
                                        <h5 className="card-title">{product.product_name}</h5>
                                        <p className="card-text">{product.product_description}</p>
                                        <div className="details-container">
                                            <p className="price">Precio: Q.{product.product_price}</p>
                                            <p className="sales">No. Ventas: {product.product_number_of_sales}</p>
                                        </div>
                                        <center>
                                            <button className="btn btn-primary mr-2" data-bs-toggle="modal" data-bs-target="#editProductModal" onClick={() => verInfoProduct(product.product_id)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger" style={{ marginLeft: "2%" }} onClick={() => handleDelete("delete-product", product.product_id)}>
                                                Eliminar
                                            </button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {combos.map((product) => (
                            <div className="col-md-4 mb-4" key={product.combo_id}>
                                <div className="card">
                                    <img src={product.combo_img} className="card-img-top" alt={product.combo_name} style={{ height: "30vh" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.combo_name}</h5>
                                        <p className="card-text">Precio: Q.{product.combo_price}</p>
                                        <p className="card-text">{product.combo_description}</p>
                                        <center>
                                            <button className="btn btn-primary mr-2" data-bs-toggle="modal" data-bs-target="#editComboModal" onClick={() => verInfoCombo(product.combo_id)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger" style={{ marginLeft: "2%" }} onClick={() => handleDeleteCombo("delete-combo", product.combo_id)}>
                                                Eliminar
                                            </button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>AGREGA UN NUEVO PRODUCTO</h3></center>
                    <FormAgregar type={0} edit={0} info={{}} />

                </div>
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>PEDIDOS</h3></center>
                </div>
                <div className="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>AGREGA UN NUEVO COMBO</h3></center>
                    <FormAgregar type={1} edit={0} info={{}} />
                </div>
            </div>

            {/* MODAL EDITAR PRODUCTO */}
            <div className="modal fade" id="editProductModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-10" id="staticBackdropLabel">Editar Producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormAgregar type={0} edit={1} info={productInfo} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ marginLeft: "1%" }} >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EDITAR COMBO*/}
            <div className="modal fade" id="editComboModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-10" id="staticBackdropLabel">Editar Combo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormAgregar type={1} edit={1} info={comboInfo} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ marginLeft: "1%" }} >Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ModuleCompany;