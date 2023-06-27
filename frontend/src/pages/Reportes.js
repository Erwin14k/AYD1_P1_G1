import NavBar from "../components/NavBar";
import NavBarModule from "../static/NavBar/NavBarModule";
import ReportesAdmin from "../static/AdminStatic/ReportesAdmin";
import ReportesEmpresa from "../static/AdminStatic/ReportesEmpresa";

function Reportes({noUrl}) {
    return (
        <div style={{ width: "80%", margin: "auto", marginTop: "8%" }}>
            <NavBar customContend={< NavBarModule noUrl={noUrl} />} />
            {noUrl===0 ? <ReportesAdmin/> : noUrl === 3 ? <ReportesEmpresa/> : <div>ERROR</div> }
        </div>
    );
}

export default Reportes;