import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
// import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import { Login, RestoreFromTrashOutlined } from "@mui/icons-material";
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";




function CreditSales(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectCreditSale = creditsale =>{
        props.selectCreditSale(creditsale);
        handleShow();
    }

    const creditsale_ = props.creditsale;
    // console.log(creditsale_)
    
    const [instalment_date, setInstalmentDate]=useState();
    const [sale, setSale]=useState();
    const [instalment_amount, setInstalmentAmount]=useState();
    const [payment_mode, setPaymentMode]=useState();
    const [recipient, setRecipient]=useState();

    

    useEffect(()=>{
        setInstalmentDate(creditsale_.instalment_date);
        setSale(creditsale_.sale); 
        setInstalmentAmount(creditsale_.instalment_amount);
        setPaymentMode(creditsale_.payment_mode);
        setRecipient(creditsale_.recipient);

    }, [creditsale_])

    const [customer, setCustomer]=useState();
    const [batch, setBatch]=useState('');
    // const [customer_, setCustomer_]=useState();
    const [saleID, setSaleID]=useState();


    const resetTable = () => {
        setBatch('')
        setCustomer('')
        setSaleID('')
        setSale('')
    }

    const staffteam = props.staffTeam && props.staffTeam
    const paymentmodes = props.paymentmodes && props.paymentmodes
    const batches_ =props.batches && props.batches
    
    const sales_unfiltered = props.sales && props.sales
    const customers = props.customers && props.customers
    const credit_sales_unfiltered = props.creditsales && props.creditsales
    // const customers = [...new Set(sales_unfiltered)]
    // console.log(sales_unfiltered)
    // console.log(credit_sales_unfiltered)

    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    // console.log(batches)

    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]
    
    let batchFilterSales = props.batchFilterSales
    let setBatchFilterSales = props.setBatchFilterSales
    let batch_filter = batches_1[batchFilterSales-1]

    // console.log(batch_filter)



    //Filtering the sales table concurrently with credit sales table
    // let sales_0= sales_unfiltered.filter(e => (batch===undefined||batch==='')? (e.batch ===batch_last) : (e.batch ===parseInt(batch)) ).map( f => ({...f}))
    let sales_1=sales_unfiltered.filter(a => (customer===undefined||customer==='')? a : a.customer===parseInt(customer)).map( b => ({...b}))
    let sales_2 = sales_1.filter(c=>c.payment_mode===2).map(c=>({...c}))//filter credit sales only
    let sales = sales_2.filter(g => (sale===undefined||sale==='')? g  : (g.id ===parseInt(sale)) ).map( h => ({...h}))

    //Sum total of credit sales
    const credit_sales_total = sales.reduce(add, 0); // with initial value to avoid when the array is empty
    // console.log(credit_sales_total)
    function add(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }

    //Filtering credit sales table
    // let credit_sales_filtered_1= credit_sales_unfiltered.filter(e => (batch===undefined||batch==='')? (e.batch_id ===batch_last) : (e.batch_id ===parseInt(batch)) ).map( f => ({...f}))
    let credit_sales_filtered_0 = credit_sales_unfiltered.filter(e=>(e.batch_id === parseInt(batchFilterSales))).map( f => ({...f}))
    let credit_sales_1 = credit_sales_filtered_0.filter(g => (customer===undefined||customer==='')? g : (g.customer_id ===parseInt(customer)) ).map( h => ({...h}))
    let credit_sales = credit_sales_1.filter(g => (sale===undefined||sale==='')? g  : (g.sale_id ===parseInt(sale)) ).map( h => ({...h}))


    //Sort tables
    const [sortTable, setsortTable]= useState(true)
    const sortByDate= () => {
        if (sortTable===true) {
            setsortTable(false)
    
        }
        else {
            setsortTable(true) 
    
        }return
        
    }
    

   //Running sum of credit sales and running balance
    let credit_sales_acc = 0;
    let credit_sales_cumsum = credit_sales.map( x => ({...x,"instalment_total": credit_sales_acc+=parseFloat(x.instalment_amount)}))
    let credit_sales_cumsum_0 = credit_sales_cumsum.map( y => ({...y,"balance": credit_sales_total - y.instalment_total}))
    // let credit_sales_cumsum_1 = credit_sales_cumsum_0.sort((a, b) => sortTable===true? new Date(b.instalment_date) - new Date(a.instalment_date):new Date(a.instalment_date) - new Date(b.instalment_date))
    let credit_sales_cumsum_1 = credit_sales_cumsum_0.sort((a, b) => new Date(a.instalment_date) - new Date(b.instalment_date))
    
    const credit_balance =  credit_sales_cumsum_1.slice(-1).map(x => x.balance)
    // console.log(credit_balance[0])
    let credit_sales_instalments = credit_sales_cumsum.slice(-1).map(x => x.instalment_total)
    // console.log(credit_sales_instalments[0])

  


    let sales_3 = sales_1.map( h => ({...h, "credit_balance": parseFloat(h.quantity*h.unitprice)-credit_sales_instalments[0]}))
    let credit_sales_sum = credit_sales.map(d=>({...d, "instalment_total": parseFloat(d.instalment_amount)}))

    
    
    
    //Group by and sum
    let credit_sales_sum_1 = credit_sales_sum.reduce((prev, next) =>{
        if (next.sale in prev) {
            prev[next.sale].instalment_total += next.instalment_total;
        } else {
           prev[next.sale] = next;
        }
        return prev;
      }, {});
      
    
      //join two arrays
    let credit_sales_sum_3 = Object.keys(credit_sales_sum_1 ).map(id => credit_sales_sum_1[id]);
    //   console.log(credit_sales_sum_3)


    const mergeById = (sales, credit_sales_sum_3) =>
    sales.map(itm => ({
        ...credit_sales_sum_3.find((item) => (item.sale === itm.id) && item),
        ...itm
    }));

    let credit_sales_sum_4 = mergeById(sales, credit_sales_sum_3)
    // console.log(credit_sales_sum_4);


    let credit_sales_sum_5 = credit_sales_sum_4.map(x=>({...x, "balance":x.total_sales-x.instalment_total}))
    let credit_sales_sum_6=credit_sales_sum_5.filter(a=>(a.balance===0)? '': a).map(b=>({...b}))
    // console.log(credit_sales_sum_5);
    // console.log(credit_sales_sum_6);


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


    const createCreditSale = (e)=>{
        handleSubmit (e)
        if(instalment_date !== undefined && sale !== undefined && instalment_amount !== undefined && payment_mode !== undefined && recipient !== undefined ){
            if(instalment_date !=='' && sale !== '' && instalment_amount !== '' && payment_mode !== '' && recipient !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersCreditSales({instalment_date, sale, instalment_amount, payment_mode, recipient}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newCreditSale (resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;

    }


    const updateCreditSale = creditsale=>{
        handleSubmit (creditsale)
        if(instalment_date !== undefined && sale !== undefined && instalment_amount !== undefined && payment_mode !== undefined && recipient !== undefined ){
            if(instalment_date !=='' && sale !== '' && instalment_amount !== '' && payment_mode !== '' && recipient !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersCreditSales(creditsale_.id,{instalment_date, sale, instalment_amount, payment_mode, recipient}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedCreditSale (resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;



    }

    const deleteCreditSale = creditsale =>{
        LAYERS_SALES_EXPENSES_API.removeLayersCreditSales(creditsale.id, token['mr-token'])
        .then(()=>props.deletedCreditSale (creditsale))
        .catch(error => console.log(error))

    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.createdCreditSale();
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    //Pagination
    const [recordsPerPage, setRecordsPerPage]= useState(10)
    const [currentPage, setCurrentPage]= useState(1)
    const [active, setActive] = useState(1)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const credit_sales_paginated= credit_sales_cumsum_1.slice(indexFirstRecord,indexLastRecord )
    const pages=Math.ceil(credit_sales_cumsum_1.length/recordsPerPage)

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

                <Row>
                    <Col sm={12} md={12} lg={8}>
                    </Col>


                    <Col sm={12} md={12} lg={4}>
                    <Badge pill bg="danger">
                        Total Credit: {credit_sales_total}
                        </Badge>{' '}
                        <Badge pill bg="success">
                        Paid: {credit_sales_instalments[0]}
                        </Badge>{' '}
                        <Badge pill bg="warning" text="dark">
                        Balance: {credit_balance[0]}
                        </Badge>{' '}
                    </Col>
                </Row>


                <Row className="tables">
                    <Row>
                    <Col>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                            Add</Button>
                    </Col>

                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Batch Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Batch</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={batch_filter || ''}
                                    onChange={evt => setBatchFilterSales(evt.target.value)}
                                >
                                    <option value=''>{batch_filter}</option>
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
                                    value={customer || ''}
                                    onChange={evt => setCustomer(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                        {
                                            customers.map(customer =>{
                                                return (<option key={customer.id} value={customer.id}>{customer.customer_name}</option>)
                                                })
                                        }
                                </Form.Select>
                        </InputGroup>
                        </OverlayTrigger>
                    </Col>

                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Sale ID Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Sale ID</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={sale || ''}
                                    onChange={evt => setSale(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                        {
                                            sales.map(creditsale =>{
                                                return (<option key={creditsale.id} value={creditsale.id}>{creditsale.id}</option>)
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
                        <th>Sale ID</th>
                        <th>Sale Date</th>
                        <th>Batch</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Sales</th>
                        <th>Original Payment Mode</th>
                        <th> Instalment Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                                {/* {sortTable===true?

                                    <MUIcons.ArrowDropUpTwoTone fontSize="medium" onClick={sortByDate} />: 
                                    <MUIcons.ArrowDropDownTwoTone fontSize="medium" onClick={sortByDate} />
                                
                                } */}

                                <MUIcons.ArrowDropUpTwoTone fontSize="medium" onClick={sortByDate} />
                            </OverlayTrigger>
                        </th>
                        <th>Instalment Payment Mode</th>
                        <th>Instalment Amount</th>
                        <th>Instalment Total</th>
                        <th>Balance</th>
                        <th>Recipient</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {credit_sales_paginated.map(creditsale =>{
                        return (
                            <tr key={creditsale.id}>
                                <td>{creditsale.sale_id}</td>
                                <td>{creditsale.date}</td>
                                <td>{creditsale.batch }</td>
                                <td>{creditsale.customer}</td>
                                <td>{creditsale.product}</td>
                                <td>{creditsale.quantity}</td>
                                <td>{creditsale.total_sales}</td>
                                <td>{creditsale.paymentmode}</td>
                                <td>{creditsale.instalment_date_1}</td>
                                <td>{creditsale.paymentmode_}</td>
                                <td>{creditsale.instalment_amount}</td>
                                <td>{creditsale.instalment_total}</td>
                                <td>{creditsale.balance}</td>
                                <td>{creditsale.staff}</td>
                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectCreditSale(creditsale)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteCreditSale(creditsale) } }
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
                        totalRecords={credit_sales_cumsum_1.length}
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

        {/* <h1>{btch_.id? 'Working': 'Not Working'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {creditsale_.id ? 'Edit Credit Sales': 'Add Credit Sales'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {creditsale_ ? (
                    <div>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="instalmentdate">
                                    <Form.Label>Date of Instalment</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date" required
                                        value={instalment_date || ''} onChange={evt => setInstalmentDate(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="customer">
                                    <Form.Label>Select Customer</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={customer || ''}
                                        onChange={evt => setCustomer(evt.target.value)}
                                        disabled={creditsale_.id ? true : false}
                                       
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            customers.map(customer =>{
                                                return (<option key={customer.id} value={customer.id}>{customer.customer_name}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="sale">
                                    <Form.Label>Select Sale</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={sale || ''}
                                        onChange={evt => setSale(evt.target.value)}
                                        disabled={creditsale_.id ? true : false}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            credit_sales_sum_6.map(sale =>{
                                                // return (<option key={sale.id} value={sale.id}>{sale.id}</option>)
                                                return (<option key={sale.id} value={sale.id}>{sale.paymentmode}-({sale.id})-({sale.date})-({sale.customer_name}-{sale.product_}-{sale.unit}-{sale.quantity}-{sale.unitprice}-{sale.total_sales})</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="balance">
                                    <Form.Label>Balance ({credit_balance || ''})</Form.Label>
                                </Form.Group>


                               
                                <Form.Group className="mb-2" controlId="instalmentamount">
                                    <Form.Label>Instalment Amount</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Amount" required
                                        value={instalment_amount || ''} onChange={evt => setInstalmentAmount(evt.target.value)}
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

                                <Form.Group className="mb-2" controlId="recipient">
                                    <Form.Label>Recipient</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={recipient || ''}
                                        onChange={evt => setRecipient(evt.target.value)}
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
                creditsale_.id?(
                <Button variant="primary"  onClick={updateCreditSale}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createCreditSale}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {CreditSales};