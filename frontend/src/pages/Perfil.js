import NavBar from "../components/NavBar";
import NavBarModule from "../static/NavBarModule";
import departmentsGuatemala from "../static/departmentsGuatemala";
import React, { useState } from "react";

function Perfil({ noUrl }) {
    const [selectedOption, setSelectedOption] = useState("Guatemala");
    const [selectedMunicipio, setSelectedMunicipio] = useState("");
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado", noUrl);
    };

    return (
        <div>
            <NavBar customContend={< NavBarModule noUrl={noUrl} />} />
            <div class="accordion accordion-flush" id="accordionFlushExample" style={{ width: "80%", margin: "auto", marginTop: "10%" }}>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Ver datos
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <center><h2 style={{marginTop:"2%"}}>Datos</h2></center>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Ver calificación
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <center><h2 style={{marginTop:"2%"}}>Su calificación es: 00.00</h2></center>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Solicitar de cambio de zona departamental
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <center><h2 style={{marginTop:"2%"}}>Solicitud de cambio de zona departamental</h2></center>
                        <br></br>
                        <form onSubmit={handelSubmit}>
                            <div className="form-outline mb-4">
                                <textarea id="form3Example3" className="form-control" />
                                <label className="form-label" htmlFor="form3Example3">
                                    Razón de cambio
                                </label>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <select
                                            className="form-control"
                                            id="form3Example4"
                                            value={selectedOption}
                                            onChange={(event) => setSelectedOption(event.target.value)}
                                        >
                                            {departmentsGuatemala.map((departamento, index) => (
                                                <option key={index} value={departamento.departamento}>
                                                    {departamento.departamento}
                                                </option>
                                            ))}
                                        </select>
                                        <label className="form-label" htmlFor="form3Example4">
                                            Nuevo departamento
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <select
                                            className="form-control"
                                            id="form3Example4"
                                            value={selectedMunicipio}
                                            onChange={(event) =>
                                                setSelectedMunicipio(event.target.value)
                                            }
                                        >
                                            {departmentsGuatemala
                                                .find(
                                                    (departamento) =>
                                                        departamento.departamento === selectedOption
                                                )
                                                .municipios.map((municipio, index) => (
                                                    <option key={index} value={municipio}>
                                                        {municipio}
                                                    </option>
                                                ))}
                                        </select>
                                        <label className="form-label" htmlFor="form3Example4">
                                            Nuevo municipio
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <center>
                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Realizar Solicitud
                                </button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Perfil;