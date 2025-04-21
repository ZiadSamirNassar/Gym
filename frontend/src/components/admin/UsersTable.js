import React from 'react';
import Table from 'react-bootstrap/Table'

const UsersTable = () => {

    return(
        <>

        <div style={{width: "70%", marginTop: "20px"}}>

            <h2 style={{textAlign: "center", marginBottom: "15px"}}>ALL USERS</h2>

            <Table striped hover bordered >

                <thead>
                    <tr>
                        <th style={{width: '3%'}}>#</th>
                        <th>name</th>
                        <th>age</th>
                        <th>address</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>ziad</td>
                        <td>21</td>
                        <td>El-marg</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>ziad</td>
                        <td>21</td>
                        <td>El-marg</td>
                    </tr>


                    <tr>
                        <td>3</td>
                        <td>ziad</td>
                        <td>21</td>
                        <td>El-marg</td>
                    </tr>


                </tbody>

            </Table>

        </div>
        
            
        
        </>
    );

}

export default UsersTable;