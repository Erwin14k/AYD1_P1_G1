function CardsProducts({id,product_img,product_name,product_price,product_description,handleEditProduct,type}) {
    return (
        <div className="col-md-4 mb-4" key={id} >
        <div className="card">
            <img src={product_img} className="card-img-top" alt={product_name} style={{height:"30vh"}}/>
            <div className="card-body">
                <h5 className="card-title">{product_name}</h5>
                <p className="card-text">Precio: Q.{product_price}</p>
                <p className="card-text">{product_description}</p>
                <button className="btn btn-primary mr-2" data-bs-toggle="modal" data-bs-target={type} onClick={ (e) => handleEditProduct(e,id)}>
                    Editar
                </button>
                <button className="btn btn-danger" style={{ marginLeft: "2%" }}>
                    Eliminar
                </button>
            </div>
        </div>
    </div>
    );
}

export default CardsProducts;