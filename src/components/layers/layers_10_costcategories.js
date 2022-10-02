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



function CostCategories(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectCostCategory = costcategory =>{
        props.selectCostCategory(costcategory);
        handleShow();
    }

    const costcategory_ = props.costcategory;
    
    const [cost_category, setCostCategory]=useState();
    const [cost_sub_category, setCostSubCategory]=useState('');



    useEffect(()=>{
        setCostCategory(costcategory_.cost_category);
        setCostSubCategory(costcategory_.cost_sub_category);

    }, [costcategory_])


    const costcategories= props.costcategories && props.costcategories


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


    



    const createPCostCategory = (e) =>{
        handleSubmit (e);
        if(cost_category !== undefined && cost_sub_category !== undefined ){
            if(cost_category !=='' && cost_sub_category !== '' ){
                LAYERS_SALES_EXPENSES_API.addLayersCostCategories({cost_category, cost_sub_category}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newCostCategory(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateCostCategory= costcategory =>{
        handleSubmit (costcategory);
        if(cost_category !== undefined && cost_sub_category !== undefined){
            if(cost_category !=='' && cost_sub_category !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersCostCategories(costcategory_.id,{cost_category, cost_sub_category}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedCostCategory(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteCostCategory= costcategory =>{
        LAYERS_SALES_EXPENSES_API.removeLayersCostCategories(costcategory.id, token['mr-token'])
        .then(()=>props.deletedCostCategory(costcategory))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdCostCategory();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    
    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                    <Col sm={12} md={12} lg={5}>
                        <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>


                    </Row>


                    <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cost Type</th>
                                <th>Cost Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {costcategories.map(costcategory=>{
                            return (
                                <tr key={costcategory.id}>
                                    <td>{costcategory.id}</td>
                                    <td>{costcategory.cost_sub_category}</td>
                                    <td>{costcategory.cost_category}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectCostCategory(costcategory)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteCostCategory(costcategory) } }
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
                <Modal.Title> {costcategory_.id ? 'Edit Cost Category': 'Add Cost Category'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {costcategory_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                            <Form.Group className="mb-2" controlId="costtype">
                                    <Form.Label>Cost Type</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Cost Type" required
                                        value={cost_sub_category || ''} onChange={evt => setCostSubCategory(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="costcategory">
                                    <Form.Label>Cost Category</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Cost Category" required
                                        value={cost_category || ''} onChange={evt => setCostCategory(evt.target.value)}
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
                costcategory_.id?(
                <Button variant="primary"  onClick={updateCostCategory}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createPCostCategory}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {CostCategories};