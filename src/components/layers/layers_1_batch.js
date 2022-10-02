import React, {useState, useEffect} from "react";
import '../../App.css';
import { Row, Col, Table, Button, Container, Modal, Form, Pagination,OverlayTrigger, Tooltip} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle, faWindowClose,faCheckCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import {useCookies} from 'react-cookie';
import EnterpriseDashboard from "../enterprises/enterprise_dashboard";
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";


function Batches(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectBatch = btch =>{
        props.selectBatch(btch);
        handleShow();
    }

    const btch_ = props.btch;
    
    const [delivery_date, setDeliveryDate]=useState();
    const [batch, setBatch]=useState();
    const [supplier, setSupplier]=useState();
    const [breed, setBreed]=useState();
    const [ordered_birds, setOrderedBirds]=useState();
    const [delivered_birds, setDeliveredBirds]=useState();
    const [unitprice, setUnitPrice]=useState();
    const [businessunit, setBusinessUnit]=useState();
    const [enterprisetype, setEnterpriseType]=useState();
    const [status, setStatus]=useState();
    


       useEffect(()=>{
        setDeliveryDate(btch_.delivery_date);
        setBatch(btch_.batch);
        setSupplier(btch_.supplier);
        setBreed(btch_.breed);
        setOrderedBirds(btch_.ordered_birds);
        setDeliveredBirds(btch_.delivered_birds);
        setUnitPrice(btch_.unitprice);
        setBusinessUnit(btch_.businessunit);
        setEnterpriseType(btch_.enterprisetype);
        setStatus(btch_.status);
    }, [btch_])

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


    const createBatch =(e)=>{
        handleSubmit (e)
        if(delivery_date !== undefined && batch !== undefined && status !== undefined && supplier !== undefined && breed !== undefined && ordered_birds !== undefined && delivered_birds !== undefined && unitprice !== undefined && businessunit !== undefined && enterprisetype !== undefined && delivered_birds !== undefined ){
            if(delivery_date !=='' && batch !== '' && status !== '' && supplier !== '' && breed !== '' && ordered_birds !== '' && delivered_birds !== '' && unitprice !== '' && businessunit !== '' && enterprisetype !== '' && delivered_birds !== ''){
                LAYERS_PRODUCTION_API.addBatch({delivery_date, batch, status, breed, supplier, ordered_birds, delivered_birds,unitprice, businessunit, enterprisetype}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.createdBatch(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }

    const updateBatch = btch =>{
        handleSubmit (btch)
        if(delivery_date !== undefined && batch !== undefined && status !== undefined && supplier !== undefined && breed !== undefined && ordered_birds !== undefined && delivered_birds !== undefined && unitprice !== undefined && businessunit !== undefined && enterprisetype !== undefined && delivered_birds !== undefined ){
            if(delivery_date !=='' && batch !== '' && status !== '' && supplier !== '' && breed !== '' && ordered_birds !== '' && delivered_birds !== '' && unitprice !== '' && businessunit !== '' && enterprisetype !== '' && delivered_birds !== ''){
                LAYERS_PRODUCTION_API.updateBatches(btch_.id,{delivery_date, batch,status, breed, supplier, ordered_birds, delivered_birds,unitprice, businessunit, enterprisetype}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedBatch(resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;



    }

    const deleteBatch = btch =>{
        LAYERS_PRODUCTION_API.removeBatch(btch.id, token['mr-token'])
        .then(()=>props.deletedBatch(btch))
        .catch(error => console.log(error))

    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.newBatch();
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    
    return(

        <div>
            <Container fluid>

                <Row className="tables">
                    <Row>
                    <Col>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                            Add</Button>
                    </Col>

                    <Col sm={12} md={12} lg={1}>
                        <CSVLink data={props.batches && props.batches} className='text-success'>
                            <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                        <MUIcons.CloudDownloadRounded fontSize="small"/>
                                </Button>
                            </OverlayTrigger>
                        </CSVLink>
                    </Col>


                    {/* <Col>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                            Add</Button>
                    </Col> */}

                    </Row>
                    <Table  className=" table table-success table-striped table-hover table-sm table-borderless" >
                    <thead>
                        <tr>
                            <th>Stock Date</th>
                            <th>Batch</th>
                            <th>Supplier</th>
                            <th>Breed</th>
                            <th>Ordered Birds</th>
                            <th>Delivered Birds</th>
                            <th>Unit Price</th>
                            <th>Total Cost</th>
                            <th>Business Unit</th>
                            <th>Enterprise Type</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.batches && props.batches.map(btch =>{
                        return (
                            <tr key={btch.id}>
                                <td>{btch.delivery_date_1}</td>
                                <td>{btch.batch}</td>
                                <td>{btch.supplier}</td>
                                <td>{btch.breed}</td>
                                <td>{btch.ordered_birds}</td>
                                <td>{btch.delivered_birds}</td>
                                <td>{btch.unitprice}</td>
                                <td>{btch.total_cost}</td>
                                <td>{btch.business_unit}</td>
                                <td>{btch.enterprise_type}</td>
                                <td>
                                    {/* {btch.status===true? 
                                    <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{ color: '#28a745'}}  />:
                                    <FontAwesomeIcon icon={faWindowClose} size="lg" style={{ color: '#dc3545'}}  />
                                    } */}

                                    {btch.status===true? 
                                    <MUIcons.CheckCircleOutline  style={{ color: '#28a745', fontSize: '18px'}}  />:
                                    <MUIcons.CancelOutlined  style={{ color: '#dc3545', fontSize: '18px'}} />
                                    }
                                </td>

                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        // onClick={ () => {selectBatch(batch); handleShow()}}
                                        onClick={ () => {selectBatch(btch)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteBatch(btch) } }
                                    />
                                </td>
                            </tr>
                        ) 
                    })}
                    </tbody>
                    </Table>
            </Row>
        </Container>

        {/* <h1>{btch_.id? 'Working': 'Not Working'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {btch_.id ? 'Edit Batch': 'Create Batch'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {btch_ ? (
                    <div>
                        <Row>
                        <Col>
                            <Form.Group className="mb-2" controlId="deliverydate">
                                    <Form.Label>Delivery Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Delivery Date" required 
                                        value={delivery_date || ''} onChange={evt => setDeliveryDate(evt.target.value)}
                                        />
                                </Form.Group>

                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="batch">
                                    <Form.Label>Batch</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Batch" required
                                        value={batch || ''} onChange={evt => setBatch(evt.target.value)}
                                        />
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>

                            <Col>
                                <Form.Group className="mb-2" controlId="businessunit">
                                    <Form.Label>Business Unit</Form.Label>
                                    <Form.Select
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
                                    </Form.Select>
                                </Form.Group>

                            </Col>

                            <Col> 
                                <Form.Group className="mb-2" controlId="enterprisetype">
                                    <Form.Label>Enterprise Type</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={enterprisetype  || ''}
                                        onChange={evt => setEnterpriseType(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            props.enterprisetypes && props.enterprisetypes.map(type =>{
                                                return (<option key={type.id} value={type.id}>{type.type}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="supplier">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Supplier" required
                                        value={supplier || ''} onChange={evt => setSupplier(evt.target.value)}
                                    />
                                </Form.Group>


                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="breed">
                                    <Form.Label>Breed</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Breed" required
                                        value={breed || ''} onChange={evt => setBreed(evt.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="supplier">
                                    <Form.Label>Ordered Birds</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Ordered Birds" required
                                        value={ordered_birds || ''} onChange={evt => setOrderedBirds(evt.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="deliveredbirds">
                                    <Form.Label>Delivered Birds</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Delivered Birds" required
                                        value={delivered_birds || ''} onChange={evt => setDeliveredBirds(evt.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="unitprice">
                                    <Form.Label>Unit Price</Form.Label>
                                    <Form.Control type="decimal" placeholder="Enter Unit Price" required
                                        value={unitprice || ''} onChange={evt => setUnitPrice(evt.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mt-4" controlId="formBasicCheckbox">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Active Batch" 
                                        checked={status || ''} 
                                        onChange={evt => setStatus(evt.target.checked)} />
                                </Form.Group>

                            </Col>

                        </Row>
                        

                    </div>
                ): null}
                </React.Fragment>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" type="reset" onClick={handleClose}>
                    Close
                </Button>
                {btch_.id ?
                                    <Button variant="primary"  onClick={updateBatch}>
                                    Submit
                                    </Button>  :
                                    <Button variant="primary" onClick={createBatch}  >
                                        Submit
                                    </Button> 
                                    }

                </Modal.Footer>
            </Form>
        </Modal>
        </div>
 
 )

}

export {Batches};