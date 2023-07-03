import React from "react";
import NavBar from "../components/NavBar";
import NavBarModule from "../static/NavBar/NavBarModule";
import Bill from "../components/Bill";




function ShoppingCart({noUrl}) {
    return (
        <div style={{ width: "90%", margin: "auto", marginTop: "8%" }}>
            <NavBar customContend={< NavBarModule noUrl={noUrl} />} />
            <Bill  />
        </div>
    );
}

export default ShoppingCart;