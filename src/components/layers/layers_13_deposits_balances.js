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
import { ConstructionOutlined, Login, RestoreFromTrashOutlined } from "@mui/icons-material";
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";




function DepositsBalances(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectDeposit = deposit =>{
        props.selectDeposit(deposit);
        handleShow();
    }

    const deposit_ = props.deposit;

    const [deposit_date, setDepositDate]=useState();
    const [batch, setBatch]=useState();
    const [deposit_amount, setDepositAmount]=useState();
    const [credit_ac, setCreditAccount]=useState();
    const [debit_ac, setDebitAccount]=useState();
    const [cash_balance, setCashBalance]=useState();
    const [staff, setStaff]=useState();

    useEffect(()=>{
        setDepositDate(deposit_.deposit_date);
        setBatch(deposit_.batch); 
        setDepositAmount(deposit_.deposit_amount);
        setCreditAccount(deposit_.credit_ac);
        setDebitAccount(deposit_.debit_ac);
        setCashBalance(deposit_.cash_balance);
        setStaff(deposit_.staff);

    }, [deposit_])


    const [batch_, setBatch_]=useState('');
    const [bank_type, setBankType]=useState();
    const banktype_ = (bank_type===undefined||bank_type==='')?'Cash':bank_type.split("-");
    let banktype = banktype_[0];
    
    const bank_type_default='Cash-Petty Cash-01'


    const resetTable = () => {
        setBatch_('')
        setBankType()
    }

    const staffteam = props.staffTeam && props.staffTeam
    const paymentmodes = props.paymentmodes && props.paymentmodes
    const batches_ =props.batches && props.batches
    const bank=props.banking && props.banking
    const deposits_ = props.deposits && props.deposits
   
   
    const sales_ = props.sales && props.sales
    const customers = props.customers && props.customers
    const credit_sales_ = props.creditsales && props.creditsales
    const expenses_ = props.expenses && props.expenses
    const credit_expenses_ = props.creditexpenses && props.creditexpenses

    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]
    

    let batchFilterDeposits=props.batchFilterDeposits
    let setBatchFilterDeposits=props.setBatchFilterDeposits
    let batchFilterSales = props.batchFilterSales
    let setBatchFilterSales = props.setBatchFilterSales
    let batchFilterExpenses = props.batchFilterExpenses
    let setBatchFilterExpenses = props.setBatchFilterExpenses
    let batch_filter = batches_1[batchFilterDeposits-1]


    //Sum total of deposits
    // let deposits_0 = deposits_.filter(e => (batch_===undefined||batch_==='')? (e.batch ===batch_last) : (e.batch ===parseInt(batch_))).map( f => ({
    let deposits_0 = deposits_.map( f => ({
        ...f, 
        deposit_amount_chk:f.debit_ac_details===bank_type?true:false,
        deposit_amount:f.debit_ac_details===bank_type? f.deposit_amount: f.deposit_amount<0?f.deposit_amount:-f.deposit_amount,
        sales:0, 
        costs:0,  
        debit_ac_:f.debit_ac_details,
        credit_ac_:f.credit_ac_details, 
        id_:'cash_deposits'
    }))

    // console.log(deposits_0)

    let deposits=deposits_0.filter(a => (bank_type===undefined||bank_type==='')? a.debit_ac===bank_type_default : a.debit_ac===parseInt(bank_type)).map( b => ({...b}))
  
    //Sales
    // let sales_0= sales_.filter(e => (batch_===undefined||batch_==='')? (e.batch ===batch_last) : (e.batch ===parseInt(batch_)) ).map( f => ({...f}))
    let sales_1 = sales_.filter(c=>c.payment_mode!=2).map(c=>({...c}))//filter credit sales only
    let cash_sales = sales_.filter(c=>c.payment_mode===1).map(c=>({...c}))//filter cash sales only
    // console.log(cash_sales)
    let mpesa_sales = sales_.filter(c=>c.payment_mode===3).map(c=>({...c}))//filter mpesa sales only
    
    let cash_sales_0 = sales_.map(x=>({
        batch: x.batch, 
        batch_number: x.batch_number,
        deposit_date: x.date,
        deposit_date_1: x.date_1,
        credit_ac_: x.product_,
        debit_ac_: x.paymentmode,
        staff: x.staff,
        staff_: x.staff_,
        sales:parseFloat(x.quantity*x.unitprice),
        costs:0,
        // deposit_amount:x.payment_mode!=1?parseFloat(x.quantity*x.unitprice):0,
        deposit_amount:parseFloat(x.quantity*x.unitprice),
        cash_balance:0,
        id_:'sales'

    }))
    // console.log(cash_sales_0)


    //Credit Sales
    // let credit_sales= credit_sales_.filter(e => (batch_===undefined||batch_==='')? (e.batch_id ===batch_last) : (e.batch_id ===parseInt(batch_)) ).map( f => ({...f}))
    // console.log(credit_sales_)
    let credit_sales_deposits = credit_sales_.filter(y=>(parseInt(y.batch)===parseInt(batch_filter))).map(x=>({
        batch: x.batch_id, 
        batch_number: x.batch,
        deposit_date: x.instalment_date,
        deposit_date_1: x.instalment_date_1,
        credit_ac_: x.product_,
        debit_ac_: x.paymentmode_,
        staff: x.recipient,
        staff_: x.staff,
        sales: parseFloat(x.instalment_amount),
        costs:0,
        deposit_amount: parseFloat(x.instalment_amount),
        cash_balance:0,
        id_:'credit_sales'

    }))

    // console.log(batch_default)
    // console.log(parseInt(batch_filter))
    // console.log(credit_sales_)
    // console.log(credit_sales_deposits)
    // let credit_sales_deposits = credit_sales_deposits_.filter(e=> parseInt(batch_number)===batch_filter).map(x=>({...x}))
    // console.log(credit_sales_deposits)
  
    //Expenses
    // let expenses_0= expenses_.filter(e => (batch_===undefined||batch_==='')? (e.batch ===batch_last) : (e.batch ===parseInt(batch_)) ).map( f => ({...f}))
    let cash_expenses = expenses_.filter(c=>c.payment_mode===1).map(c=>({...c}))//filter credit sales only
    let mpesa_expenses = expenses_.filter(c=>c.payment_mode===3).map(c=>({...c}))//filter credit sales only
    
    
    // console.log(expenses_0)
    let expenses_withdrawals= expenses_.filter(d=>d.payment_type!=2).map(x=>({
        batch: x.paymentsource, 
        batch_number: x.payment_source,
        deposit_date: x.purchase_date,
        deposit_date_1: x.purchase_date_1,
        debit_ac_:x.cost_category_,
        credit_ac_: x.payment_mode,
        staff: x.staff,
        staff_: x.staff_,
        sales:0,
        costs:parseFloat(x.quantity*x.unitprice),
        // deposit_amount:x.payment_mode!=1? -parseFloat(x.quantity*x.unitprice):0,
        deposit_amount: -parseFloat(x.quantity*x.unitprice),
        cash_balance:0,
        id_:'expenses'

    }))
    // console.log(expenses_withdrawals)


    //Credit Expenses
    // let credit_expenses= credit_expenses_.filter(e => (batch_===undefined||batch_==='')? (e.batch_id ===batch_last) : (e.batch_id ===parseInt(batch_)) ).map( f => ({...f}))
    let credit_expenses_withdrawals = credit_expenses_.filter(y=>(parseInt(y.batch)===parseInt(batch_filter))).map(x=>({
        batch: x.payment_source, 
        batch_number: x.paymentsource,
        deposit_date: x.instalment_date,
        deposit_date_1: x.instalment_date_1,
        debit_ac_:x.cost_category_,
        credit_ac_: x.paymentmode_,
        // bank_details: x.paymentmode,
        staff: x.paymentby,
        staff_: x.staff,
        sales:0,
        costs:parseFloat(x.instalment_amount),
        deposit_amount: -parseFloat(x.instalment_amount),
        cash_balance:0,
        id_:'credit_expenses'

    }))

    // console.log(credit_expenses_withdrawals )
    

    const deposits_net_=deposits_0.concat(cash_sales_0,credit_sales_deposits,expenses_withdrawals,credit_expenses_withdrawals)
    // const deposits_net_=deposits_0.concat(cash_sales_0,expenses_withdrawals, credit_sales_deposits,credit_expenses_withdrawals)
    // let deposits_net_1= deposits_net_.filter(e => (batch_===undefined||batch_==='')? (e.batch_id ===batch_last) : (e.batch_id ===parseInt(batch_)) ).map( f => ({...f}))
    let deposits_net_0 = deposits_net_.sort((a, b) => new Date(a.deposit_date) - new Date(b.deposit_date))
    const deposits_net=deposits_net_0.filter(x=>(bank_type===undefined||bank_type==='')? x.credit_ac_===bank_type_default||x.debit_ac_===bank_type_default: x.credit_ac_===bank_type||x.debit_ac_===bank_type).map(y=>({...y }))
    // console.log(deposits_net_)
    // console.log(deposits_net_0)
    // y.credit_ac_.split("-")[0]!='Bank'
    // deposit_amount:y.credit_ac_.split("-")[0]==='Bank'?-y.deposit_amount:y.deposit_amount


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
    

    let deposits_acc = 0
    let net_sale_acc=0
    let deposits_cumsum_0 = deposits_net.map( y => ({...y,net_sales:net_sale_acc+=y.sales-y.costs,"deposits_total": deposits_acc+=parseFloat(y.deposit_amount) }))
    // let deposits_cumsum_1 = deposits_cumsum_0.map( y => ({...y, expected_balance: (y.net_sales-y.deposits_total)}))
    let deposits_cumsum_1 = deposits_cumsum_0.map( (y,key) => ({...y, deposit_id:parseInt([key+1]), cash_balance:y.cash_balance===0||y.cash_balance===''||y.cash_balance==='undefined'? y.deposits_total:y.cash_balance}))
    let deposits_cumsum_ = deposits_cumsum_1.map( (y,key) => ({...y, variance: (y.deposits_total-y.cash_balance)}))
    let deposits_cumsum = deposits_cumsum_.sort((a, b) => sortTable===true? new Date(b.deposit_date) - new Date(a.deposit_date):new Date(a.deposit_date) - new Date(b.deposit_date))
    // console.log(deposits_cumsum)

    //Sum total of cash and mpesa sales
    const deposit_total = deposits_cumsum.reduce(add_deposit, 0); // with initial value to avoid when the array is empty
    function add_deposit(accumulator, x) {
        return accumulator + parseFloat(x.deposit_amount);
    }

    //Sum total of cash sales
    const net_sales = deposits_cumsum.reduce(add_cash_sales, 0); // with initial value to avoid when the array is empty
    function add_cash_sales(accumulator, a) {
        return accumulator + parseFloat(a.sales-a.costs);
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




    const createDeposit = (e)=>{
        handleSubmit (e)
        if(deposit_date !== undefined && batch !== undefined && deposit_amount !== undefined && debit_ac !== undefined && credit_ac !== undefined && cash_balance !== undefined &&  staff !== undefined){
            if(deposit_date !=='' && batch !== '' && deposit_amount !== '' && debit_ac  !== '' && credit_ac  !== '' && cash_balance !== '' && staff !== ''){
                LAYERS_SALES_EXPENSES_API.addLayersBankDeposits({deposit_date, batch, deposit_amount, debit_ac, credit_ac, cash_balance, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newDeposit(resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;

    }


    const updateDeposit = deposit=>{
        handleSubmit (deposit)
        if(deposit_date !== undefined && batch !== undefined && deposit_amount !== undefined && debit_ac !== undefined && credit_ac !== undefined && cash_balance !== undefined &&  staff !== undefined ){
            if(deposit_date !=='' && batch !== '' && deposit_amount !== '' && debit_ac  !== '' && credit_ac  !== '' && cash_balance !== '' && staff !== ''){
                LAYERS_SALES_EXPENSES_API.updateLayersBankDeposits(deposit_.id,{deposit_date, batch, deposit_amount, debit_ac, credit_ac, cash_balance, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedDeposit(resp))
                .catch(error => console.log(error))
                handleClose()
                    }
        }return;



    }

    const deleteDeposit= deposit =>{
        LAYERS_SALES_EXPENSES_API.removeLayersBankDeposits(deposit.id, token['mr-token'])
        .then(()=>props.deletedDeposit(deposit))
        .catch(error => console.log(error))

    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.createdDeposit();
        setValidated(false);
    }
    const handleShow = () => setShow(true);

    //Pagination
    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)
    const [active, setActive] = useState(1)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const deposits_cumsum_paginated= deposits_cumsum.slice(indexFirstRecord,indexLastRecord )
    const pages=Math.ceil(deposits_cumsum.length/recordsPerPage)

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
                    <Col sm={12} md={12} lg={10}>
                    </Col>


                    <Col sm={12} md={12} lg={2}>
                        <Badge pill bg="success" text="none">
                        Account Balance: {(deposit_total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Badge>{' '}
                    </Col>
                </Row>


                <Row className="tables">
                    <Row>
                    <Col sm={12} md={12} lg={7}>
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
                                    onChange={evt => setBatchFilterDeposits(evt.target.value)||setBatchFilterSales(evt.target.value)||setBatchFilterExpenses(evt.target.value)}
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
                        <OverlayTrigger overlay={<Tooltip>Select Bank Type Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Bank Type</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={bank_type || ''}
                                    onChange={evt => setBankType(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                        {
                                            bank.map(bank =>{
                                                return (<option key={bank.id} value={(bank.type+'-'+bank.name+'-'+bank.account)}>{bank.type}-{bank.name}-{bank.account}</option>)
                                                
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
                        <th> Deposit  Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                                {sortTable===true?

                                    <MUIcons.ArrowDropDownTwoTone fontSize="medium" onClick={sortByDate} />: 
                                    <MUIcons.ArrowDropUpTwoTone fontSize="medium" onClick={sortByDate} />

                                }
                            </OverlayTrigger>
                        </th>
                        <th>Batch</th>
                        <th>Account From (Credit)</th>
                        <th>Account To (Debit)</th>
                        <th>Depositor</th>
                        <th>Sales</th>
                        <th>Expenses</th>
                        <th>Net Sales</th>
                        <th>Deposit Amount</th>
                        {/* <th>Deposit Cumulative</th> */}
                        <th>Expected Balance</th>
                        <th>Actual Balance</th>
                        <th>Variance</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {deposits_cumsum_paginated.map(deposit =>{
                        return (
                            <tr key={deposit.deposit_id}>
                                <td>{deposit.deposit_date_1}</td>
                                <td>{deposit.batch_number }</td>
                                <td>{deposit.credit_ac_}</td>
                                <td>{deposit.debit_ac_}</td>                                
                                <td>{deposit.staff_}</td>
                                <td>{deposit.sales.toLocaleString(undefined, {minimumFractionDigits: 2})}</td> 
                                <td>{deposit.costs.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td>{deposit.net_sales.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td>{(deposit.deposit_amount).toLocaleString(undefined, {minimumFractionDigits: 2}) }</td>  
                                <td>{(deposit.deposits_total).toLocaleString(undefined, {minimumFractionDigits: 2}) }</td>  
                                <td>{parseFloat(deposit.cash_balance).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td className={deposit.variance===0 ? "text-dark table-success":"text-danger table-danger"}>{deposit.variance.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectDeposit(deposit)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteDeposit(deposit) } }
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
                        totalRecords={deposits_cumsum.length}
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
                <Modal.Title> {deposit_.id ? 'Edit Credit Sales': 'Add Credit Sales'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {deposit_ ? (
                    <div>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="sepositdate">
                                    <Form.Label>Deposit Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date" required
                                        value={deposit_date || ''} onChange={evt => setDepositDate(evt.target.value)}
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
                              
                                <Form.Group className="mb-2" controlId="depositamount">
                                    <Form.Label>Deposit Amount</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Amount" required
                                        value={deposit_amount || ''} onChange={evt => setDepositAmount(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="credit_ac">
                                    <Form.Label>Bank</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={credit_ac || ''}
                                        onChange={evt => setCreditAccount(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                            {
                                                bank.map(bank =>{
                                                    return (<option key={bank.id} value={bank.id}>{bank.type}-{bank.name}-{bank.account}</option>)
                                                    })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="debit_ac">
                                    <Form.Label>Bank</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={debit_ac || ''}
                                        onChange={evt => setDebitAccount(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                            {
                                                bank.map(bank =>{
                                                    // return (<option key={bank.id} value={ (bank.type+'-'+bank.name+'-'+bank.account)}>{bank.type}-{bank.name}-{bank.account}</option>)
                                                    return (<option key={bank.id} value={bank.id}>{bank.type}-{bank.name}-{bank.account}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="cashbalance">
                                    <Form.Label>Cash Balance</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Amount" required
                                        value={cash_balance || ''} onChange={evt => setCashBalance(evt.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="depositor">
                                    <Form.Label>Depositor</Form.Label>
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
                deposit_.id?(
                <Button variant="primary"  onClick={updateDeposit}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createDeposit}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {DepositsBalances};