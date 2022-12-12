import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Stack} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function Customers(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectCustomer = customer=>{
        props.selectCustomer(customer);
        handleShow();
    }

    const customer_ = props.customer;

    
    const [reg_date, setRegDate]=useState();
    const [customer_name, setName]=useState('');
    const [phonenumber, setPhoneNumber]=useState();
    const [email, setEmail]=useState();
    const [location, setLocation]=useState();


    useEffect(()=>{
        setRegDate(customer_.reg_date);
        setName(customer_.customer_name);
        setPhoneNumber(customer_.phonenumber);
        setEmail(customer_.email);
        setLocation(customer_.location);

    }, [customer_])

    
    const [customer, setCustomer] = useState()


    const customers_ = props.customers && props.customers
    let customers = customers_.filter(b => (customer===undefined||customer==='')? b : b.customer_name === customer).map( x => ({...x}))



    const resetTable = () => {
        setCustomer('')
    }

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



    const createCustomer = (e) =>{
        
        handleSubmit (e);
        if(reg_date !== undefined && customer_name !== undefined && phonenumber !== undefined && email!== undefined && location !== undefined){
            if(reg_date !=='' && customer_name !== '' && phonenumber !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersCustomers({reg_date, customer_name, phonenumber, email, location}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newCustomer(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateCustomer = customer =>{
        handleSubmit (customer);
        if(reg_date !== undefined && customer_name !== undefined && phonenumber !== undefined && email!== undefined && location !== undefined){
            if(reg_date !=='' && customer_name !== '' && phonenumber !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersCustomers(customer_.id,{reg_date, customer_name, phonenumber, email, location}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedCustomer(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteCustomer = customer =>{
        LAYERS_SALES_EXPENSES_API.removeLayersCustomers(customer.id, token['mr-token'])
        .then(()=>props.deletedCustomer(customer))
        .catch(error => console.log(error))
    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdCustomer();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    //Pagination

    const [recordsPerPage, setRecordsPerPage]= useState(10)
    const [currentPage, setCurrentPage]= useState(1)
    const [active, setActive] = useState(1)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const customers_paginated = customers.slice(indexFirstRecord,indexLastRecord )
    const pages=Math.ceil(customers.length/recordsPerPage)

    const firstPage = () => {
        if (pages===0)
            setCurrentPage(0)
        else
            setCurrentPage(1) 
    }

    const lastPage = () => {
        if (pages===0)
            setCurrentPage(0)
        else
            setCurrentPage(pages) 
    }

    const activePage = (pageNumber) =>  setActive(pageNumber)
    
 
    const nextPage = () => {
     if(currentPage !== pages) 
         setCurrentPage(currentPage + 1)
         setActive(currentPage + 1)
    }

    
    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                    <Col sm={12} md={12} lg={9}>
                        <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>

                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Customer Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Customer</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={customer || ''}
                                    onChange={evt => setCustomer(evt.target.value)}
                                >
                                <option value=''>...</option>
                                    {
                                            customers.map(customer =>{
                                                return (<option key={customer.id} value={customer.customer_name}>{customer.customer_name}</option>)
                                                })
                                        }
                                </Form.Select>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>

                    <Col sm={12} md={12} lg={1}>
                        <OverlayTrigger overlay={<Tooltip variant="success">Refresh Records</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={resetTable}>
                            <FontAwesomeIcon icon={faSyncAlt} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>





                    </Row>


                    <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                        <thead>
                            <tr>
                                <th>Registration Date</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {customers_paginated.map(customer =>{
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.reg_date_1}</td>
                                    <td>{customer.customer_name}</td>
                                    <td>{customer.phonenumber}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.location}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectCustomer(customer)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteCustomer(customer) } }
                                        />
                                    </td>

                                </tr>
                            ) 
                        })}
                        </tbody>
                </Table>

                <Row>
                    <Col sm={2} md={1} lg={1}>
                    <OverlayTrigger overlay={<Tooltip>Select Records Per Page</Tooltip>}>
                        <Form.Select 
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            value={recordsPerPage || ''}
                            onChange={evt => setRecordsPerPage(evt.target.value)}
                            style={{fontSize:12}}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </Form.Select>
                    </OverlayTrigger>
                    </Col>

                    <Col sm={10} md={11} lg={11} style={{fontSize:10}}>
                    <Paginate 
                        recordsPerPage={recordsPerPage} 
                        totalRecords={customers.length}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        activePage={activePage}
                        active={active}
                        totalPages={pages}
                        currentPage={currentPage}
                        firstPage={firstPage}
                        lastPage={lastPage}

                    />
                    </Col>
                </Row>

            </Row>
        </Container>

        {/* <h1>{eggs_.id? 'Eggs': 'Not Eggs'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {customer_.id ? 'Edit Customer': 'Add Customer'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {customer_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <Form.Group className="mb-2" controlId="regdate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Registration Date" required
                                        value={reg_date || ''} onChange={evt => setRegDate(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="customer">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Name" required
                                        value={customer_name || ''} onChange={evt => setName(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="phonenumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Phone Number or N/A" required
                                        value={phonenumber || ''} onChange={evt => setPhoneNumber(evt.target.value)}
                                        />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Email or Leave Blank" 
                                        value={email || ''} onChange={evt => setEmail(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Location or Leave Blank" 
                                        value={location || ''} onChange={evt => setLocation(evt.target.value)}
                                        />
                                </Form.Group>


                            </Col>

                        </Row>

                    </div>
                ): null}
                </React.Fragment>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                
                {
                customer_.id?(
                <Button variant="primary"  onClick={updateCustomer}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createCustomer}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Customers};