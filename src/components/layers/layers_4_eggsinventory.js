import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, Popover,Overlay, OverlayTrigger,Tooltip, Toast,ToastContainer, Stack} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function EggsInventory(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectEggsRecord = record =>{
        props.selectEggsRecord(record);
        handleShow();
    }

    const record_ = props.record;
    // console.log(eggs_)

    const [inventory_date, setInventoryDate]=useState();
    const [batch, setBatch]=useState('');
    const [egg_loss_defects, setEggsDefects]=useState();
    const [egg_loss_breakages, setEggsBreakages]=useState();
    const [egg_loss_transport, setEggsLossTransport]=useState();
    const [egg_loss_unaccounted, setEggsUnaccounted]=useState();
    const [eggs_stock_actual_crates, setEggsActualCrates]=useState();
    const [eggs_stock_actual_pieces, setEggsActualPieces]=useState();
    const [staff, setStaff]=useState();


    useEffect(()=>{
        setInventoryDate(record_.inventory_date);
        setBatch(record_.batch);
        setEggsDefects(record_.egg_loss_defects);
        setEggsBreakages(record_.egg_loss_breakages);
        setEggsLossTransport(record_.egg_loss_transport);
        setEggsUnaccounted(record_.egg_loss_unaccounted);
        setEggsActualCrates(record_.eggs_stock_actual_crates);
        setEggsActualPieces(record_.eggs_stock_actual_pieces);
        setStaff(record_.staff);

    }, [record_])

    // console.log(inventory_date)


    const [start_date, setStartDate] = useState()
    const [end_date, setEndDate] = useState()


    const batches_ =props.batches && props.batches
    const eggsproduction_unfiltered = props.eggsproduction && props.eggsproduction
    const sales_unfiltered = props.sales && props.sales
    const eggsinventory_unfiltered = props.eggsinventory && props.eggsinventory
    

    const batches = batches_.filter(c=>c.status===true).map(w=>({...w}))
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]


    let eggsinventory_0 = eggsinventory_unfiltered.filter(b => (batch===undefined||batch==='')? b.batch===batch_last : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let eggsinventory_1 = eggsinventory_0 .filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.inventory_date>=start_date && a.inventory_date<=end_date ).map(y=>({...y}))
    let eggsinventory_2 = eggsinventory_1.map(c=>({...c, "total_losses": c.egg_loss_defects+c.egg_loss_breakages+c.egg_loss_transport+c.egg_loss_unaccounted,"total_losses_crates": (c.egg_loss_defects+c.egg_loss_breakages+c.egg_loss_transport+c.egg_loss_unaccounted)/30, "total_stock": c.eggs_stock_actual_crates+c.eggs_stock_actual_pieces/30}))
    // let eggsinventory_2 = eggsinventory_1.filter(b => (batch===undefined||batch==='')? b.batch===2 : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    const eggsinventory_7 = eggsinventory_unfiltered.filter(k=>k.inventory_date===inventory_date)
    const eggsinventory_length = eggsinventory_7.length
    // console.log(eggsinventory_length)
   

    const sales_0 = sales_unfiltered.map(d=>({...d, "total_quantity_sold": d.product_==='Eggs'? d.unit != "Crates"? parseFloat(d.quantity)/30:parseFloat(d.quantity):parseFloat(d.quantity)}))
    const sales_6 = sales_unfiltered.filter(k=>k.date===inventory_date)
    // console.log(sales_6)
    const sales_length = sales_6.length
    // console.log(sales_length)
    // console.log(sales_0)

    // let sales_7 = sales_0.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.date>=start_date && a.date<=end_date ).map(y=>({...y}))
    // console.log(sales_7)


   //Group by and sum
    const sales_1 = [...sales_0.reduce((r, o) => {
        const key = o.date;
        
        const item = r.get(key) || Object.assign({}, o, {
            total_quantity_sold: 0,
        });
        
        item.total_quantity_sold+= o.total_quantity_sold;
      
        return r.set(key, item);
      }, new Map).values()];



    
    // const sales_1 = sales_0.reduce((prev, next) =>{
    //     if (next.date in prev) {
    //         prev[next.date].total_crates_sold += next.total_crates_sold;
    //     } else {
    //         prev[next.date] = next;
    //     }
    //     return prev;
    //     }, {});

    // let sales_2 = Object.keys(sales_1).map(id => sales_1[id]);
    // console.log(sales_1)
    // let sales_8 = sales_1.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.date>=start_date && a.date<=end_date ).map(y=>({...y}))
    // console.log(sales_8)
    
    let sales_2 = sales_1.filter(c=>c.product_==='Eggs').map(d=>({...d}))
    let sales_3 = sales_2.filter(b => (batch===undefined||batch==='')? b.batch===batch_last : (b.batch ===parseInt(batch)) ).map( x => ({"date": x.date,"total_quantity_sold": x.total_quantity_sold}))
    let sales = sales_3.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.date>=start_date && a.date<=end_date ).map(y=>({...y}))
    // let sales_5 = sales_4.sort((a, b) => Date.parse(a.date) - Date.parse(a.date));
    // sales.reverse()
    // console.log(sales_3)
    // console.log(sales)

    //Sum total of credit sales
    const sales_total = sales.reduce(add_sales, 0); // with initial value to avoid when the array is empty
    // console.log(sales_total)
    function add_sales(accumulator, a) {
        return accumulator + a.total_sales;
    }

    // console.log(eggsproduction_unfiltered)
    const eggproduction_2 = eggsproduction_unfiltered.filter(k=>k.prod_date===inventory_date)
    // console.log(eggproduction_2)
    const eggproduction_length = eggproduction_2.length
    // console.log(eggproduction_length)
    
    let eggproduction_0 = eggsproduction_unfiltered.filter(b => (batch===undefined||batch==='')? b.batch===batch_last: (b.batch ===parseInt(batch)) ).map( x => ({"date": x.prod_date,"net_production": x.net_crates}))
    let eggproduction = eggproduction_0.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.date>=start_date && a.date<=end_date ).map(y=>({...y}))
    // eggproduction.sort((a, b) => b.date - a.date);
    // eggproduction.reverse()
    // console.log(eggproduction)

    // const mergeByDate_0 = (eggproduction, sales) =>
    // eggproduction.map(itm => ({
    //     ...sales.find((item) => (item.date === itm.date) && item),
    //     ...itm
    // }));



    // let eggsstock_calc_5 = mergeByDate_0(eggproduction, sales)
    // console.log(eggsstock_calc_2);


    const eggsstock_calc_0 = eggproduction.map(a => ({
        ...a,
        sales_check: sales.find(b => b.date=== a.date)

    }));

    // console.log(eggsstock_calc_0)
    // console.log(sales)
    // console.log(eggproduction)

    let eggsstock_calc_1 = eggsstock_calc_0.map(b=>({...b, ...b.sales_check}))
    let eggsstock_calc_2 = eggsstock_calc_1.map(b=>({...b, total_quantity_sold: b.sales_check===undefined? 0: b.total_quantity_sold}))
    // let eggsstock_calc_3 = eggsstock_calc_2.map(y=>({...y, "egg_diff": y.net_production-y.total_quantity_sold}))
    let eggsstock_calc = eggsstock_calc_2.map(z=>({...z }))
    // console.log(eggsstock_calc);


    const eggsinventory_3 = eggsstock_calc.map(a => ({
        ...a,
        inventory_check: eggsinventory_2.find(b => b.inventory_date=== a.date)

    }));

    // console.log(eggsinventory_3)

    let eggsinventory_4 = eggsinventory_3.map(b=>({...b, ...b.inventory_check}))
    // console.log(eggsinventory_2)
    // console.log(eggsinventory_4)


    // const mergeByDate = (eggsinventory_2, eggsstock_calc) =>
    // eggsinventory_2.map(itm => ({
    //     ...eggsstock_calc.find((item) => (item.date === itm.inventory_date) && item),
    //     ...itm
    // }));

    // let eggsinventory_3_ = mergeByDate(eggsinventory_2, eggsstock_calc)
    // console.log(eggsinventory_3);
    
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
        
    let eggbalance_acc =0
    let eggsinventory_5 = eggsinventory_4.map(x=>({...x, "egg_balance":eggbalance_acc+=(x.net_production - x.total_quantity_sold- x.total_losses_crates)}))
    let eggsinventory_6 = eggsinventory_5.map((x,key)=>({...x, id_:key+1, "variance": (x.egg_balance- x.total_stock)}))
    let eggsinventory = eggsinventory_6.sort((a, b) => sortTable===true? new Date(b.inventory_date_1) - new Date(a.inventory_date_1):new Date(a.inventory_date_1) - new Date(b.inventory_date_1))
    // console.log(eggsinventory);

    const resetTable = () => {
        setStartDate('')
        setEndDate('')
        setBatch('')
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


    const createEggInventory = (e) =>{
        handleSubmit (e);
        if(inventory_date !== undefined && batch !== undefined && egg_loss_defects !== undefined && egg_loss_breakages!== undefined && egg_loss_transport !== undefined && egg_loss_unaccounted !== undefined && eggs_stock_actual_crates !== undefined && eggs_stock_actual_pieces !== undefined && staff !== undefined){
            if(inventory_date !=='' && batch !== '' && egg_loss_defects !== '' && egg_loss_breakages !== '' && egg_loss_transport !== '' && egg_loss_unaccounted !== '' && eggs_stock_actual_crates !== '' && eggs_stock_actual_pieces !== '' && staff !== ''){
                LAYERS_PRODUCTION_API.addEggsInventory({inventory_date, batch, egg_loss_defects, egg_loss_breakages, egg_loss_transport, egg_loss_unaccounted, eggs_stock_actual_crates, eggs_stock_actual_pieces, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newEggsInventory(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateEggInventory= record =>{
        handleSubmit (record);
        if(inventory_date !== undefined && batch !== undefined && egg_loss_defects !== undefined && egg_loss_breakages!== undefined && egg_loss_transport !== undefined && egg_loss_unaccounted !== undefined && eggs_stock_actual_crates !== undefined && eggs_stock_actual_pieces !== undefined  && staff !== undefined){
            if(inventory_date !=='' && batch !== '' && egg_loss_defects !== '' && egg_loss_breakages !== '' && egg_loss_transport !== '' && egg_loss_unaccounted !== '' && eggs_stock_actual_crates !== '' && eggs_stock_actual_pieces !== '' && staff !== ''){
                LAYERS_PRODUCTION_API.updateEggsInventory(record_.id,{inventory_date, batch, egg_loss_defects, egg_loss_breakages, egg_loss_transport, egg_loss_unaccounted, eggs_stock_actual_crates, eggs_stock_actual_pieces, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedEggsInventory(resp))
                .catch(error => console.log(error))
                handleClose()

            }
        }return;

    }

    const deleteEggInventory = record =>{
        LAYERS_PRODUCTION_API.removeEggsInventory(record.id, token['mr-token'])
        .then(()=>props.deletedEggsInventory(record))
        .catch(error => console.log(error))
    }



    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdEggsInventory();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    //Pagination
    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const eggsinventory_paginated = eggsinventory.slice(indexFirstRecord,indexLastRecord )
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
                            <CSVLink data={eggsinventory} className='text-success'>
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
                        <th>Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                                {sortTable===true?

                                <MUIcons.ExpandLessSharp fontSize="small" onClick={sortByDate} />: 
                                <MUIcons.ExpandMoreSharp fontSize="small" onClick={sortByDate} />
                                }
                            </OverlayTrigger>
                        </th>
                        <th>Batch</th>
                        <th>Total Losses (Pcs)</th>
                        <th>Actual Stock (crates)</th>
                        <th>Actual Stock (Pcs)</th>
                        <th>Net Production (Crates)</th>
                        <th>Sales (Crates)</th>
                        <th>Post Production Losses (Crates)</th>
                        <th>Expected Stock (Crates)</th>
                        <th>Actual Stock (Crates)</th>
                        <th>Variance (Crates)</th>

                        <th>Staff</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {eggsinventory_paginated.map(record =>{
                        return (
                            <tr key={record.id_}>
                                <td>{record.inventory_date_1}</td>
                                <td>{record.batch_number}</td>
                                <td>{record.total_losses}</td>
                                <td>{record.eggs_stock_actual_crates}</td>
                                <td>{record.eggs_stock_actual_pieces}</td>
                                <td>{parseFloat(record.net_production).toFixed(2)}</td>
                                <td>{parseFloat(record.total_quantity_sold).toFixed(2)}</td>
                                <td>{parseFloat(record.total_losses_crates).toFixed(2)}</td>
                                <td>{parseFloat(record.egg_balance).toFixed(2)}</td>
                                <td>{parseFloat(record.total_stock).toFixed(2)}</td>
                                <td className={record.variance===0 ? "text-dark table-success":"text-danger table-danger"} >{parseFloat(record.variance).toFixed(2)}</td>
                                <td>{record.staff_}</td>

                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectEggsRecord(record)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteEggInventory(record) } }
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
                        totalRecords={eggsinventory.length}
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
                <Modal.Title> {record_.id ? 'Edit Eggs Stock': 'Add Eggs Stock'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {record_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={4}>
                                <Form.Group className="mb-2" controlId="inventorydate">
                                    <Form.Label >Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Stock Date"required
                                        className={record_.id? "" : sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?"" :"border-danger"  : "border-danger"}
                                        value={inventory_date || ''} onChange={evt => setInventoryDate(evt.target.value)}
                                        />
                                                                        
                                </Form.Group>


                            </Col>
                            <Col sm={12} md={12} lg={3}>
                            <Form.Group className="mb-2" controlId="batch">
                                    <Form.Label>Batch</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={batch || ''}
                                        onChange={evt => setBatch(evt.target.value)}
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
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

                            <Col sm={12} md={12} lg={5}>
                                <Form.Group className="mb-2" controlId="staff">
                                    <Form.Label>Staff:</Form.Label>
                                    <Form.Select
                                        as="select"
                                        value={staff || ''}
                                        onChange={evt => setStaff(evt.target.value)}
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
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


                            </Col>
                               
                        </Row>
                        <Row>
                        {sales_length!=0 && eggproduction_length!=0? 
                            eggsinventory_length ===1?
                            <Form.Group className="text-danger table-danger">
                            <Form.Label variant="danger">Data for {inventory_date} exists but you can edit!!</Form.Label>
                            </Form.Group> 
                            :
                            ''
                            :
                            inventory_date ===''?
                            <Form.Group className="text-danger table-danger">
                            <Form.Label variant="danger">Date field is empty!!</Form.Label>
                            </Form.Group> 
                            :
                            <Form.Group className="text-danger table-danger">
                            <Form.Label>Please enter sales or production data for {inventory_date} first!!</Form.Label>
                            </Form.Group>
                        }
                                        
                                        
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="defects">
                                    <Form.Label>Defects: </Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Defective Eggs" 
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
                                        required 
                                        value={egg_loss_defects ||''} onChange={evt => setEggsDefects(evt.target.value)}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="transportlosses">
                                    <Form.Label>Transport Breakages:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Transport Breakages" 
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
                                        required
                                        value={egg_loss_transport || ''} onChange={evt => setEggsLossTransport(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="actualstockcrates">
                                    <Form.Label>Actual Stock (Crates):</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Stock (Crates)" 
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
                                        required
                                        value={eggs_stock_actual_crates || ''} onChange={evt => setEggsActualCrates(evt.target.value)}
                                    />
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="breakages">
                                    <Form.Label>Broken Eggs:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Broken Eggs" 
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
                                        required
                                        value={egg_loss_breakages || ''} onChange={evt => setEggsBreakages(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="unaccounted">
                                    <Form.Label>Unaccounted Eggs:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Unaccounted Eggs" 
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
                                        required
                                        value={egg_loss_unaccounted || ''} onChange={evt => setEggsUnaccounted(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="actualstockpieces">
                                    <Form.Label>Actual Stock (Pieces):</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Stock (Pieces)" 
                                        disabled={record_.id? false : (sales_length!=0 && eggproduction_length!=0 ? eggsinventory_length !=1 ?false:true : true)}
                                        required
                                        value={eggs_stock_actual_pieces|| ''} onChange={evt => setEggsActualPieces(evt.target.value)}
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
                record_.id?(
                <Button variant="primary"  onClick={updateEggInventory}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createEggInventory}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {EggsInventory};