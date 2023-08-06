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



function Products(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectProduct = product =>{
        props.selectProduct(product);
        handleShow();
    }

    const product_ = props.product;
    
    const [productname, setProduct]=useState();
    const [unit, setUnit]=useState('');


    useEffect(()=>{
        setProduct(product_.productname);
        setUnit(product_.unit);

    }, [product_])


    const products= props.products && props.products


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


    



    const createProduct = (e) =>{
        handleSubmit (e);
        if(productname !== undefined && unit !== undefined ){
            if(productname !=='' && unit !== '' ){
                LAYERS_SALES_EXPENSES_API.addLayersProducts({productname, unit}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newProduct(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateProduct = product =>{
        handleSubmit (product);
        if(productname !== undefined && unit !== undefined){
            if(productname !=='' && unit !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersProducts(product_.id,{productname, unit}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedProduct(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteProduct = product =>{
        LAYERS_SALES_EXPENSES_API.removeLayersProducts(product.id, token['mr-token'])
        .then(()=>props.deletedProduct(product))
        .catch(error => console.log(error))
    }




    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdProduct();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    //Search form
    const searchForm = props.searchForm

    
    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                    <Col sm={12} md={12} lg={10}>
                        <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col sm={12} md={12} lg={2}>{searchForm}</Col>

                    </Row>


                    <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map(product=>{
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.productname}</td>
                                    <td>{product.unit}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectProduct(product)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteProduct(product) } }
                                        />
                                    </td>

                                </tr>
                            ) 
                        })}
                        </tbody>
                </Table>
            </Row>

            {/* <Row>
                {products.map(product=>{

                    return(
                        <Col sm={12} md={6} lg={6} xl={6} className="cardCol">
                            <Card border="primary" className='card'>
                            <Card.Header key={product.id}>{product.id}</Card.Header>
                                <Card.Body>
                                <Card.Title>{product.product}</Card.Title>
                                    <Card.Text>{product.unit} </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )



                })}
            </Row> */}
            
        </Container>

        {/* <h1>{product_.id? 'Eggs': 'Not Eggs'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {product_.id ? 'Edit Product': 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {product_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                            <Form.Group className="mb-2" controlId="product">
                                    <Form.Label>Product</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Product Name" required
                                        value={productname || ''} onChange={evt => setProduct(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="unit">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Unit of Measure" required
                                        value={unit || ''} onChange={evt => setUnit(evt.target.value)}
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
                product_.id?(
                <Button variant="primary"  onClick={updateProduct}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createProduct}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Products};