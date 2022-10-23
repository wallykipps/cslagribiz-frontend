import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import { Login, RestoreFromTrashOutlined } from "@mui/icons-material";
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";




function CreditExpenses(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectCreditExpense = creditexpense =>{
        props.selectCreditExpense(creditexpense);
        handleShow();
    }

    const creditexpense_ = props.creditexpense;

    const [instalment_date, setInstalmentDate]=useState();
    const [expense, setExpense]=useState();
    const [instalment_amount, setInstalmentAmount]=useState();
    const [payment_mode, setPaymentMode]=useState();
    const [payment_source, setPaymentSource]=useState();
    const [paymentby, setPaymentBy]=useState();


    useEffect(()=>{
        setInstalmentDate(creditexpense_.instalment_date);
        setExpense(creditexpense_.expense);
        setInstalmentAmount(creditexpense_.instalment_amount);
        setPaymentMode(creditexpense_.payment_mode);
        setPaymentSource(creditexpense_.payment_source);
        setPaymentBy(creditexpense_.paymentby);

    }, [creditexpense_])


    const [vendor, setVendor]=useState();
    const [batch, setBatch]=useState('');


    const resetTable = () => {
        setBatch('')
        setVendor('')
        setExpense('')
    }

    const staffteam = props.staffTeam && props.staffTeam
    const paymentmodes = props.paymentmodes && props.paymentmodes
    const batches_ =props.batches && props.batches
    const expenses_unfiltered = props.expenses && props.expenses
    const vendors = props.vendors && props.vendors
    const credit_expenses_unfiltered = props.creditexpenses && props.creditexpenses

    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]


    //Filtering the sales table concurrently with credit sales table
    let expenses_0= expenses_unfiltered.filter(e => (batch===undefined||batch==='')? (e.batch ===batch_last) : (e.batch ===parseInt(batch)) ).map( f => ({...f}))
    let expenses_1= expenses_0.filter(a => (vendor===undefined||vendor==='')? a : a.vendor===parseInt(vendor)).map( b => ({...b}))
    let expenses_2 = expenses_1.filter(c=>c.payment_type===2).map(c=>({...c}))//filter credit sales only
    let expenses = expenses_2.filter(g => (expense===undefined|| expense==='')? g  : (g.id ===parseInt(expense)) ).map( h => ({...h}))
    // console.log(expenses)

    //Sum total of credit sales
    const credit_expenses_total = expenses.reduce(add, 0); // with initial value to avoid when the array is empty
    // console.log(credit_expenses_total)
    function add(accumulator, a) {
        return accumulator + parseInt(a.quantity*a.unitprice);
    }

    //Filtering credit sales table
    let credit_expenses_filtered_1= credit_expenses_unfiltered.filter(e => (batch===undefined||batch==='')? (e.batch_id ===batch_last) : (e.batch_id ===parseInt(batch)) ).map( f => ({...f}))
    let credit_expenses_1 = credit_expenses_filtered_1.filter(g => (vendor===undefined||vendor==='')? g : (g.vendor_id ===parseInt(vendor)) ).map( h => ({...h}))
    let credit_expenses = credit_expenses_1.filter(g => (expense===undefined||expense==='')? g  : (g.cost_id ===parseInt(expense)) ).map( h => ({...h}))


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
    let credit_expenses_acc = 0;
    let credit_expenses_cumsum = credit_expenses.map( x => ({...x,"instalment_total": credit_expenses_acc+=parseInt(x.instalment_amount)}))
    let credit_expenses_cumsum_ = credit_expenses_cumsum.map( y => ({...y,"balance": credit_expenses_total - y.instalment_total}))
    let credit_expenses_cumsum_1 = credit_expenses_cumsum_.sort((a, b) => sortTable===true? new Date(b.instalment_date) - new Date(a.instalment_date):new Date(a.instalment_date) - new Date(b.instalment_date))
    
    const credit_balance =  credit_expenses_cumsum_1.slice(-1).map(x => x.balance)
    // console.log(credit_balance[0])
    let credit_expenses_instalments = credit_expenses_cumsum.slice(-1).map(x => x.instalment_total)
    // console.log(credit_sales_instalments[0])

    
    // let expenses_3 = expenses_1.map( h => ({...h, "credit_balance": parseInt(h.quantity*h.unitprice)-credit_expenses_instalments[0]}))
    let credit_expenses_sum = credit_expenses.map(d=>({...d, "instalment_total": parseInt(d.instalment_amount)}))
    // console.log(credit_expenses_sum)

    //Group by and sum
    let credit_expenses_sum_1 = credit_expenses_sum.reduce((prev, next) =>{
        if (next.expense in prev) {
            prev[next.expense].instalment_total += next.instalment_total;
        } else {
           prev[next.expense] = next;
        }
        return prev;
      }, {});
      
    //join two arrays
    let credit_expenses_sum_3 = Object.keys(credit_expenses_sum_1 ).map(id => credit_expenses_sum_1[id]);
    //   console.log(credit_expenses_sum_3)


    const mergeById = (expenses, credit_expenses_sum_3) =>
    expenses.map(itm => ({
        ...credit_expenses_sum_3.find((item) => (item.expense === itm.id) && item),
        ...itm
    }));

    let credit_expenses_sum_4 = mergeById(expenses, credit_expenses_sum_3)
    // console.log(credit_sales_sum_4);


    let credit_expenses_sum_5 = credit_expenses_sum_4.map(x=>({...x, "balance":parseFloat(x.total_cost)-parseFloat(x.instalment_total)}))
    let credit_expenses_sum_6=credit_expenses_sum_5.filter(a=>(a.balance===0)? '': a).map(b=>({...b}))
    // console.log(credit_expenses_sum_5);
    // console.log(credit_expenses_sum_6);


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


    const createCreditExpense = (e)=>{
        handleSubmit (e)
        if(instalment_date !== undefined && expense !== undefined && instalment_amount !== undefined && payment_mode !== undefined && payment_source !== undefined && paymentby !== undefined ){
            if(instalment_date !=='' && expense !== '' && instalment_amount !== '' && payment_mode !== '' && payment_source !== ''  && paymentby !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersCreditExpenses({instalment_date, expense, instalment_amount, payment_mode, payment_source,paymentby}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newCreditExpense (resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;

    }


    const updateCreditExpense = creditexpense=>{
        handleSubmit (creditexpense)
        if(instalment_date !== undefined && expense !== undefined && instalment_amount !== undefined && payment_mode !== undefined && payment_source !== undefined && paymentby !== undefined ){
            if(instalment_date !=='' && expense !== '' && instalment_amount !== '' && payment_mode !== '' && payment_source !== ''  && paymentby !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersCreditExpenses(creditexpense_.id,{instalment_date, expense, instalment_amount, payment_mode, payment_source,paymentby}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedCreditExpense (resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;



    }

    const deleteCreditExpense = creditexpense =>{
        LAYERS_SALES_EXPENSES_API.removeLayersCreditExpenses(creditexpense.id, token['mr-token'])
        .then(()=>props.deletedCreditExpense (creditexpense))
        .catch(error => console.log(error))

    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.createdCreditExpense();
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    //Pagination
   
    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const credit_expenses_paginated= credit_expenses_cumsum_1.slice(indexFirstRecord,indexLastRecord )

    const paginate =(pageNumber)=> setCurrentPage(pageNumber)

    
    return(

        <div>
            <Container fluid>

                <Row>
                    <Col sm={12} md={12} lg={8}>
                    </Col>


                    <Col sm={12} md={12} lg={4}>
                    <Badge pill bg="danger">
                        Total Credit: {credit_expenses_total}
                        </Badge>{' '}
                        <Badge pill bg="success">
                        Paid: {credit_expenses_instalments[0]}
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
                        <OverlayTrigger overlay={<Tooltip>Select Vendor Filter</Tooltip>}>
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
                                                return (<option key={vendor.id} value={vendor.id}>{vendor.vendor}</option>)
                                                })
                                        }
                                </Form.Select>
                        </InputGroup>
                        </OverlayTrigger>
                    </Col>

                    <Col sm={12} md={12} lg={2}>
                        <OverlayTrigger overlay={<Tooltip>Select Cost ID Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Cost ID</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={expense || ''}
                                    onChange={evt => setExpense(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                        {
                                            expenses.map(creditexpense =>{
                                                return (<option key={creditexpense.id} value={creditexpense.id}>{creditexpense.id}</option>)
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
                        <th>Cost ID</th>
                        <th>Purchase Date</th>
                        <th>Batch</th>
                        <th>Vendor</th>
                        <th>Cost Category</th>
                        <th>Cost Details</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Cost</th>
                        <th>Original Payment Mode</th>
                        <th> Instalment Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                                {sortTable===true?
                                    <MUIcons.ArrowDropUpTwoTone fontSize="medium" onClick={sortByDate} />: 
                                    <MUIcons.ArrowDropDownTwoTone fontSize="medium" onClick={sortByDate} />
                                }
                            </OverlayTrigger>
                        </th>
                        <th>Instalment Payment Mode</th>
                        <th>Charged Batch</th>
                        <th>Instalment Amount</th>
                        <th>Instalment Total</th>
                        <th>Balance</th>
                        <th>Recipient</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {credit_expenses_paginated.map(creditexpense =>{
                        return (
                            <tr key={creditexpense.id}>
                                <td>{creditexpense.cost_id}</td>
                                <td>{creditexpense.purchase_date}</td>
                                <td>{creditexpense.batch }</td>
                                <td>{creditexpense.vendor}</td>
                                <td>{creditexpense.cost_category}</td>
                                <td>{creditexpense.cost_details}</td>
                                <td>{creditexpense.quantity}</td>
                                <td>{creditexpense.unit_price}</td>
                                <td>{creditexpense.total_cost}</td>
                                <td>{creditexpense.paymentmode}</td>
                                <td>{creditexpense.instalment_date_1}</td>
                                <td>{creditexpense.paymentmode_}</td>
                                <td>{creditexpense.paymentsource}</td>
                                <td>{creditexpense.instalment_amount}</td>
                                <td>{creditexpense.instalment_total}</td>
                                <td>{creditexpense.balance}</td>
                                <td>{creditexpense.staff}</td>
                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectCreditExpense(creditexpense)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteCreditExpense(creditexpense) } }
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
                        totalRecords={credit_expenses_cumsum_1.length}
                        paginate={paginate}
                    />
                    </Col>
                </Row>

            </Row>
        </Container>

        {/* <h1>{btch_.id? 'Working': 'Not Working'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {creditexpense_.id ? 'Edit Credit Sales': 'Add Credit Sales'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {creditexpense_ ? (
                    <div>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="instalmentdate">
                                    <Form.Label>Date of Instalment</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date" required
                                        value={instalment_date || ''} onChange={evt => setInstalmentDate(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="vendor">
                                    <Form.Label>Select Vendor</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={vendor || ''}
                                        onChange={evt => setVendor(evt.target.value)}
                                        disabled={creditexpense_.id ? true : false}
                                       
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            vendors.map(vendor =>{
                                                return (<option key={vendor.id} value={vendor.id}>{vendor.vendor}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="sale">
                                    <Form.Label>Select Expense</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={expense || ''}
                                        onChange={evt => setExpense(evt.target.value)}
                                        disabled={creditexpense_.id ? true : false}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            credit_expenses_sum_6.map(cost =>{
                                                // return (<option key={cost.id} value={cost.id}>{cost.id}</option>)
                                                return (<option key={cost.id} value={cost.id}>{cost.payment_mode}-({cost.id})-({cost.purchase_date})-({cost.supplier}-{cost.expense_category}-{cost.expense_details}-{cost.quantity}-{cost.unitprice}-{cost.total_cost})</option>)
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

                                <Form.Group className="mb-2" controlId="paymentsource">
                                    <Form.Label>Select Payment Source</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={payment_source || ''}
                                        onChange={evt => setPaymentSource(evt.target.value)}
                                       
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            batches.map(batch =>{
                                                return (<option key={batch.id} value={batch.id}>{batch.batch}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="recipient">
                                    <Form.Label>Payment By</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={paymentby || ''}
                                        onChange={evt => setPaymentBy(evt.target.value)}
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
                creditexpense_.id?(
                <Button variant="primary"  onClick={updateCreditExpense}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createCreditExpense}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {CreditExpenses};