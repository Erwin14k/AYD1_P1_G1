function ModalBase({title, children}) {
   return (
      <div className="modal fade" id="editProductModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-10" id="staticBackdropLabel">{title}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                     <children/>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ marginLeft: "1%" }} >Cerrar</button>
              </div>
          </div>
      </div>
  </div>
   );
}

export default ModalBase;