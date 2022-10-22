import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Stack} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function EggsProduction(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectEggProduction = eggs =>{
        props.selectEggProduction(eggs);
        handleShow();
    }

    const eggs_ = props.eggs;
    // console.log(eggs_)
    
    const [prod_date, setProductionDate]=useState();
    const [batch, setBatch]=useState('');
    const [birds, setBirds]=useState();
    const [gross, setGross]=useState();
    const [defects, setDefects]=useState();
    const [broken, setBroken]=useState();
    const [staff, setStaff]=useState();


    useEffect(()=>{
        setProductionDate(eggs_.prod_date);
        setBatch(eggs_.batch);
        setBirds(eggs_.birds);
        setGross(eggs_.gross);
        setDefects(eggs_.defects);
        setBroken(eggs_.broken);
        setStaff(eggs_.staff);

    }, [eggs_])

    
    const [start_date, setStartDate] = useState()
    const [end_date, setEndDate] = useState()


    const batches_ =props.batches && props.batches
    const birds_data = props.birds && props.birds
    const eggsproduction = props.eggsproduction && props.eggsproduction
    
    let batches = batches_.filter(c=>c.status===true).map(w=>({...w}))

    // const batch_last = 1
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
  

    let eggssproduction_= eggsproduction.filter(a=> ((start_date===undefined||end_date===undefined)||(start_date===''||end_date===''))? a: a.prod_date>=start_date && a.prod_date<=end_date ).map(y=>({...y}))
    let eggs_production_0= eggssproduction_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let eggs_production = eggs_production_0.sort((a, b) => sortTable===true? new Date(b.prod_date_1) - new Date(a.prod_date_1):new Date(a.peod_date_1) - new Date(b.prod_date_1))


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



    const createEggProduction = (e) =>{
        handleSubmit (e);
        if(prod_date !== undefined && batch !== undefined && birds !== undefined && gross!== undefined && defects !== undefined && broken !== undefined && staff !== undefined){
            if(prod_date !=='' && batch !== '' && birds !== '' && gross !== '' && defects !== '' && broken !== '' && staff !== ''){
                LAYERS_PRODUCTION_API.addEggsProduction({prod_date, batch, birds, gross, defects, broken, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newEggProduction(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateEggProduction = eggs =>{
        handleSubmit (eggs);
        if(prod_date !== undefined && batch !== undefined && birds !== undefined && gross!== undefined && defects !== undefined && broken !== undefined && staff !== undefined){
            if(prod_date !=='' && batch !== '' && birds !== '' && gross !== '' && defects !== '' && broken !== '' && staff !== ''){
                LAYERS_PRODUCTION_API.updateEggsProduction(eggs_.id,{prod_date, batch, birds, gross, defects, broken, staff}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedEggProduction(resp))
                .catch(error => console.log(error))
                handleClose()

            }
        }return;

    }



    const deleteEggsProduction = eggs =>{
        LAYERS_PRODUCTION_API.removeEggsProduction(eggs.id, token['mr-token'])
        .then(()=>props.deletedEggProduction(eggs))
        .catch(error => console.log(error))
    }



    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdEggProduction();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

        //Pagination

    const [currentPage, setCurrentPage]= useState(1)
    const [recordsPerPage, setRecordsPerPage]= useState(10)

    const indexLastRecord = currentPage * recordsPerPage 
    const indexFirstRecord = indexLastRecord - recordsPerPage
    const eggs_production_paginated = eggs_production.slice(indexFirstRecord,indexLastRecord )
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
                            <CSVLink data={eggs_production} className='text-success'>
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
                        <th>Production Date
                            <OverlayTrigger overlay={<Tooltip variant="success">Sort</Tooltip>}>
                                {sortTable===true?

                                <MUIcons.ExpandLessSharp fontSize="small" onClick={sortByDate} />: 
                                <MUIcons.ExpandMoreSharp fontSize="small" onClick={sortByDate} />
                                }
                            </OverlayTrigger>
                        </th>
                        <th>Batch</th>
                        <th>Birds</th>
                        <th>Gross (Pcs)</th>
                        <th>Defects (Pcs)</th>
                        <th>Broken (Pcs)</th>
                        <th>Nett (Pcs)</th>
                        <th>Gross (Crates)</th>
                        <th>Nett (Crates)</th>
                        <th>Gross %</th>
                        <th>Nett %</th>
                        <th>Staff</th>
                        <th>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {eggs_production_paginated.map(eggs =>{
                        return (
                            <tr key={eggs.id}>
                                <td>{eggs.prod_date_1}</td>
                                <td>{eggs.batch_number}</td>
                                <td>{eggs.birds}</td>
                                <td>{eggs.gross}</td>
                                <td>{eggs.defects}</td>
                                <td>{eggs.broken}</td>
                                <td>{eggs.gross-eggs.defects-eggs.broken}</td>
                                <td>{(eggs.gross_crates).toFixed(2)}</td>
                                <td>{(eggs.net_crates).toFixed(2)}</td>
                                <td>{(eggs.gross_percentage).toFixed(1) +"%"}</td>
                                <td>{(eggs.net_percentage).toFixed(1) +"%"}</td>
                                <td>{eggs.staff_}</td>


                                <td>
                                    <FontAwesomeIcon 
                                        icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                        onClick={ () => {selectEggProduction(eggs)}}
                                    />
                                    
                                    <FontAwesomeIcon
                                        icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                        deleteEggsProduction(eggs) } }
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
                        totalRecords={eggs_production.length}
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
                <Modal.Title> {eggs_.id ? 'Edit Egg Production': 'Add Egg Production'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {eggs_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={5} lg={5}>
                                <Form.Group className="mb-2" controlId="productiondate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter Stock Date" required
                                        value={prod_date || ''} onChange={evt => setProductionDate(evt.target.value)}
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
                                            props.staffTeam && props.staffTeam.map(staff =>{
                                                return (<option key={staff.id} value={staff.id}>{staff.firstname}</option>)
                                                })
                                            }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="birds">
                                    <Form.Label>Number of Birds </Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Actual Number Birds" required 
                                        value={birds ||''} onChange={evt => setBirds(evt.target.value)}
                                    />
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="grosseggs">
                                    <Form.Label>Gross Production</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Gross Production" required
                                        value={gross || ''} onChange={evt => setGross(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="defects">
                                    <Form.Label>Defective Eggs</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Defects" required
                                        value={defects || ''} onChange={evt => setDefects(evt.target.value)}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-2" controlId="broken">
                                    <Form.Label>Broken Eggs</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Broken" required
                                        value={broken || ''} onChange={evt => setBroken(evt.target.value)}
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
                eggs_.id?(
                <Button variant="primary"  onClick={updateEggProduction}>
                Submit
                </Button>)  :(
                <Button variant="primary" onClick={createEggProduction}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {EggsProduction};