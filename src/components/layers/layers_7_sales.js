import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Stack,Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function Sales(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectSale = sale =>{
        props.selectSale(sale);
        handleShow();
    }

    const sale_ = props.sale;
    
    const [date, setDate]=useState();
    const [batch, setBatch]=useState('');
    const [product, setProduct]=useState();
    const [customer, setCustomer]=useState();
    const [quantity, setQuantity]=useState();
    const [unitprice, setUnitPrice]=useState();
    const [payment_mode, setPaymentMode]=useState();
    const [staff, setStaff]=useState();


    useEffect(()=>{
        setDate(sale_.date);
        setBatch(sale_.batch);
        setProduct(sale_.product);
        setCustomer(sale_.customer);
        setQuantity(sale_.quantity);
        setUnitPrice(sale_.unitprice);
        setPaymentMode(sale_.payment_mode);
        setStaff(sale_.staff);

    }, [sale_])

    
    const [start_date, setStartDate] = useState()
    const [end_date, setEndDate] = useState()
    const [customer_, setCustomer_] = useState()
    const [paymentstatus, setPaymentStatus] = useState()

    console.log(parseInt(paymentstatus))



    const staffteam = props.staffTeam && props.staffTeam
    const paymentmodes = props.paymentmodes && props.paymentmodes
    const batches_ =props.batches && props.batches
    const birds_data = props.birds && props.birds
    const eggs_production = props.eggsproduction && props.eggsproduction
    const products= props.products && props.products
    const customers = props.customers && props.customers
    const sales_unfiltered = props.sales && props.sales
    // console.log(sales_unfiltered)

    const credit_sales_=props.creditsales && props.creditsales
    // console.log(credit_sales_)

    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    // const batch_last_0 =  parseInt(batches.slice(0).map(x => x.id))
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]


    let sales_filtered_0 = sales_unfiltered.map(c => ({...c,"total_sales_1": c.quantity*c.unitprice}) )
    // console.log(sales_filtered_0)

    let sales_filtered_1= sales_filtered_0.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.date>=start_date && a.date<=end_date ).map(y=>({...y}))
    let sales_filtered_2= sales_filtered_1.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let sales_filtered_3 = sales_filtered_2.filter(c => (customer_===undefined||customer_==='')? c : c.customer_name === customer_).map( w => ({...w}))
    let sales = sales_filtered_3.filter(d => (paymentstatus===undefined||paymentstatus==='')? d : d.payment_mode === parseInt(paymentstatus)).map( z => ({...z}))
    let cash_sales = sales.filter(d => d.payment_mode !=2).map( z => ({...z}))
    console.log(sales)


    const sales_total = sales.reduce(add_sales, 0); // with initial value to avoid when the array is empty
    function add_sales(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }

    const cash_sales_total = cash_sales.reduce(add_cash_sales, 0); // with initial value to avoid when the array is empty
    function add_cash_sales(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }



    const resetTable = () => {
        setStartDate('')
        setEndDate('')
        setBatch('')
        setCustomer_('')
        setPaymentStatus('')
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



    const createSale = (e) =>{
        
        handleSubmit (e);
        if(date !== undefined && batch !== undefined && product !== undefined && customer !== undefined && quantity !== undefined && unitprice !== undefined && payment_mode !== undefined && staff !== undefined){
            if(date !=='' && batch !== '' && product !== '' && customer !== '' && quantity !== '' && unitprice !== '' && payment_mode !== '' && staff !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersSales({date, batch, product, customer, quantity, unitprice, payment_mode, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newSale(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateSale = sale =>{
        handleSubmit (sale);
        if(date !== undefined && batch !== undefined && product !== undefined && customer !== undefined && quantity !== undefined && unitprice !== undefined && payment_mode !== undefined && staff !== undefined){
            if(date !=='' && batch !== '' && product !== '' && customer !== '' && quantity !== '' && unitprice !== '' && payment_mode !== '' && staff !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersSales(sale_.id,{date, batch, product, customer, quantity, unitprice, payment_mode, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedSale(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteSale = sale =>{
        LAYERS_SALES_EXPENSES_API.removeLayersSales(sale.id, token['mr-token'])
        .then(()=>props.deletedSale(sale))
        .catch(error => console.log(error))
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdSale();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    //Pagination

    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const sales_paginated= sales.slice(indexFirstRecord,indexLastRecord )
    // console.log(current_filtered_birds_data)

    const paginate =(pageNumber)=> setCurrentPage(pageNumber)
    

    
    return(

        <div>
            
            <Container fluid>
            <Row>
                    <Col sm={12} md={12} lg={7}>
                    </Col>


                    <Col sm={12} md={12} lg={5}>
                        <Badge pill bg="primary">
                        All Sales: {sales_total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Badge>{' '}
                        <Badge pill bg="success">
                        Cash Sales: {cash_sales_total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Badge>{' '}
                        <Badge pill bg="warning">
                        Credit Sales: {(sales_total-cash_sales_total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Badge>

                    </Col>
                </Row>

                <Row className="tables">
                    <Row>
                    <Col sm={12} md={12} lg={1}>
                        <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>


                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Batch Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Batch</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={batch || ''}
                                    onChange={evt => setBatch(evt.target.value)}
                                >
                                    <option value=''>{batch_default}</option>
                                        {
                                            batches.map(btch =>{
                                                return (<option key={btch.id} value={btch.id}>{btch.batch}</option>)
                                                })
                                        }
                                </Form.Select>
                        </InputGroup>
                        </OverlayTrigger>
                    </Col>

                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Customer Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Customer</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={customer_ || ''}
                                    onChange={evt => setCustomer_(evt.target.value)}
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

                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Payment Status Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Payment</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={paymentstatus || ''}
                                    onChange={evt => setPaymentStatus(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                        {
                                            paymentmodes.map(payment =>{
                                                return (<option key={payment.id} value={payment.id}>{payment.payment_mode}-{payment.name}-{payment.account}</option>)
                                                })
                                        }
                                </Form.Select>
                        </InputGroup>
                        </OverlayTrigger>
                    </Col>



                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Start Date Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text size="sm" >Start</InputGroup.Text>
                            <Form.Control size="sm" type="date" placeholder="Enter Start Date" required
                                value={start_date || ''} onChange={evt => setStartDate(evt.target.value)}
                                />
                        </InputGroup>
                        </OverlayTrigger>
                    </Col>
                    
                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip >Select End Date Filter</Tooltip>}>
                        <InputGroup className="mb-2" size="sm">
                            <InputGroup.Text >End</InputGroup.Text>
                            <Form.Control size="sm" type="date" placeholder="Enter End Date" required
                                value={end_date || ''} onChange={evt => setEndDate(evt.target.value)}
                                />
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
                        <th>Sale ID</th>
                        <th>Sale Date</th>
                        <th>Batch</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Unit</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Sales</th>
                        <th>Payment Mode</th>
                        <th>Staff</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {sales_paginated.map(sale =>{
                        return (
                            <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{sale.date_1}</td>
                                <td>{sale.batch_number }</td>
                                <td>{sale.customer_name}</td>
                                <td>{sale.product_}</td>
                                <td>{sale.unit}</td>
                                <td>{sale.unitprice}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.total_sales_1}</td>
                                <td>{sale.paymentmode}</td>
                                <td>{sale.staff_}</td>


                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectSale(sale)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteSale(sale) } }
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
                        totalRecords={sales.length}
                        paginate={paginate}
                    />
                    </Col>
                </Row>

            </Row>
        </Container>

        {/* <h1>{eggs_.id? 'Eggs': 'Not Eggs'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {sale_.id ? 'Edit Egg Production': 'Add Egg Production'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {sale_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={5} lg={5}>
                                <Form.Group className="mb-2" controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date" required
                                        value={date || ''} onChange={evt => setDate(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="batch">
                                    <Form.Label>Batch</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={batch || ''}
                                        onChange={evt => setBatch(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            batches.map(btch =>{
                                                return (<option key={btch.id} value={btch.id}>{btch.batch}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>


                            </Col>

                            <Col sm={12} md={7} lg={7}>
                                <Form.Group className="mb-2" controlId="staff">
                                    <Form.Label>Staff</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={staff || ''}
                                        onChange={evt => setStaff(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            staffteam.map(staff =>{
                                                return (<option key={staff.id} value={staff.id}>{staff.firstname}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="product">
                                    <Form.Label>Product</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={product || ''}
                                        onChange={evt => setProduct(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            products.map(product =>{
                                                return (<option key={product.id} value={product.id}>{product.productname}-{product.unit}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group className="mb-2" controlId="customer">
                                    <Form.Label>Customer</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={customer || ''}
                                        onChange={evt => setCustomer(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            customers.map(customer =>{
                                                return (<option key={customer.id} value={customer.id}>{customer.customer_name}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Quantity Sold" required
                                        value={quantity || ''} onChange={evt => setQuantity(evt.target.value)}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-2" controlId="unit price">
                                    <Form.Label>Unit Price</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Unit Price" required
                                        value={unitprice || ''} onChange={evt => setUnitPrice(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="paymentmode">
                                    <Form.Label>Payment Mode</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={payment_mode || ''}
                                        onChange={evt => setPaymentMode(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            paymentmodes.map(paymentmode =>{
                                                return (<option key={paymentmode.id} value={paymentmode.id}>{paymentmode.payment_mode}-{paymentmode.name}-{paymentmode.account}</option>)
                                                })
                                            }
                                    </Form.Select>
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
                sale_.id?(
                <Button variant="primary"  onClick={updateSale}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createSale}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Sales};