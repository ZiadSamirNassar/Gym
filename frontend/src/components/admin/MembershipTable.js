import React from 'react';
import Button  from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const MembershipTable = () => {

    return(
        <>

        <div style={{width: "70%", marginTop: "20px"}}>

            <h2 style={{textAlign: "center", marginBottom: "15px"}}>ALL MEMBERSHIPS</h2>

            <Button variant="success" style={{marginBottom: "15px"}}>Add Membership +</Button>

            <Table striped hover bordered >

                <thead>
                    <tr>
                    <th style={{width: '3%'}}>#</th>
                    <th>name</th>
                        <th>duration</th>
                        <th>price</th>
                        <th style={{textAlign: 'center'}} >Action</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>normal</td>
                        <td>1 month</td>
                        <td>15$</td>
                        <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                            <Button variant='info' size="sm" >Show more</Button>
                            <Button variant='danger' size="sm" >Delete</Button>
                            <Button variant='success' size="sm" >Update</Button>
                        </td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>premum</td>
                        <td>3 months</td>
                        <td>40$</td>
                        <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                            <Button variant='info' size="sm" >Show more</Button>
                            <Button variant='danger' size="sm" >Delete</Button>
                            <Button variant='success' size="sm" >Update</Button>
                        </td>
                    </tr>


                    <tr>
                        <td>3</td>
                        <td>golden</td>
                        <td>6 months</td>
                        <td>75$</td>
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

export default MembershipTable;