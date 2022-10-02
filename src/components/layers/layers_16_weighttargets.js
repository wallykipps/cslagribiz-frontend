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



function WeightTargets(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectWeightTarget = weighttarget =>{
        props.selectWeightTarget(weighttarget);
        handleShow();
    }

    const weighttarget_ = props.weighttarget;
    
    const [week, setWeek]=useState();
    const [weight_range, setWeightRange]=useState('');
    const [target_average_weight, setTargetAverageWeight]=useState();



    useEffect(()=>{
        setWeek(weighttarget_.week);
        setWeightRange(weighttarget_.weight_range);
        setTargetAverageWeight(weighttarget_.target_average_weight);

    }, [weighttarget_])

    const weighttargets= props.weighttargets && props.weighttargets


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
  
    const createWeightTarget= (e) =>{
        handleSubmit (e);
        if(week !== undefined && weight_range !== undefined && target_average_weight !== undefined ){
            if(week !=='' && weight_range !== '' && target_average_weight !=='' ){
                LAYERS_PRODUCTION_API.addWeightTargets({week, weight_range, target_average_weight}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newWeightTarget(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateWeightTarget= weighttarget =>{
        handleSubmit (weighttarget);
        if(week !== undefined && weight_range !== undefined && target_average_weight !== undefined){
            if(week !=='' && weight_range !== '' && target_average_weight !==''){
                LAYERS_PRODUCTION_API.updateWeightTargets(weighttarget_.id,{week, weight_range, target_average_weight}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedWeightTarget(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteWeightTarget= weighttarget =>{
        LAYERS_PRODUCTION_API.removeWeightTargets(weighttarget.id, token['mr-token'])
        .then(()=>props.deletedWeightTarget(weighttarget))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdWeightTarget();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    
    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                    <Col sm={6} md={11} lg={11}>
                        <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                        <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                        </Button>
                        </OverlayTrigger>
                    </Col>
                    <Col sm={6} md={1} lg={1}>
                        <CSVLink data={weighttargets} className='text-success'>
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
                                <th>Week</th>
                                <th>Weight Range (g)</th>
                                <th>Average Target Weight (g)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {weighttargets.map(weighttarget=>{
                            return (
                                <tr key={weighttarget.id}>
                                    <td>{weighttarget.week}</td>
                                    <td>{weighttarget.weight_range}</td>
                                    <td>{weighttarget.target_average_weight}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectWeightTarget(weighttarget)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteWeightTarget(weighttarget) } }
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
                <Modal.Title> {weighttarget_.id ? 'Edit Feed Type': 'Add Feed Type'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {weighttarget_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>


                                <Form.Group className="mb-2" controlId="week">
                                    <Form.Label>Week:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Week" required
                                        value={week || ''} onChange={evt => setWeek(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="weightrange">
                                    <Form.Label>Weight Range (g):</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Weight Range" required
                                        value={weight_range || ''} onChange={evt => setWeightRange(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="averagetargetweight">
                                    <Form.Label>Average Target Weight (g):</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Average Target Weight" required
                                        value={target_average_weight|| ''} onChange={evt => setTargetAverageWeight(evt.target.value)}
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
                weighttarget_.id?(
                <Button variant="primary"  onClick={updateWeightTarget}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createWeightTarget}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {WeightTargets};