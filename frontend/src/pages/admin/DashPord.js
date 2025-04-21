import React from "react";
import MembershipTable from "../../components/admin/MembershipTable";
import UsersTable from "../../components/admin/UsersTable";
import TranersTable from "../../components/admin/TranersTable";

const DashPord = ( ) => {


    return( 

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

        <UsersTable/>

        <TranersTable/>

        <MembershipTable/>

        
        </div>

    );

}

export default DashPord;