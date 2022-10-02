import React, {useState, useEffect} from "react";
import '../../App.css';
import { Container, Table, Row, Col, Modal, Button, Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ENTERPRISES_API from "../../apis/enterprises-api";
import {useCookies} from 'react-cookie';


function CompanyList(props){

    const [token, setToken]= useCookies(['mr-token']);

    //select and edit staff
    const selectStaff = staff =>{
        props.selectStaff(staff);
        handleShow()
    }
    
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


    //handle submit
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        }
        setValidated(true);
    };


    const createStaff = (e) => {
        handleSubmit(e);
        if(firstname !==undefined && lastname !== undefined && phonenumber !==undefined && businessunit !==undefined ){
            if(firstname !=='' && lastname !== '' && phonenumber !=='' && businessunit !=='' ){
                ENTERPRISES_API.createStaff({firstname, lastname, phonenumber, businessunit}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.createdStaff(resp))
                .catch(error => console.log(error))
                handleClose();
            }
        }return;

    }


    const postStaff = (e) => {
        handleSubmit(e);
        if(firstname !==undefined && lastname !== undefined && phonenumber !==undefined && businessunit !==undefined ){
            if(firstname !=='' && lastname !== '' && phonenumber !=='' && businessunit !=='' ){
                ENTERPRISES_API.updateStaff(staff_.id,{firstname, lastname, phonenumber, businessunit}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedStaff(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteStaff = staff => {
        ENTERPRISES_API.removeStaff(staff.id, token['mr-token'])
        .then(()=>props.deletedStaff(staff))
        .catch(error => console.log(error))
    }


    //modal show or close
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.newStaff();
        setShow(false);
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    

    return(
        <div className="align-items-center containers">
            <Container fluid >
                <Row className="align-items-center tables">
                    <h5>Companies</h5>
                    <Table  striped borderless hover responsive size="sm" variant="success" >
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.companies && props.companies.map(company =>{
                        return (
                            <tr key={company.id}>
                                <td>{company.company}</td>
                                <td>{company.location}</td>
                            </tr>
                        ) 
                    })}
                    </tbody>
                </Table>
                </Row>

                <Row className="align-items-center tables">
                <h5>Business Units</h5>
                <Table striped borderless hover responsive size="sm" variant="success" >
                    <thead>
                    <tr>
                        <th>Unit</th>
                        <th>Location</th>
                        <th>Company</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.businessunits && props.businessunits.map(unit =>{
                        return (
                            <tr key={unit.id}>
                                <td>{unit.unit}</td>
                                <td>{unit.location}</td>
                                <td>{unit.company}</td>
                            </tr>
                        ) 
                    })}
                    </tbody>
                </Table>
                </Row>

                <Row className="align-items-center tables">
                <h5>Enterprise Types</h5>
                <Table  striped borderless hover responsive size="sm" variant="success">
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.enterprisetypes && props.enterprisetypes.map(enterprisetype =>{
                        return (
                            <tr key={enterprisetype.id}>
                                <td>{enterprisetype.type}</td>
                                <td>{enterprisetype.category}</td>
                            </tr>
                        ) 
                    })}
                    </tbody>
                </Table>
                </Row>

                <Row className="align-items-center tables">
                <h5>Staff</h5>

                <div>
                 <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                 <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                     Add</Button>

                </div>
               
               
                <Table striped borderless hover responsive size="sm" variant="success">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th className="align-items-centre">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.staffTeam && props.staffTeam.map(staff =>{
                        return (
                            <tr key={staff.id}>
                                <td>{staff.firstname}</td>
                                <td>{staff.lastname}</td>
                                <td>{staff.phonenumber}</td>
                                <td>
                                <FontAwesomeIcon 
                                    icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                    onClick={ () => {selectStaff(staff)} }
                                    // onClick={ () => {selectStaff(staff).bind(handleShow)}}

                                />
                                {'   '}
                                <FontAwesomeIcon
                                     icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                    onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                    deleteStaff(staff) } }
                                />

                                </td>

                            </tr>
                        ) 
                    })}
                    </tbody>
                </Table>
                </Row>
            </Container>

    <Modal show={show} onHide={handleClose}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title> {staff_.id ? 'Edit Staff': 'Create Staff'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <React.Fragment>
                {staff_ ? (
                    <div>
                        <Container>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" required  
                                    value={firstname || ''} onChange={evt => setFirstName(evt.target.value)}
                                    />
                                <Form.Control.Feedback type="invalid">
                                 Required
                                 </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" required 
                                    value={lastname || ''} onChange={evt => setLastName(evt.target.value)}
                                    />
                                <Form.Control.Feedback type="invalid">
                                 Required
                                 </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phonenumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Phone Number" required  
                                    value={phonenumber || ''} onChange={evt => setPhoneNumber(evt.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                 Required
                                 </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group controlId="businessunit">
                                <Form.Label>Business Unit</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={businessunit || ''}
                                    onChange={evt => setBusinessUnit(evt.target.value)}
                                    required 
                                >
                                    <option value=''>Select...</option>
                                    
                                    {
                                        props.businessunits && props.businessunits.map(unit =>{
                                            return (<option key={unit.id} value={unit.id}>{unit.unit}</option>)
                                            })
                                        }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                 Required
                                 </Form.Control.Feedback>
                                
                            </Form.Group>
                        </Container>
                    </div>
                ): null}
            </React.Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={handleClose}>
            Close
          </Button>
          {staff_.id ?
            <Button variant="primary" onClick={postStaff}> 
                Submit
            </Button> :
            <Button variant="primary" onClick={createStaff}> 
                Submit
            </Button> 
            }
        </Modal.Footer>
        </Form>
      </Modal>

        </div>
    )

}

export default CompanyList;