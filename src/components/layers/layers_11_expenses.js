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



function Expenses(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectExpense = expense =>{
        props.selectExpense(expense);
        handleShow();
    }

    const expense_ = props.expense;
    // console.log(expense_)

    
    const [purchase_date, setPurchaseDate]=useState();
    const [batch, setBatch]=useState();
    const [vendor, setVendor]=useState();
    const [cost_category, setCostCategory]=useState();
    const [expense_details, setExpenseDetails]=useState();
    const [unit, setUnit]=useState();
    const [quantity, setQuantity]=useState();
    const [unitprice, setUnitPrice]=useState();
    const [payment_type, setPaymentType]=useState();
    const [paymentsource, setPaymentSource]=useState();
    const [staff, setStaff]=useState();

    useEffect(()=>{
        setPurchaseDate(expense_.purchase_date);
        setBatch(expense_.batch);
        setVendor(expense_.vendor);
        setCostCategory(expense_.cost_category);
        setExpenseDetails(expense_.expense_details);
        setUnit(expense_.unit);
        setQuantity(expense_.quantity);
        setUnitPrice(expense_.unitprice);
        setPaymentType(expense_.payment_type);
        setPaymentSource(expense_.paymentsource);
        setStaff(expense_.staff);

    }, [expense_])

    // console.log(cost_category)
    // console.log(unit)

    
    const [start_date, setStartDate] = useState()
    const [end_date, setEndDate] = useState()
    const [vendor_, setVendor_] = useState()
    const [paymentstatus, setPaymentStatus] = useState()


    const staffteam = props.staffTeam && props.staffTeam
    const paymentmodes = props.paymentmodes && props.paymentmodes
    const batches_ =props.batches && props.batches
    const costcategories= props.costcategories && props.costcategories
    const feedtypes = props.feedtypes && props.feedtypes
    const vendors = props.vendors && props.vendors
    const expenses_unfiltered = props.expenses && props.expenses

    
    
    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    let feedtypes_1 = feedtypes.filter(a=>a.id!=1).map(b=>({...b}))
    // console.log(feedtypes_1)

    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]

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
    


    let expenses_filtered_1= expenses_unfiltered.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.purchase_date>=start_date && a.purchase_date<=end_date ).map(y=>({...y}))
    let expenses_filtered_2= expenses_filtered_1.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let expenses_filtered_3 = expenses_filtered_2.filter(c => (vendor_===undefined||vendor_==='')? c : c.supplier === vendor_).map( w => ({...w}))
    let expenses_ = expenses_filtered_3.filter(d => (paymentstatus===undefined||paymentstatus==='')? d : d.payment_mode === paymentstatus).map( z => ({...z}))
    let expenses = expenses_.sort((a, b) => sortTable===true? new Date(b.purchase_date) - new Date(a.purchase_date):new Date(a.purchase_date) - new Date(b.purchase_date))



    const resetTable = () => {
        setStartDate('')
        setEndDate('')
        setBatch('')
        setVendor_('')
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



    const createExpense = (e) =>{
        
        handleSubmit (e);

        if(purchase_date !== undefined && batch !== undefined && cost_category !== undefined && vendor !== undefined && expense_details !== undefined && quantity !== undefined && unitprice !== undefined && payment_type !== undefined && paymentsource !== undefined && staff !== undefined){
            if(purchase_date !=='' && batch !== '' && cost_category !== '' && vendor !== '' && expense_details !== ''  && quantity !== '' && unitprice !== '' && payment_type !== '' && paymentsource !== '' && staff !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersExpenses({purchase_date, batch,cost_category, vendor,expense_details ,unit, quantity, unitprice, payment_type, paymentsource, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newExpense(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateExpense = expense =>{
        handleSubmit (expense);
        if(purchase_date !== undefined && batch !== undefined && cost_category !== undefined && vendor !== undefined && expense_details !== undefined  && quantity !== undefined && unitprice !== undefined && payment_type !== undefined && paymentsource !== undefined && staff !== undefined){
            if(purchase_date !=='' && batch !== '' && cost_category !== '' && vendor !== '' && expense_details !== '' && quantity !== '' && unitprice !== '' && payment_type !== '' && paymentsource !== '' && staff !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersExpenses(expense_.id,{purchase_date, batch,cost_category, vendor,expense_details ,unit, quantity, unitprice, payment_type, paymentsource, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedExpense(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteExpense = expense =>{
        LAYERS_SALES_EXPENSES_API.removeLayersExpenses(expense.id, token['mr-token'])
        .then(()=>props.deletedExpense(expense))
        .catch(error => console.log(error))
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdExpense();
        setShow(false);
        setValidated(false);
        
        
    }
    const handleShow = () => {
        setShow(true);
        setUnit(1)
    }

    //Pagination
    const [recordsPerPage, setRecordsPerPage]= useState(10)
    const [currentPage, setCurrentPage]= useState(1)
    const [active, setActive] = useState(1)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const expenses_paginated= expenses.slice(indexFirstRecord,indexLastRecord)
    const pages=Math.ceil(expenses.length/recordsPerPage)

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
                        <OverlayTrigger overlay={<Tooltip>Select Vendor Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Vendor</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={vendor_ || ''}
                                    onChange={evt => setVendor_(evt.target.value)}
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
                                                return (<option key={payment.id} value={payment.payment_mode}>{payment.payment_mode}</option>)
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
                        <th>Cost ID</th>
                        <th> Purchase Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                                {sortTable===true?
                                    <MUIcons.ArrowDropUpTwoTone fontSize="medium" onClick={sortByDate} />: 
                                    <MUIcons.ArrowDropDownTwoTone fontSize="medium" onClick={sortByDate} />
                                }
                            </OverlayTrigger>
                        </th>
                        <th>Batch</th>
                        <th>Vendor</th>
                        <th>Cost Category</th>
                        <th>Expense Details</th>
                        <th>Unit Price</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Total Expenses</th>
                        <th>Payment Mode</th>
                        <th>Paid by Batch</th>
                        <th>Staff</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {expenses_paginated.map(cost =>{
                        return (
                            <tr key={cost.id}>
                                <td>{cost.id}</td>
                                <td>{cost.purchase_date_1}</td>
                                <td>{cost.payment_point}</td>
                                <td>{cost.supplier}</td>
                                <td>{cost.expense_category}</td>
                                <td>{cost.expense_details}</td>
                                <td>{cost.unitprice}</td>
                                <td>{cost.unitmeasure_}{cost.unit_}</td>
                                <td>{cost.quantity}</td>
                                <td>{cost.unitprice*cost.quantity}</td>
                                <td>{cost.payment_mode}</td>
                                <td>{cost.payment_source}</td>
                                <td>{cost.staff_}</td>
                                {/* <td>{cost.expense_category==='Feeds-Chick Mash'?1:cost.expense_category==='Feeds-Growers Mash'?1:cost.expense_category==='Feeds-Layers Mash'?1:2}</td> */}


                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectExpense(cost)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteExpense(cost) } }
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
                        totalRecords={expenses.length}
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
                <Modal.Title> {expense_.id ? 'Edit Expense': 'Add Expense'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {expense_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={5} lg={5}>
                                <Form.Group className="mb-2" controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date" required
                                        value={purchase_date || ''} onChange={evt => setPurchaseDate(evt.target.value)}
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

                                <Form.Group className="mb-2" controlId="paymentmode">
                                    <Form.Label>Payment Mode</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={payment_type || ''}
                                        onChange={evt => setPaymentType(evt.target.value)}
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

                                <Form.Group className="mb-2" controlId="vendor">
                                    <Form.Label>Vendor</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={vendor || ''}
                                        onChange={evt => setVendor(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            vendors.map(vendor =>{
                                                return (<option key={vendor.id} value={vendor.id}>{vendor.vendor}</option>)
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

                                <Form.Group className="mb-2" controlId="paymentpoint">
                                    <Form.Label>Paid By Batch</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={paymentsource || ''}
                                        onChange={evt => setPaymentSource(evt.target.value)}
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

                                <Form.Group className="mb-2" controlId="costcategory">
                                    <Form.Label>Cost Category</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={cost_category || ''}
                                        onChange={evt => setCostCategory(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            costcategories.map(costcategory =>{
                                                return (<option key={costcategory.id} value={costcategory.id}>{costcategory.cost_category}-{costcategory.cost_sub_category}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="expensedetails">
                                    <Form.Label>Cost Details</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Expenses Details" required
                                        value={expense_details || ''} onChange={evt => setExpenseDetails(evt.target.value)}
                                        />
                                </Form.Group>



                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="staff">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={unit || ''}
                                        onChange={evt => setUnit(evt.target.value)}
                                        required={(parseInt(cost_category)!=1?parseInt(cost_category)!=2?parseInt(cost_category)!=3?false:true:true:true)}
                                        disabled={(parseInt(cost_category)!=1?parseInt(cost_category)!=2?parseInt(cost_category)!=3?true:false:false:false)}
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            feedtypes_1.map(feedtype =>{
                                                return (<option key={feedtype.id} value={feedtype.id}>{feedtype.feed_type}-{feedtype.brand}-{feedtype.unitmeasure} kgs-{feedtype.unit}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                            
                            </Col>


                        </Row>

                        <Row>
                            <Col>

                                <Form.Group className="mb-2" controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Quantity Sold" required
                                        value={quantity || ''} onChange={evt => setQuantity(evt.target.value)}
                                    />
                                </Form.Group>

                            </Col>
                            <Col>
                                                            
                            <Form.Group className="mb-2" controlId="unit price">
                                    <Form.Label>Unit Price</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Unit Price" required
                                        value={unitprice || ''} onChange={evt => setUnitPrice(evt.target.value)}
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
                expense_.id?(
                <Button variant="primary"  onClick={updateExpense}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createExpense}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Expenses};