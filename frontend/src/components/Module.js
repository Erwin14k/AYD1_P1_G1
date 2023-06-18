import NavBar from "./NavBar";
import NavBarModule from "../static/NavBarModule";
import ModuleDelivery from "../static/ModuleDelivery";
import ModuleClient from "../static/ModuleClient";
import ModuleCompany from "../static/ModuleCompany";
import ModuleAdmin from "../static/ModuleAdmin";

function Module({  noUrl, customContent }) {
    return(
        <div>
            <NavBar  customContend={< NavBarModule noUrl={noUrl}/> }  />
            {noUrl === 2 ? <ModuleDelivery /> : noUrl === 1 ? <ModuleClient /> : noUrl === 3 ? <ModuleCompany /> : noUrl === 0 ? <ModuleAdmin /> : <div>ERROR</div>}
        </div>
    );
}

export default Module;