import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Stack,Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function FeedTypes(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectFeedType = feedtype =>{
        props.selectFeedType(feedtype);
        handleShow();
    }

    const feedtype_ = props.feedtype;
    // console.log(feedtype_)
    
    const [feed_type_1, setFeedType]=useState();
    const [unit, setUnit]=useState('');
    const [unitmeasure, setUnitMeasure]=useState();
    const [brand, setBrand]=useState('');



    useEffect(()=>{
        setFeedType(feedtype_.feed_type_1);
        setUnit(feedtype_.unit);
        setUnitMeasure(feedtype_.unitmeasure);
        setBrand(feedtype_.brand);

    }, [feedtype_])

    const costcategories= props.costcategories && props.costcategories
    const feedtypes_0= props.feedtypes && props.feedtypes
    let feedtypes = feedtypes_0.filter(a=>a.id!=1).map(b=>({...b}))
    // console.log(feedtypes)


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



    const createFeedType = (e) =>{
        handleSubmit (e);
        if(feed_type_1 !== undefined && unit !== undefined && unitmeasure !== undefined && brand!== undefined ){
            if(feed_type_1 !=='' && unit !== '' && unitmeasure !== '' && brand !== '' ){
                LAYERS_PRODUCTION_API.addFeedTypes({feed_type_1, unit, unitmeasure, brand}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newFeedType(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateFeedType= feedtype =>{
        handleSubmit (feedtype);
        if(feed_type_1 !== undefined && unit !== undefined && unitmeasure !== undefined && brand!== undefined){
            if(feed_type_1 !=='' && unit !== '' && unitmeasure !== '' && brand !== ''){
                LAYERS_PRODUCTION_API.updateFeedTypes(feedtype_.id,{feed_type_1, unit, unitmeasure, brand}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedFeedType(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteFeedType= feedtype =>{
        LAYERS_PRODUCTION_API.removeFeedTypes(feedtype.id, token['mr-token'])
        .then(()=>props.deletedFeedType(feedtype))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdFeedType();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    
    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                        <Col sm={11} md={11} lg={11}>
                            <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                            <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                            <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                            </Button>
                            </OverlayTrigger>
                        </Col>

                        <Col sm={1} md={1} lg={1}>
                            <CSVLink data={feedtypes} className='text-success'>
                                <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                    <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                            <MUIcons.CloudDownloadRounded fontSize="small"/>
                                    </Button>
                                </OverlayTrigger>
                            </CSVLink>
                        </Col>



                    </Row>


                    <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Feed Type</th>
                                <th>Package</th>
                                <th>Brand</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {feedtypes.map(feedtype=>{
                            return (
                                <tr key={feedtype.id}>
                                    <td>{feedtype.id}</td>
                                    <td>{feedtype.feed_type}</td>
                                    <td>{feedtype.unitmeasure}{feedtype.unit}</td>
                                    <td>{feedtype.brand}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectFeedType(feedtype)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteFeedType(feedtype) } }
                                        />
                                    </td>

                                </tr>
                            ) 
                        })}
                        </tbody>
                </Table>
            </Row>

            
        </Container>

        {/* <h1>{product_.id? 'Eggs': 'Not Eggs'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {feedtype_.id ? 'Edit Feed Type': 'Add Feed Type'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {feedtype_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>

                                <Form.Group className="mb-2" controlId="feedtype">
                                    <Form.Label>Feed Type:</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={feed_type_1 || ''}
                                        onChange={evt => setFeedType(evt.target.value)}
                                        required
                                       
                                    >
                                        <option value=''>Select...</option>
                                        
                                            {
                                            costcategories.map(cost =>{
                                                return (<option key={cost.id} value={cost.id}>{cost.cost_sub_category}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="unit">
                                    <Form.Label>Unit:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Unit of Measure" required
                                        value={unit || ''} onChange={evt => setUnit(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="unitmeasure">
                                    <Form.Label>Package:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Kgs" 
                                        value={unitmeasure || ''} onChange={evt => setUnitMeasure(evt.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="brand">
                                    <Form.Label>Brand:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Brand" 
                                        value={brand|| ''} onChange={evt => setBrand(evt.target.value)}
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
                feedtype_.id?(
                <Button variant="primary"  onClick={updateFeedType}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createFeedType}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {FeedTypes};