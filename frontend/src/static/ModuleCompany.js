import React, { useState, useEffect } from 'react';
import CardsProducts from '../components/CardsProducts';
import ModalBase from '../components/ModalBase';
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModuleCompany = () => {
    const [products, setProducts] = useState([]);
    const [combos, setCombos] = useState([]);

    const actualizar = () => {
        console.log("actualizar")
        fetch(`http://localhost:4200/company/info`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${crr_user.data[0].authToken}`, 
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.companyData[1].companyProducts);
                setCombos(data.companyData[2].companyCombos);

            })
            .catch((error) => {
                console.error('Error:', error)
            });

    }

    const handleDeleteProduct = ( productId) => {
        const body = {
            productId: productId
        }
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar el producto?");
        if (confirmDelete) {
            fetch(`http://localhost:4200/company/delete-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${crr_user.data[0].authToken}`,
                },
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message)
                    actualizar();
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
        }

    };

    const handleDeleteCombo = ( productId) => {
        const body = {
            productId: productId
        }
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar el producto?");
        if (confirmDelete) {
            fetch(`http://localhost:4200/company/delete-combo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${crr_user.data[0].authToken}`,
                },
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message)
                    actualizar();
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
        }

    };

 

    useEffect(() => {
        actualizar();
    }, []);

    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "8%" }}>
            <h1>Bienvenido Empresa,</h1>
            <button type="button" onClick={() => actualizar()} className="btn" style={{ marginTop: "2%", backgroundColor: "#DB4F23", color: "white" }}>Actualizar</button>
            {/* Windows */}
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

             {/* Sections */}
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{ padding: "2%" }}>
                    
                    <center><h3>CATÁLOGO DE PRODUCTOS</h3></center>
                    <div className="row" style={{ marginTop: "2%" }}>
                        {products.map((product) => (
                            <CardsProducts
                                id={product.product_id}
                                product_img={product.product_img}
                                product_name={product.product_name}
                                product_price={product.product_price}
                                product_description={product.product_description}
                            />
                        ))}
                        {combos.map((product) => (
                            <CardsProducts
                                id={product.combo_id}
                                product_img={product.combo_img}
                                product_name={product.combo_name}
                                product_price={product.combo_price}
                                product_description={product.combo_description}
                            />
                        ))}
                    </div>
                </div>

                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>AGREGA UN NUEVO PRODUCTO</h3></center>
                    {/* <FormAgregar type={0} edit={0} info={{}} /> */}

                </div>
                <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>PEDIDOS</h3></center>
                </div>
                <div className="tab-pane fade" id="mantenimiento" role="tabpanel" aria-labelledby="profile-tab" style={{ padding: "2%" }}>
                    <center><h3>AGREGA UN NUEVO COMBO</h3></center>
                    {/* <FormAgregar type={1} edit={0} info={{}} /> */}
                </div>
            </div>

            {/* MODAL EDITAR PRODUCTO */}
            <ModalBase title={"Editar Producto"} />
           
            {/* MODAL EDITAR COMBO*/}
            <ModalBase title={"Editar Combo"} />
        </div>
    );
}



export default ModuleCompany;