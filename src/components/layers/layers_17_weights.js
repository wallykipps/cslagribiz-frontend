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



function Weights(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectWeight = weight =>{
        props.selectWeight(weight);
        handleShow();
    }

    const weight_ = props.weight;

    
    const [weight_date, setWeightDate]=useState();
    const [batch, setBatch]=useState();
    const [week, setWeek]=useState();
    const [actual_maximum_weight, setMaxWeight]=useState('');
    const [actual_minimum_weight, setMinWeight]=useState();
    const [actual_average_weight, setAvgWeight]=useState();
    const [measuredby, setMeasuredBy]=useState();

    useEffect(()=>{
        setWeightDate(weight_.weight_date);
        setBatch(weight_.batch);
        setWeek(weight_.week);
        setMaxWeight(weight_.actual_maximum_weight);
        setMinWeight(weight_.actual_minimum_weight);
        setAvgWeight(weight_.actual_average_weight);
        setMeasuredBy(weight_.measuredby);

    }, [weight_])

    const resetTable = () => {
        setBatch('')

    }

    const staffteam = props.staffTeam && props.staffTeam
    const batches_ =props.batches && props.batches
    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))

    const weighttargets= props.weighttargets && props.weighttargets

    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]



    const weights_1 = props.weights && props.weights
    let weights =  weights_1.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))



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
  

    const createWeight= (e) =>{
        handleSubmit (e);
        if(weight_date !== undefined && batch !== undefined && week !== undefined && actual_maximum_weight !== undefined && actual_minimum_weight !== undefined && actual_average_weight !== undefined && measuredby !== undefined ){
            if(weight_date !=='' && batch !=='' && week !=='' && actual_maximum_weight !=='' && actual_minimum_weight !=='' && actual_average_weight!== '' && measuredby !=='' ){
                LAYERS_PRODUCTION_API.addWeightMonitoring({weight_date, batch, week, actual_maximum_weight, actual_minimum_weight, actual_average_weight, measuredby}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newWeight(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateWeight= weight =>{
        handleSubmit (weight);
        if(weight_date !== undefined && batch !== undefined && week !== undefined && actual_maximum_weight !== undefined && actual_minimum_weight !== undefined && actual_average_weight !== undefined && measuredby !== undefined ){
            if(weight_date !=='' && batch !=='' && week !=='' && actual_maximum_weight !=='' && actual_minimum_weight !=='' && actual_average_weight!== '' && measuredby !=='' ){
                LAYERS_PRODUCTION_API.updateWeightMonitoring(weight_.id,{weight_date, batch, week, actual_maximum_weight, actual_minimum_weight, actual_average_weight, measuredby}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedWeight(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteWeight= weight =>{
        LAYERS_PRODUCTION_API.removeWeightMonitoring(weight.id, token['mr-token'])
        .then(()=>props.deletedWeight(weight))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdWeight();
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

                    <Col sm={12} md={12} lg={1}>
                        <OverlayTrigger overlay={<Tooltip variant="success">Refresh Records</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={resetTable}>
                            <FontAwesomeIcon icon={faSyncAlt} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>

                    <Col sm={12} md={12} lg={1}>
                        <CSVLink data={weights} className='text-success'>
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
                                <th>Date</th>
                                <th>Batch</th>
                                <th>Week</th>
                                <th>Average Target Weight (g)</th>
                                <th>Maximum Weight (g)</th>
                                <th>Minimum Weight (g)</th>
                                <th>Average Weight (g)</th>
                                <th>%</th>
                                <th>Measured By</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {weights.map(weight=>{
                            return (
                                <tr key={weight.id}>
                                    <td>{weight.weight_date_1}</td>
                                    <td>{weight.batch_number}</td>
                                    <td>{weight.weight_week}</td>
                                    <td>{weight.average_weight_target}</td>
                                    <td>{weight.actual_maximum_weight}</td>
                                    <td>{weight.actual_minimum_weight}</td>
                                    <td>{weight.actual_average_weight}</td>
                                    <td>{(weight.actual_average_weight/weight.average_weight_target*100).toFixed(1) +"%"}</td>
                                    <td>{weight.staff}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectWeight(weight)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteWeight(weight) } }
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
                <Modal.Title> {weight_.id ? 'Edit Feed Type': 'Add Feed Type'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {weight_ ? (
                    <div>
                        <Row>
                            <Row>
                            
                                <Col>
                                    <Form.Group className="mb-2" controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" placeholder="Enter Date" required
                                            value={weight_date|| ''} onChange={evt => setWeightDate(evt.target.value)}
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
                                <Form.Group className="mb-2" controlId="week">
                                        <Form.Label>Week</Form.Label>
                                        <Form.Select
                                            as="select"
                                            value={week || ''}
                                            onChange={evt => setWeek(evt.target.value)}
                                            required
                                        >
                                            <option value=''>Select...</option>
                                            
                                            {
                                                weighttargets.map(weighttarget =>{
                                                    return (<option key={weighttarget.id} value={weighttarget.week}>{weighttarget.week}</option>)
                                                    })
                                                }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="staff">
                                        <Form.Label>Staff</Form.Label>
                                        <Form.Select
                                            as="select"
                                            value={measuredby || ''}
                                            onChange={evt => setMeasuredBy(evt.target.value)}
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
                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" controlId="max_weight">
                                        <Form.Label>Maximum Weight:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Maximum Weight in g" required
                                            value={actual_maximum_weight|| ''} onChange={evt => setMaxWeight(evt.target.value)}
                                            />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="averagetargetweight">
                                        <Form.Label>Minimum Weight:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Minimum Weight in g" required
                                            value={actual_minimum_weight|| ''} onChange={evt => setMinWeight(evt.target.value)}
                                            />
                                    </Form.Group>


                                    <Form.Group className="mb-2" controlId="averagetargetweight">
                                        <Form.Label>Average Weight:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Average Weight in g" required
                                            value={actual_average_weight|| ''} onChange={evt => setAvgWeight(evt.target.value)}
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
                weight_.id?(
                <Button variant="primary"  onClick={updateWeight}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createWeight}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {Weights};