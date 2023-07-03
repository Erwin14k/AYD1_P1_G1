import NavBar from "./NavBar";
import NavBarModule from "../static/NavBar/NavBarModule";
import ModuleDelivery from "../static/Modules/ModuleDelivery";
import ModuleClient from "../static/Modules/ModuleClient";
import ModuleCompany from "../static/Modules/ModuleCompany";
import ModuleAdmin from "../static/Modules/ModuleAdmin";

function Module({  noUrl, customContent }) {
    return(
        <div>
            <NavBar  customContend={< NavBarModule noUrl={noUrl}/> }  />
            {noUrl === 2 ? <ModuleDelivery /> : noUrl === 1 ? <ModuleClient /> : noUrl === 3 ? <ModuleCompany /> : noUrl === 0 ? <ModuleAdmin /> : <div>ERROR</div>}
        </div>
    );
}

export default Module;