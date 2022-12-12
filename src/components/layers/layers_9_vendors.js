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



function Vendors(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectVendor = vendor=>{
        props.selectVendor(vendor);
        handleShow();
    }

    const vendor_ = props.vendor;

    
    const [vendor_date, setVendorDate]=useState();
    const [vendor, setVendor] = useState();
    const [phonenumber, setPhoneNumber]=useState();
    const [email, setEmail]=useState();
    const [location, setLocation]=useState();


    useEffect(()=>{
        setVendorDate(vendor_.vendor_date);
        setVendor(vendor_.vendor);
        setPhoneNumber(vendor_.phonenumber);
        setEmail(vendor_.email);
        setLocation(vendor_.location);

    }, [vendor_])

    


    const vendors_ = props.vendors && props.vendors
    let vendors = vendors_.filter(b => (vendor===undefined||vendor==='')? b : b.vendor === vendor).map( x => ({...x}))



    const resetTable = () => {
        setVendor('')
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



    const createVendor = (e) =>{
      
        
        handleSubmit (e);
        if(vendor_date !== undefined && vendor !== undefined && phonenumber !== undefined && email!== undefined && location !== undefined){
            if(vendor !=='' && vendor !== '' && phonenumber !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersVendors({vendor_date, vendor, phonenumber, email, location}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newVendor(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateVendor = supplier =>{
        handleSubmit (supplier);
        if(vendor_date !== undefined && vendor !== undefined && phonenumber !== undefined && email!== undefined && location !== undefined){
            if(vendor !=='' && vendor !== '' && phonenumber !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersVendors(vendor_.id,{vendor_date, vendor, phonenumber, email, location}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedVendor(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteVendor = vendor =>{
        LAYERS_SALES_EXPENSES_API.removeLayersVendors(vendor.id, token['mr-token'])
        .then(()=>props.deletedVendor(vendor))
        .catch(error => console.log(error))
    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdVendor();
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
    const vendors_paginated = vendors.slice(indexFirstRecord,indexLastRecord )
    const pages=Math.ceil(vendors.length/recordsPerPage)

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
 
    const prevPage = () => {
         if(currentPage > 1) 
             setCurrentPage(currentPage - 1)
             setActive(currentPage - 1)
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
                            <InputGroup.Text >Vendor</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={vendor || ''}
                                    onChange={evt => setVendor(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                        {
                                            vendors.map(vendor =>{
                                                return (<option key={vendor.id} value={vendor.vendor}>{vendor.vendor}</option>)
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
                                <th>Location</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {vendors_paginated.map(vendor =>{
                            return (
                                <tr key={vendor.id}>
                                    <td>{vendor.vendor_date_1}</td>
                                    <td>{vendor.vendor}</td>
                                    <td>{vendor.phonenumber}</td>
                                    <td>{vendor.location}</td>
                                    <td>{vendor.email}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectVendor(vendor)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteVendor(vendor) } }
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
                        totalRecords={vendors.length}
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
                <Modal.Title> {vendor_.id ? 'Edit Vendor': 'Add Vendor'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {vendor_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <Form.Group className="mb-2" controlId="regdate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Registration Date" required
                                        value={vendor_date || ''} onChange={evt => setVendorDate(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="vendor">
                                    <Form.Label>Vendor</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Name" required
                                        value={vendor || ''} onChange={evt => setVendor(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="phonenumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Phone Number or N/A" required
                                        value={phonenumber || ''} onChange={evt => setPhoneNumber(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="location">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Location or N/A" 
                                        value={location || ''} onChange={evt => setLocation(evt.target.value)}
                                        />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Customer Email or none@gmail.com"  
                                        value={email || ''} onChange={evt => setEmail(evt.target.value)}
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
                vendor_.id?(
                <Button variant="primary"  onClick={updateVendor}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createVendor}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Vendors};