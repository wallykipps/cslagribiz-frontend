import React, {useState, useEffect} from "react";
import { Container, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import ENTERPRISES_API from '../apis/enterprises-api';

function StaffForm(props){
    const staff_ = props.staff;
    const [firstname, setFirstName]=useState();
    const [lastname, setLastName]=useState();
    const [phonenumber, setPhoneNumber]=useState();
    const [businessunit, setBusinessUnit]=useState();

    useEffect(()=>{
        setFirstName(staff_.firstname);
        setLastName(staff_.lastname);
        setPhoneNumber(staff_.phonenumber);
        setBusinessUnit(staff_.businessunit);
    }, [staff_])


    const postStaff = () => {
        ENTERPRISES_API.updateStaff(staff_.id,{firstname, lastname, phonenumber, businessunit})
        .then(resp => console.log(resp))
        .then(resp => props.updatedStaff(resp))
        .catch(error => console.log(error))

    }

    return(
        
       
        <React.Fragment>
        {staff_ ? (
            <div>
                {/* <h1>{staff_.firstname}Form</h1> */}
                <Container>
                    <Col md={5}>
                        <Form>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" 
                                    value={firstname} onChange={evt => setFirstName(evt.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" 
                                    value={lastname} onChange={evt => setLastName(evt.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phonenumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Phone Number" 
                                    value={phonenumber} onChange={evt => setPhoneNumber(evt.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="businessunit">
                                <Form.Label>Business Unit</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={staff_.businessunit}
                                    onChange={evt => setBusinessUnit(evt.target.value)}
                                >
                                    <option value=''>Select...</option>
                                    
                                    {
                                        props.staffTeam && props.staffTeam.map(s =>{
                                            return (<option key={s.id} value={s.id}>{s.businessunit}</option>)
                                            })
                                        }
                                </Form.Control>
                                
                            </Form.Group>

                            {staff_.id ?
                            <Button variant="primary" type="submit" onClick={postStaff}>
                                Submit
                            </Button> :

                            <Button variant="primary" type="submit">
                                Submit
                            </Button> 
                            }
                        </Form>
                    </Col>
                </Container>
            </div>
        ): null}
        </React.Fragment>
    
    )

}

export default StaffForm;