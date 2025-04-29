import React from "react";
import MembershipTable from "../../components/admin/MembershipTable";
import UsersTable from "../../components/admin/UsersTable";
import TranersTable from "../../components/admin/TranersTable";
import AdminTable from "../../components/admin/AdminTable"
import SubscriptionTable from "../../components/admin/SubscriptionTable";
import GroupTrainingSession from "../../components/admin/GroupTrainingSession";

const DashBoard = ( ) => {


    return( 

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

        <UsersTable/>

        <TranersTable/>
       
        <AdminTable />

        <MembershipTable/>

        <SubscriptionTable />

        <GroupTrainingSession />



        
        </div>

    );

}

export default DashBoard;