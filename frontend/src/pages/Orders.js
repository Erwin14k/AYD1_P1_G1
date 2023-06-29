import React from "react";
import NavBar from "../components/NavBar";
import NavBarModule from "../static/NavBar/NavBarModule";


function Orders({noUrl}) {
  

    return (

        <div style={{ width: "90%", margin: "auto", marginTop: "8%" }}>
        <NavBar customContend={< NavBarModule noUrl={noUrl} />} />
        <div>
        Orders
        </div>
    </div>
    );
}

export default Orders;