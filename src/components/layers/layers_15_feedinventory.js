import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip,Badge, Stack,Card} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import { ManSharp } from "@mui/icons-material";
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function FeedInventory(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectFeedInventory = record=>{
        props.selectFeedInventory(record);
        handleShow();
    }

    const record_ = props.record;
    // console.log(record_)
    
    const [stock_date, setStockDate]=useState();
    const [batch, setBatch]=useState('');
    const [feed_type, setFeedType]=useState();
    const [stock_in, setStockIn]=useState('');
    const [bags_consumed, setBagsConsumed]=useState('');
    const [bags_balance, setBagsBalance]=useState('');
    const [staff, setStaff]=useState('');

    useEffect(()=>{
        setStockDate(record_.stock_date);
        setBatch(record_.batch);
        setFeedType(record_.feed_type);
        setStockIn(record_.stock_in);
        setBagsConsumed(record_.bags_consumed);
        setBagsBalance(record_.bags_balance);
        setStaff(record_.staff);

    }, [record_])

    const [start_date, setStartDate] = useState()
    const [end_date, setEndDate] = useState()
    const [feed_type_, setFeedType_]=useState();
    const resetTable = () => {
        setStartDate('')
        setEndDate('')
        setBatch('')
        setFeedType_('')
        setFeedType('')
    }

    // console.log(feed_type)

    const staffteam = props.staffTeam && props.staffTeam
    const batches_ =props.batches && props.batches
    const costcategories_unfiltered= props.costcategories && props.costcategories
    const feedtypes= props.feedtypes && props.feedtypes
    const feedinventory_unfiltered = props.feedinventory && props.feedinventory
    const expenses_unfiltered = props.expenses && props.expenses
    const feed_types_choices= [{id:1, feedtype:'Chick Mash'}, {id:2,feedtype:'Growers Mash'},{id:3, feedtype:'Layers Mash'} ]
    // console.log(feed_types_choices)

    let costcategories =  costcategories_unfiltered.filter(d =>  (d.id === 1)||(d.id === 2)||(d.id === 3) ).map( y => ({...y}))

    
    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]

    
    // const feed_default = "Chick Mash" 

    // console.log(expenses_unfiltered)
    let expenses_0= expenses_unfiltered.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.stock_date>=start_date && a.stock_date<=end_date ).map(y=>({...y}))
    let expenses_1=  expenses_0.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let expenses_2 =  expenses_1.filter(d =>  (d.cost_category === 1)||(d.cost_category === 2)||(d.cost_category === 3) ).map( y => ({...y, "bags_purchased": parseInt(y.quantity)}))
    const feed_default_=expenses_2.map(y=>y.expense_sub_category)
    const feed_default =feed_default_[feed_default_.length - 1]
    // console.log(feed_default)
    let expenses_3 =  expenses_2.filter(c => (feed_type_===undefined||feed_type_==='')? (c.expense_sub_category ===feed_default): (c.expense_sub_category ===feed_type_) ).map( y => ({...y}))
    // let expenses_3 =  expenses_1.filter(c => (feed_type===undefined||feed_type==='')? c : (c.expense_sub_category===feed_type) ).map( y => ({...y}))
    expenses_3.reverse()
    // console.log(expenses_3)


    
    const expenses = [...expenses_3.reduce((r, o) => {
        const key = o.id;
        
        const item = r.get(key) || Object.assign({}, o, {
          quantity: 0,
        });
        
        item.quantity+= o.quantity;
      
        return r.set(key, item);
      }, new Map).values()];
      
    //   console.log(expenses);



    let bags_purchased_acc = 0
    let bags_purchased_cumsum = expenses.map( x => ({...x,"total_bags_purchased": bags_purchased_acc+=parseInt(x.quantity)}))
    // console.log(bags_purchased_cumsum)

    const bags_purchased_total = bags_purchased_cumsum.reduce(add_bags_purchased, 0); // with initial value to avoid when the array is empty
    // console.log(bags_purchased_total)
    function add_bags_purchased(accumulator, a) {
        return accumulator + parseInt(a.quantity);
    }

    
    let feedinventory_0= feedinventory_unfiltered.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.stock_date>=start_date && a.stock_date<=end_date ).map(y=>({...y}))
    let feedinventory_1= feedinventory_0.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let feedinventory_2 = feedinventory_1.filter(c => (feed_type_===undefined||feed_type_==='')? (c.feed_type_1 ===feed_default): (c.feed_type_1 ===feed_type_) ).map( y => ({...y,"bags_delivered": parseInt(y.stock_in)}))
    // let feedinventory_2 = feedinventory_1.filter(c => (feed_type===undefined||feed_type==='')? c : (c.feed_type_1 ===feed_type) ).map( y => ({...y,"bags_delivered": parseInt(y.stock_in)}))
    // console.log(feedinventory_2)

 
    const feedinventory_3 = [...feedinventory_2.reduce((r, o) => {
        const key = o.id + '-'+ o.feed_type
        
        const item = r.get(key) || Object.assign({}, o, {
            bags_delivered: 0,
        });
        
        item.bags_delivered+= o.bags_delivered;
      
        return r.set(key, item);
      }, new Map).values()];
      
    //   console.log(feedinventory_3);


    const mergeById = (feedinventory_3,bags_purchased_cumsum) =>
    feedinventory_3.map(itm => ({
        ...bags_purchased_cumsum.find((item) => (item.id === itm.feed_type) && item),
        ...itm
    }));

    let feedinventory_4 = mergeById(feedinventory_3,bags_purchased_cumsum)
    // console.log(feedinventory_4);

    let bags_delivered_acc = 0
    let bags_consumed_acc = 0
    let feedinventory_5 = feedinventory_4.map( x => ({...x,"total_bags_delivered": bags_delivered_acc +=parseInt(x.bags_delivered),"total_bags_consumed": bags_consumed_acc +=parseInt(x.bags_consumed)}))
    let feedinventory = feedinventory_5.map( x => ({...x,"delivery_balance":bags_purchased_total-x.total_bags_delivered}))
    // console.log(feedinventory);
    // console.log(expenses_2)


    const bags_delivered_total = feedinventory.reduce(add_bags_delivered, 0); // with initial value to avoid when the array is empty
    function add_bags_delivered(accumulator, a) {
        return accumulator + parseInt(a.stock_in);
    }


    const feedinventory_grouped_ = [...feedinventory.reduce((r, o) => {
        const key = o.feed_type
        
        const item = r.get(key) || Object.assign({}, o, {
            total_bags_consumed: 0,
        });
        
        item.total_bags_consumed+= parseInt(o.bags_consumed);
      
        return r.set(key, item);
      }, new Map).values()];
      
    //   console.log(feedinventory_grouped_);

    const feedinventory_grouped = feedinventory_grouped_.map(b=>({feed_type: b.feed_type, total_bags_consumed:b.total_bags_consumed}))
    // console.log(feedinventory_grouped);


    const expenses_4= expenses_2.map(a=>({
        ...a,
        feedinventory_check: feedinventory_grouped.find(b => b.feed_type=== a.id)
    }))

    const expenses_5 = expenses_4.map(b=>({...b, ...b.feedinventory_check}))
    const expenses_6 = expenses_5.filter(a=>a.bags_purchased-a.total_bags_consumed!=0).map(b=>({...b, feed_batch_balance:b.feedinventory_check===undefined?b.bags_purchased:b.bags_purchased-b.total_bags_consumed}))
    // console.log(expenses_6)

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



    const createFeedInventory = (e) =>{
        handleSubmit (e);
        if(stock_date !== undefined && batch !== undefined && feed_type !== undefined && stock_in!== undefined && bags_consumed!== undefined && bags_balance!== undefined && staff!== undefined ){
            if(stock_date !=='' && batch!== '' && feed_type !== '' && stock_in!== '' && bags_consumed!== '' && bags_balance!== '' && staff !== '' ){
                LAYERS_PRODUCTION_API.addFeedInventory({stock_date, batch, feed_type, stock_in,bags_consumed,bags_balance,staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newFeedInventory(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateFeedInventory= record =>{
        handleSubmit (record);
        if(stock_date !== undefined && batch !== undefined && feed_type !== undefined && stock_in!== undefined && bags_consumed!== undefined && bags_balance!== undefined && staff!== undefined ){
            if(stock_date !=='' && batch!== '' && feed_type !== '' && stock_in!== '' && bags_consumed!== '' && bags_balance!== '' && staff !== '' ){
                LAYERS_PRODUCTION_API.updateFeedInventory(record_.id,{stock_date, batch, feed_type, stock_in,bags_consumed,bags_balance,staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedFeedInventory(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteFeedInventory= record =>{
        LAYERS_PRODUCTION_API.removeFeedInventory(record.id, token['mr-token'])
        .then(()=>props.deletedFeedInventory(record))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdFeedInventory();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);


    //Pagination

    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const feedinventory_paginated= feedinventory.slice(indexFirstRecord,indexLastRecord )

    const paginate =(pageNumber)=> setCurrentPage(pageNumber)

    
    return(

        <div>
            
            <Container fluid>
                <Row>
                    <Col sm={12} md={12} lg={7}>
                    </Col>


                    <Col sm={12} md={12} lg={5}>
                    <Badge pill bg="danger">
                        Bags Purchased: {bags_purchased_total}
                        </Badge>{' '}
                        <Badge pill bg="success">
                        Bags Delivered: {bags_delivered_total}
                        </Badge>{' '}
                        <Badge pill bg="warning" text="dark">
                        Balance: {bags_purchased_total-bags_delivered_total}
                        </Badge>{' '}
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

                        <Col sm={12} md={12} lg={3}>
                            <OverlayTrigger overlay={<Tooltip>Select Feed Type Filter</Tooltip>}>
                            <InputGroup  className="mb-2" size="sm">
                                <InputGroup.Text >Feed Type</InputGroup.Text>
                                    <Form.Select
                                        size="sm"
                                        value={feed_type_ || ''}
                                        onChange={evt => setFeedType_(evt.target.value)}
                                    >
                                        <option value=''>...</option>
                                            {
                                                costcategories.map(feedtype =>{
                                                    // return (<option key={feedtype.id} value={feedtype.feedtype}>{feedtype.feedtype}</option>)
                                                    // return (<option key={feedtype.id} value={feedtype.feed_type}>{feedtype.feed_type}</option>)
                                                    return (<option key={feedtype.id} value={feedtype.cost_sub_category}>{feedtype.cost_sub_category}</option>)
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

                        <Col sm={12} md={12} lg={1}>
                            <CSVLink data={feedinventory} className='text-success'>
                                <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                    <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                            <MUIcons.CloudDownloadRounded fontSize="small"/>
                                    </Button>
                                </OverlayTrigger>
                            </CSVLink>
                        </Col>


                    </Row>

                    <Row>
                        <Col>

                            <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                                <thead>
                                    <tr>
                                        <th>Stock Date</th>
                                        <th>Batch</th>
                                        <th>Feed Type</th>
                                        <th>Brand</th>
                                        <th>Unit</th>
                                        <th>Purchased</th>
                                        <th>Delivered</th>
                                        <th>Outstanding Delivery</th>
                                        <th>Cumulative Delivered</th>
                                        <th>Feed Consumed</th>
                                        <th>Cumulative Consumed</th>
                                        <th>Expected Feed Balance</th>
                                        <th>Actual Feed Balance</th>
                                        <th>Feed Stock Variance</th>
                                        <th>Staff</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {feedinventory_paginated.map(record=>{
                                    return (
                                        <tr key={record.id}>
                                            <td>{record.stock_date_1}</td>
                                            <td>{record.batch_number}</td>
                                            <td>{record.feed_type_1}</td>
                                            <td>{record.brand}</td>
                                            <td>{record.unit}</td>
                                            <td>{record.bags_purchased}</td>
                                            <td>{record.bags_delivered}</td>
                                            <td>{record.delivery_balance}</td>
                                            <td>{record.total_bags_delivered}</td>
                                            <td>{parseInt(record.bags_consumed)}</td>
                                            <td>{record.total_bags_consumed}</td>
                                            <td>{record.total_bags_delivered-record.total_bags_consumed}</td>
                                            <td>{parseInt(record.bags_balance)}</td>
                                            <td className={((record.total_bags_delivered-record.total_bags_consumed)-parseInt(record.bags_balance))===0 ? "text-dark table-success":"text-danger table-danger"}>{(record.total_bags_delivered-record.total_bags_consumed)-parseInt(record.bags_balance)}</td>
                                            <td>{record.staff_}</td>

                                            <td>
                                                <FontAwesomeIcon 
                                                    icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                                    onClick={ () => {selectFeedInventory(record)}}
                                                />
                                                
                                                <FontAwesomeIcon
                                                    icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                                    onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                                    deleteFeedInventory(record) } }
                                                />
                                            </td>

                                        </tr>
                                    ) 
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
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
                        totalRecords={feedinventory.length}
                        paginate={paginate}
                    />
                    </Col>
                </Row>

                </Row>

            
            </Container>

        {/* <h1>{product_.id? 'Eggs': 'Not Eggs'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {record_.id ? 'Edit Feed Inventory': 'Add Feed Inventory'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {record_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>

                                <Form.Group className="mb-2" controlId="date">
                                    <Form.Label>Stock Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Date" required
                                        value={stock_date || ''} onChange={evt => setStockDate(evt.target.value)}
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



                                <Form.Group className="mb-2" controlId="feedpurchased">
                                    <Form.Label>Feed Purchased:</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={feed_type || ''}
                                        onChange={evt => setFeedType(evt.target.value)}
                                        required
                                       
                                    >
                                        <option value=''>Select...</option>
                                        
                                            {
                                            expenses_6.map(feedtype =>{
                                                return (<option key={feedtype.id} value={feedtype.id}>{feedtype.purchase_date_1}-{feedtype.expense_sub_category}-{feedtype.brand}-{feedtype.quantity}-{feedtype.unitmeasure_}{feedtype.unit_}-(bal:{feedtype.feed_batch_balance})</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="stock-in">
                                    <Form.Label>Delivered Bags:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Kgs" 
                                        value={stock_in || ''} onChange={evt => setStockIn(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="bags-balance">
                                    <Form.Label>Bags Consumed:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Bags" 
                                        value={bags_consumed || ''} onChange={evt => setBagsConsumed(evt.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="bags-balance">
                                    <Form.Label>Bags Balance:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Bags" 
                                        value={bags_balance || ''} onChange={evt => setBagsBalance(evt.target.value)}
                                    />
                                </Form.Group>

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
                record_.id?(
                <Button variant="primary"  onClick={updateFeedInventory}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createFeedInventory}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {FeedInventory};