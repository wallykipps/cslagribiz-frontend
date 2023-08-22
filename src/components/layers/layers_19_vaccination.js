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



function Vaccination(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectVaccine = vaccine =>{
        props.selectVaccine(vaccine);
        handleShow();
    }

    const vaccine_ = props.vaccine;

    const [vaccination_date, setVaccinationDate]=useState();
    const [batch, setBatch]=useState();
    const [vaccination, setVaccination]=useState();
    const [vet_agrovet, setVetAgrovet]=useState('');
    const [comments, setComments]=useState();
    const [implementedby, setImplementedBy]=useState();

  
    var ms_per_day = 86400000//miliseconds in a day
    var today = Date.parse(new Date())
    
    // var vac_date_exp_1 = new Date(Date.parse(vaccination_date)+(2*86400000))
    
    useEffect(()=>{
        setVaccinationDate(vaccine_.vaccination_date);
        setBatch(vaccine_.batch);
        setVaccination(vaccine_.vaccination);
        setVetAgrovet(vaccine_.vet_agrovet);
        setComments(vaccine_.comments);
        setImplementedBy(vaccine_.implementedby);

    }, [vaccine_])

    const resetTable = () => {
        setBatch('')

    }

    const staffteam = props.staffTeam && props.staffTeam
    const batches_ =props.batches && props.batches
    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))

    const vaccineprogram = props.vaccineprogram && props.vaccineprogram

    //Vaccination data
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]

    let batchFilterVaccination = props.batchFilterVaccination
    let setBatchFilterVaccination = props.setBatchFilterVaccination
    let batch_filter = batches_1[batchFilterVaccination-1]




    const vaccines_ = props.vaccines && props.vaccines
    // let vaccines = vaccines_.map( x => ({...x, expected_vaccination_date: new Date(Date.parse(x.delivery_date)+((x.vaccination_day)*86400000))}))
    let vaccines = vaccines_.map( x => ({...x, expected_vaccination_date: new Date (Date.parse(x.delivery_date)+((x.vaccination_day)*86400000)).toLocaleDateString()}))

    // let vaccines=  vaccines_1.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, "expected_vaccination_date": new Date(Date.parse(x.delivery_date)+((x.vaccination_day)*86400000))}))

    //Vaccine Notifications
    const [vaccine_notificattion, setVacccineNotification]=useState();
    

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
  
    const createVaccine= (e) =>{
        handleSubmit (e);
        if(vaccination_date !== undefined && batch !== undefined && vaccination!== undefined && vet_agrovet !== undefined && comments !== undefined && implementedby !== undefined ){
            if(vaccination_date !=='' && batch !=='' && vaccination !=='' && vet_agrovet !=='' && comments !=='' &&  implementedby !=='' ){
                LAYERS_PRODUCTION_API.addVaccination({vaccination_date, batch,vaccination, vet_agrovet, comments, implementedby}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newVaccine(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateVaccine= vaccine =>{
        handleSubmit (vaccine);
        if(vaccination_date !== undefined && batch !== undefined && vaccination!== undefined && vet_agrovet !== undefined && comments !== undefined && implementedby !== undefined ){
            if(vaccination_date !=='' && batch !=='' && vaccination !=='' && vet_agrovet !=='' && comments !=='' &&  implementedby !=='' ){
                LAYERS_PRODUCTION_API.updateVaccination(vaccine_.id,{vaccination_date, batch,vaccination, vet_agrovet, comments, implementedby}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedVaccine(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteVaccine= vaccine =>{
        LAYERS_PRODUCTION_API.removeVaccination(vaccine.id, token['mr-token'])
        .then(()=>props.deletedVaccine(vaccine))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdVaccine();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    
    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                        <Col sm={12} md={12} lg={8}>
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
                                        value={batch_filter || ''}
                                        onChange={evt => setBatchFilterVaccination(evt.target.value)}
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

                        <Col sm={12} md={12} lg={1}>
                            <OverlayTrigger overlay={<Tooltip variant="success">Refresh Records</Tooltip>}>
                            <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={resetTable}>
                                <FontAwesomeIcon icon={faSyncAlt} size="lg"/>
                            </Button>
                            </OverlayTrigger>
                        </Col>

                        <Col sm={12} md={12} lg={1}>
                            <CSVLink data={vaccines} className='text-success'>
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
                                <th>Vaccination Date</th>
                                <th>Batch</th>
                                <th>Delivery Date</th>
                                <th>Regimen</th>
                                <th>Vaccination</th>
                                <th>Expected Vaccination Day</th>
                                <th>Expected Vaccination Date</th>
                                <th>Vet/Agrovet</th>
                                <th>Comments</th>
                                <th>Perfomed By</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {vaccines.map(vaccine=>{
                            return (
                                <tr key={vaccine.id}>
                                    <td>{vaccine.vaccination_date_1}</td>
                                    <td>{vaccine.batch_number}</td>
                                    <td>{vaccine.delivery_date}</td>
                                    <td>{vaccine.vaccine_regimen}</td>
                                    <td>{vaccine.vaccine}</td>
                                    <td>{vaccine.vaccination_day}</td>
                                    <td>{vaccine.expected_vaccination_date}</td>
                                    {/* <td>{(vaccine.expected_vaccination_date).toLocaleDateString()}</td> */}
                                    {/* <td>{(vaccine.expected_vaccination_date).toLocaleDateString('en-us', { day: "numeric",month:"short",year:"numeric"})}</td> */}
                                    <td>{vaccine.vet_agrovet}</td>
                                    <td>{vaccine.comments}</td>
                                    <td>{vaccine.staff}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectVaccine(vaccine)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteVaccine(vaccine) } }
                                        />
                                    </td>

                                </tr>
                            ) 
                        })}
                        </tbody>
                </Table>
            </Row>

            
        </Container>

        {/* <h1>{product_.id? 'Eggs': 'Not Eggs'}</h1> */}

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {vaccine_.id ? 'Edit Feed Type': 'Add Feed Type'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {vaccine_ ? (
                    <div>
                        <Row>
                            <Row>
                            
                                <Col>
                                    <Form.Group className="mb-2" controlId="date">
                                        <Form.Label>Date:</Form.Label>
                                        <Form.Control type="date" placeholder="Enter Date" required
                                            value={vaccination_date|| ''} onChange={evt => setVaccinationDate(evt.target.value)}
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="batch">
                                        <Form.Label>Batch:</Form.Label>
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

                                    <Form.Group className="mb-2" controlId="vetagrovet">
                                        <Form.Label> Vet/Agrovet:</Form.Label>
                                        <Form.Control type="text" placeholder="Agrovet/Vet" required
                                            value={vet_agrovet|| ''} onChange={evt => setVetAgrovet(evt.target.value)}
                                            />
                                    </Form.Group>

                                </Col>
                                <Col>
                                  <Form.Group className="mb-2" controlId="vaccination">
                                        <Form.Label>Vaccination:</Form.Label>
                                        <Form.Select
                                            as="select"
                                            value={vaccination || ''}
                                            onChange={evt => setVaccination(evt.target.value)}
                                            required
                                        >
                                            <option value=''>Select...</option>
                                            
                                            {
                                                vaccineprogram.map(vaccine_ =>{
                                                    return (<option key={vaccine_.id} value={vaccine_.id}>{vaccine_.vaccine_regimen}-{vaccine_.vaccine}</option>)
                                                    })
                                                }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="staff">
                                        <Form.Label>Staff:</Form.Label>
                                        <Form.Select
                                            as="select"
                                            value={implementedby || ''}
                                            onChange={evt => setImplementedBy(evt.target.value)}
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

                                    <Form.Group className="mb-2" controlId="comments">
                                        <Form.Label>Comments:</Form.Label>
                                        <Form.Control type="text" placeholder="Comments" required
                                            value={comments|| ''} onChange={evt => setComments(evt.target.value)}
                                            />
                                    </Form.Group>

                                
                                </Col>
                            </Row>

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
                vaccine_.id?(
                <Button variant="primary"  onClick={updateVaccine}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createVaccine}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Vaccination};