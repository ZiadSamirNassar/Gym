import React from 'react';
import Button  from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const TranersTable = () => {

    return(
        <>

        <div style={{width: "70%", marginTop: "20px"}}>

            <h2 style={{textAlign: "center", marginBottom: "15px"}}>ALL TRANERS</h2>

            <Button variant="success" style={{marginBottom: "15px"}}>Add Traner +</Button>

            <Table striped hover bordered >

                <thead>
                    <tr>
                    <th style={{width: '3%'}}>#</th>
                    <th>name</th>
                        <th>age</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>ziad</td>
                        <td>21</td>
                        <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                            <Button variant='info' size="sm" >Show more</Button>
                            <Button variant='danger' size="sm" >Delete</Button>
                            <Button variant='success' size="sm" >Update</Button>
                        </td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>ziad</td>
                        <td>21</td>
                        <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                            <Button variant='info' size="sm" >Show more</Button>
                            <Button variant='danger' size="sm" >Delete</Button>
                            <Button variant='success' size="sm" >Update</Button>
                        </td>
                    </tr>


                    <tr>
                        <td>3</td>
                        <td>ziad</td>
                        <td>21</td>
                        <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                            <Button variant='info' size="sm" >Show more</Button>
                            <Button variant='danger' size="sm" >Delete</Button>
                            <Button variant='success' size="sm" >Update</Button>
                        </td>
                    </tr>

                </tbody>

            </Table>

        </div>
        
            
        
        </>
    );

}

export default TranersTable;