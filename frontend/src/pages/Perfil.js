import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../components/NavBar";
import NavBarModule from "../static/NavBar/NavBarModule";
import departmentsGuatemala from "../static/data/departmentsGuatemala";
import DataDeliveryMan from "../static/data/DataDeliveryMan";
import Cookie from 'cookie-universal'
import swal from 'sweetalert';
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const cookies = Cookie()
const crr_user = cookies.get("crr_user")

function Perfil({ noUrl }) {
    const [selectedOption, setSelectedOption] = useState("Guatemala");
    const [selectedMunicipio, setSelectedMunicipio] = useState("");
    const [deliveryInfo, setDeliveryInfo] = useState({})

    const peticion = useCallback(() => {
        fetch(`http://localhost:4200/delivery-man/info`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            }

        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(response => {
                console.log("REPONSE///", response)
                setDeliveryInfo(response.deliveryManData[0])
                // setDeliveryInfo(response.)
            })
    }, []);



    const handelSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        if (e.target[0].value === "") {
            return swal({
                title: "Querido Usuario Repartidor",
                text: "Para solicitar un cambio de zona departamental debe de enviar una razón.",
                icon: "error",
                button: true,
            })
        }

        if (e.target[1].value === deliveryInfo.deliveryManDepartment && e.target[2].value === deliveryInfo.deliveryManMunicipality) {
            return swal({
                title: "Querido Usuario Repartidor",
                text: "No se ha podido hacer la solicitud ya que es el mismo departamento y municipio que ya se posee.",
                icon: "error",
                button: true,
            })
        }

        const body = {
            changeDescription: e.target[0].value,
            newDepartment: e.target[1].value,
            newMunicipality: e.target[2].value
        }

        fetch(`http://localhost:4200/delivery-man/change-address`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .catch(err => {
                console.error('Error:', err)
            })
            .then(async response => {
                console.log(response)
                await swal({
                    title: "Querido Usuario Repartidor",
                    text: response.message,
                    icon: response.status === 200 ? "success" : "error",
                    button: true,
                })
            });
    };

    useEffect(() => {
        peticion();
    }, [peticion]);

    return (
        <div>
            <NavBar customContend={< NavBarModule noUrl={noUrl} />} />
            <div className="accordion accordion-flush" id="accordionFlushExample" style={{ width: "80%", margin: "auto", marginTop: "10%" }}>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Ver datos
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <center><h2 style={{ marginTop: "2%" }}>Datos</h2></center>

                        <DataDeliveryMan
                            delivery_man_name={deliveryInfo.deliveryManName}
                            delivery_man_surname={deliveryInfo.deliveryManSurname}
                            delivery_man_department={deliveryInfo.deliveryManDepartment}
                            delivery_man_municipality={deliveryInfo.deliveryManMunicipality}
                            delivery_man_transport={deliveryInfo.deliveryManTransport}
                            delivery_man_email={deliveryInfo.deliveryManEmail}
                            delivery_man_phone={deliveryInfo.deliveryManPhone}
                            delivery_man_license_type={deliveryInfo.deliveryManLicenseType}
                            delivery_man_resume={deliveryInfo.deliveryManResume}
                        />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Ver calificación
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <center><h2 style={{ marginTop: "2%" }}>Su calificación es: </h2>
                        <br></br>
                        <Rating
                            name="simple-controlled"
                            value={+deliveryInfo.deliveryManRating}
                            icon={
                                <StarIcon sx={{ fontSize: 50 }} /> // Ajusta el tamaño del ícono de estrella vacía
                            }
                            emptyIcon={
                                <StarBorderIcon sx={{ fontSize: 50 }} /> // Ajusta el tamaño del ícono de estrella vacía
                            }
                            readOnly
                        /></center>
                        <br></br>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Solicitar de cambio de zona departamental
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <center><h2 style={{ marginTop: "2%" }}>Solicitud de cambio de zona departamental</h2></center>
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