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



function VaccinationProgram(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectVaccineProgram = program =>{
        props.selectVaccineProgram(program);
        handleShow();
    }

    const program_ = props.program;
    
    const [vaccine_regimen, setVaccineRegimen]=useState();
    const [week, setWeek]=useState();
    const [vaccination_day, setVaccinationDay]=useState();
    const [vaccine, setVaccine]=useState('');
    const [application_mode, setApplicationMode]=useState();

    const [vaccine_regimen_, setVaccineRegimen_]=useState();
    
    const resetTable = () => {
        setVaccineRegimen_('')

    }


    useEffect(()=>{
        setVaccineRegimen(program_.vaccine_regimen);
        setWeek(program_.week);
        setVaccinationDay(program_.vaccination_day);
        setVaccine(program_.vaccine);
        setApplicationMode(program_.application_mode);

    }, [program_])

    var vaccine_regimen_type = 1

    
    const vaccineprogram_0 = props.vaccineprogram && props.vaccineprogram
    let vaccineprogram =  vaccineprogram_0.filter(b => (vaccine_regimen_===undefined||vaccine_regimen_==='')? (b.vaccine_regimen ===vaccine_regimen_type ) : (b.vaccine_regimen ===parseInt(vaccine_regimen_)) ).map( x => ({...x}))
    
    const vaccine_regimens_0  = vaccineprogram_0.map(a=>a.vaccine_regimen)
    const vaccine_regimens_1 = [... new Set(vaccine_regimens_0)];
    const vaccine_regimens = vaccine_regimens_1.map((a,key)=>({"id":key+1,"vaccine_regimen":a})) 

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

  
    const createVaccineProgram= (e) =>{
        handleSubmit (e);
        if(vaccine_regimen !== undefined && week !== undefined &&  vaccine !== undefined && vaccination_day !== undefined && application_mode !== undefined ){
            if(vaccine_regimen !== '' && week !=='' && vaccine !== '' && vaccination_day !=='' && application_mode !=='' ){
                LAYERS_PRODUCTION_API.addVaccinationProgram({vaccine_regimen, week, vaccine, vaccination_day, application_mode}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newVaccineProgram(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateVaccineProgram= program =>{
        handleSubmit (program);
        if(vaccine_regimen !== undefined && week !== undefined && vaccine !== undefined && vaccination_day !== undefined && application_mode !== undefined ){
            if(vaccine_regimen !=='' && week !=='' && vaccine !== ''  && vaccination_day !=='' && application_mode !=='' ){
                LAYERS_PRODUCTION_API.updateVaccinationProgram(program_.id,{vaccine_regimen, week, vaccine, vaccination_day, application_mode}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedVaccineProgram(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteVaccineProgram= program =>{
        LAYERS_PRODUCTION_API.removeVaccinationProgram(program.id, token['mr-token'])
        .then(()=>props.deletedVaccineProgram(program))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdVaccineProgram();
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
                            <OverlayTrigger overlay={<Tooltip>Select Regimen Filter</Tooltip>}>
                            <InputGroup  className="mb-2" size="sm">
                                <InputGroup.Text >Regimen</InputGroup.Text>
                                    <Form.Select
                                        size="sm"
                                        value={vaccine_regimen_ || ''}
                                        onChange={evt => setVaccineRegimen_(evt.target.value)}
                                    >
                                        <option value=''>...</option>
                                            {
                                                vaccine_regimens.map(regimen =>{
                                                    return (<option key={regimen.vaccine_regimen} value={regimen.id}>{regimen.vaccine_regimen}</option>)
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
                            <CSVLink data={vaccineprogram} className='text-success'>
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
                                <th>Regimen</th>
                                <th>Week</th>
                                <th>Expected Vaccination Day</th>
                                <th>Vaccine</th>
                                <th>Application Mode</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {vaccineprogram.map(program=>{
                            return (
                                <tr key={program.id}>
                                    <td>{program.vaccine_regimen}</td>
                                    <td>{program.week}</td>
                                    <td>{program.vaccination_day}</td>
                                    <td>{program.vaccine}</td>
                                    <td>{program.application_mode}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectVaccineProgram(program)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteVaccineProgram(program) } }
                                        />
                                    </td>

                                </tr>
                            ) 
                        })}
                        </tbody>
                    </Table>

            </Row>

        </Container>

        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title> {program_.id ? 'Edit Feed Type': 'Add Feed Type'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {program_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>

                                <Form.Group className="mb-2" controlId="vaccineregimen">
                                    <Form.Label>Vaccine Regimen:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Vaccine Regimen" required
                                        value={vaccine_regimen || ''} onChange={evt => setVaccineRegimen(evt.target.value)}
                                        />
                                </Form.Group>



                                <Form.Group className="mb-2" controlId="week">
                                    <Form.Label>Week:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Week" required
                                        value={week || ''} onChange={evt => setWeek(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="vaccinationday">
                                    <Form.Label>Vaccination Day:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Vaccination Day" required
                                        value={vaccination_day || ''} onChange={evt => setVaccinationDay(evt.target.value)}
                                        />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="vaccine">
                                    <Form.Label>Vaccine:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Vaccine" required
                                        value={vaccine || ''} onChange={evt => setVaccine(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="applicationmode">
                                    <Form.Label>Application Mode:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Application Mode" required
                                        value={application_mode || ''} onChange={evt => setApplicationMode(evt.target.value)}
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
                program_.id?(
                <Button variant="primary"  onClick={updateVaccineProgram}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createVaccineProgram}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {VaccinationProgram};