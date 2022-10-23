import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Stack} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import {useCookies} from 'react-cookie';
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";


import Paginate from '../pagination'

import { RestaurantMenu } from "@material-ui/icons";



function BirdsStock(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectStock = bird =>{
        props.selectStock(bird);
        handleShow();
    }

    const stock_ = props.bird;

  
    const [stock_date, setStockDate]=useState();
    const [batch, setBatch]=useState('');
    const [stock_movement_type, setStockMovementType]=useState();
    const [birds, setBirds]=useState();
    const [birds_stock_actual, setBirdsStockActual]=useState();
    const [stock_movement_notes, setStockMovementNotes]=useState();
    const [staff, setStaff]=useState();

    useEffect(()=>{
        setStockDate(stock_.stock_date);
        setBatch(stock_.batch);
        setStockMovementType(stock_.stock_movement_type);
        setBirds(stock_.birds);
        setBirdsStockActual(stock_.birds_stock_actual);
        setStockMovementNotes(stock_.stock_movement_notes);
        setStaff(stock_.staff);
    }, [stock_])

    const [start_date, setStartDate] = useState()
    const [end_date, setEndDate] = useState()
    

    // console.log(start_date, end_date)


    const batches_ =props.batches && props.batches
    const birds_data_ = props.birds && props.birds
    //filter active batches
    let batches = batches_.filter(c=>c.status===true).map(w=>({...w}))
    

    const resetTable = () => {
        setStartDate('')
        setEndDate('')
        setBatch('')
    }

    //get the latest active batch
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]


    // running balance without grouping and filtered
    let birds_data_0 = birds_data_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let birds_data = birds_data_.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? birds_data_0 : a.stock_date>=start_date && a.stock_date<=end_date ).map(y=>({...y}))
    // console.log(birds_data_date_filtered)

    let birds_actual= birds_data.map(y=>y.birds_stock_actual)
    let birds_actual_latest = birds_actual[birds_actual.length-1]
    // console.log(birds_actual_latest)
    
    // console.log(birds_data_filtered)
    

    //dayold chicks
    const expenses_ = props.expenses && props.expenses
    let expenses =  expenses_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let day_old_chick_acc=0
    let dayold_chicks =  expenses.filter(b => (b.cost_category===4) ).map( (x,key) => ({...x,
        chicks_id:parseInt([key+1]),stock_date: x.purchase_date,stock_date_1:x.purchase_date_1,
        batch: x.batch, batch_number:x.batch_number,
        stock_movement_type:x.cost_category,
        stock_type:x.expense_category,birds:parseInt(x.quantity), 
        staff:x.staff,staff_:x.staff_,
        stock_description: x.expense_details,
        birds_stock_actual:day_old_chick_acc+=parseInt(x.quantity)

    }))
    // console.log(dayold_chicks)


    //xlayers
    const sales_ = props.sales && props.sales
    let sales =  sales_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let sales_xlayers =  sales.filter(b => (b.product===3) ).map( (x,key) => ({...x,
        xlayers_id:parseInt([key+1]),stock_date: x.date, stock_date_1:x.date_1,
        batch: x.batch, batch_number:x.batch_number,
        stock_movement_type:x.product,
        stock_type:x.product_,birds:-parseInt(x.quantity), 
        staff:x.staff,staff_:x.staff_,
        stock_description: x.product_,
        birds_stock_actual:(birds_actual_latest-parseInt(x.quantity))

    }))
    // console.log(sales_xlayers)

    const birds_all=dayold_chicks.concat(birds_data,sales_xlayers)

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
    
    //console.log(sortTable)

    let birds_acc = 0;
    let birds_stock_ = birds_all.map( (x,key) => ({...x,stocK_id:parseInt([key+1]),"birds_total": birds_acc+=x.birds}))
    // let birds_stock = birds_stock_.sort((a, b) => new Date(b.stock_date_1) - new Date(a.stock_date_1))
    let birds_stock = birds_stock_.sort((a, b) => sortTable===true? new Date(b.stock_date) - new Date(a.stock_date):new Date(a.stock_date) - new Date(b.stock_date))

    // console.log(birds_stock)

    
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


    const createStock = (e) =>{
        handleSubmit (e);
        if(stock_date !== undefined && batch !== undefined && stock_movement_type !== undefined && birds!== undefined && birds_stock_actual !== undefined && staff !== undefined){
            if(stock_date !=='' && batch !== '' && stock_movement_type !== '' && birds !== '' && birds_stock_actual !== '' && staff !== ''){
                LAYERS_PRODUCTION_API.addBirdsStock({stock_date, batch, stock_movement_type, birds,birds_stock_actual, stock_movement_notes, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newBirdsStock(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateStock = bird =>{
        handleSubmit (bird);
        if(stock_date !== undefined && batch !== undefined && stock_movement_type !== undefined && birds!== undefined && birds_stock_actual !== undefined && staff !== undefined){
            if(stock_date !=='' && batch !== '' && stock_movement_type !== '' && birds !== '' && birds_stock_actual !== '' && staff !== ''){
                LAYERS_PRODUCTION_API.updateBirdsStock(stock_.id,{stock_date, batch, stock_movement_type, birds,birds_stock_actual, stock_movement_notes, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedBirds(resp))
                .catch(error => console.log(error))
                handleClose()

            }
        }return;

    }

    const deleteStock = bird =>{
        LAYERS_PRODUCTION_API.removeBirdsStock(bird.id, token['mr-token'])
        .then(()=>props.deletedBirdsStock(bird))
        .catch(error => console.log(error))

    }


    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdStock();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    //Pagination

    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const birds_stock_paginated= birds_stock.slice(indexFirstRecord,indexLastRecord )
    // console.log(current_filtered_birds_data)

   const paginate =(pageNumber)=> setCurrentPage(pageNumber)





 
    return(
        
        <div>

            
            <Container fluid>
                <Row className="tables">
                    <Row>
                    <Col sm={12} md={12} lg={4}>
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
                        <CSVLink data={birds_stock} className='text-success'>
                            <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                        <MUIcons.CloudDownloadRounded fontSize="small"/>
                                </Button>
                            </OverlayTrigger>
                        </CSVLink>
                    </Col>

                    </Row>

                    <Table className="table table-success table-striped table-hover table-sm table-borderless">
                    <thead>
                    <tr>
                       <th>Stock Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                            {sortTable===true?
                                <MUIcons.ArrowDropUpTwoTone fontSize="medium" onClick={sortByDate} />: 
                                <MUIcons.ArrowDropDownTwoTone fontSize="medium" onClick={sortByDate} />
                            }
                            </OverlayTrigger>
                        </th>
                        <th>Batch</th>
                        <th>Stock Type</th>
                        <th>Stock Description</th>
                        <th>Number of Birds</th>
                        <th>Calculated Balance</th>
                        <th>Actual Balance</th>
                        <th>Variance</th>
                        <th>Comments</th>
                        <th>Staff</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        // birds_data_filtered.map(bird=>{
                            birds_stock_paginated.map(bird=>{
                            return(
                                <tr key={bird.stocK_id}>
                                    <td>{bird.stock_date_1}</td>
                                    <td>{bird.batch_number}</td>
                                    <td>{bird.stock_type}</td>
                                    <td>{bird.stock_description}</td>
                                    <td>{bird.birds}</td>
                                    <td>{bird.birds_total}</td>
                                    <td>{bird.birds_stock_actual}</td>
                                    <td className={bird.birds_stock_actual-bird.birds_total===0 ? "text-dark table-success":"text-danger table-danger"}>
                                        {bird.birds_stock_actual-bird.birds_total}
                                    </td>
                                    <td>{bird.stock_movement_notes}</td>
                                    <td>{bird.staff_}</td>

                                    {bird.stock_type==='Birds-Day Old Chicks'|| bird.stock_type==='Ex-Layers'?
                                    
                                    <td></td>
                                    
                                    :

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectStock(bird)}}
                                        />
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteStock(bird) } }
                                        />
                                    </td>

                                    
                                    
                                    }
                                    

                                </tr>
                            )
                        })
                    }
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
                        totalRecords={birds_data.length}
                        paginate={paginate}
                    />
                    </Col>
                </Row>
            </Row>
        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {stock_.id ? 'Edit Stock': 'Take Stock'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {stock_ ? (
                    <div>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="stockdate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Stock Date" required
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


                            </Col>
                            <Col>

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
                                            props.staffTeam && props.staffTeam.map(staff =>{
                                                return (<option key={staff.id} value={staff.id}>{staff.firstname}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="stocktype">
                                    <Form.Label>Stock Movement Type</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={stock_movement_type || ''}
                                        onChange={evt => setStockMovementType(evt.target.value)}
                                        required
                                    >
                                        <option value=''>Select...</option>
                                        
                                        {
                                            props.stocktypes && props.stocktypes.map(type =>{
                                                return (<option key={type.id} value={type.id}>{type.stock_movement_type}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <Form.Group className="mb-2" controlId="birds">
                                    <Form.Label>Number of Birds </Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Number of Birds(Leave Blank if Stock Taking)" required 
                                        value={birds ||''} onChange={(stock_movement_type !== '1') ? stock_movement_type !== '2' ? birds<0? evt =>setBirds(evt.target.value): evt =>setBirds(evt.target.value*-1):birds===0? evt =>setBirds(evt.target.value):setBirds(0): evt => setBirds(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="actualstock">
                                    <Form.Label>Actual Count</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Actual Birds Count" required
                                        value={birds_stock_actual || ''} onChange={evt => setBirdsStockActual(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="Comments">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Comments(Optional)" 
                                        value={stock_movement_notes || ''} onChange={evt => setStockMovementNotes(evt.target.value)}
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
                stock_.id?(
                <Button variant="primary"  onClick={updateStock}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createStock}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>

        </Container>

        </div>
 )
}

export {BirdsStock};