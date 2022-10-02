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



function VaccinationStatus(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const [batch, setBatch]=useState();
    
    const resetTable = () => {
        setBatch('')

    }

    var ms_per_day = 86400000//miliseconds in a day
    var today = Date.parse(new Date())

    
    const vaccineprogram = props.vaccineprogram && props.vaccineprogram

    

    const batches_ =props.batches && props.batches
    let batches = batches_.filter(e=>e.status===true).map(w=>({...w,"batch_id": w.id,"vaccine": null,"vaccine_1": null,"v_regimen":null}))
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]


    const vaccines_0 = props.vaccines && props.vaccines
    let vaccines=  vaccines_0.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x,"vaccination":x.vaccination, "expected_vaccination_date": new Date(Date.parse(x.delivery_date)+((x.vaccination_day)*86400000))}))

    const batch_vaccine_status_0 = vaccineprogram.map(a => ({
        ...a,
        batch_check: vaccines.find(b=>(batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch))),
        vaccination_status: vaccines.find(b => b.vaccination=== a.id)?true:false,
        vaccine_regimen_check:vaccines.find(b => b.vaccine_regimen=== a.vaccine_regimen),
        vaccine_type: vaccines.find(b => b.vaccination=== a.id)

    }));

    const batch_vaccine_status_1 = batch_vaccine_status_0.map(b=>({id_:b.id, vaccination_day_1:b.vaccination_day,vaccine_type_1:b.vaccine, ...b, ...b.batch_check, ...b.vaccine_type}))
    const batch_vaccine_status = batch_vaccine_status_1.filter(a=>a.vaccine_regimen_check!=undefined).map(b=>({...b, expected_vaccination_date_1: new Date(Date.parse(b.delivery_date)+((b.vaccination_day_1)*86400000))}))

    return(

        <div>
            
            <Container fluid>
                <Row className="tables">
                    <Row>
                        <Col sm={12} md={12} lg={8}>
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
                            <CSVLink data={batch_vaccine_status} className='text-success'>
                                <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                    <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                            <MUIcons.CloudDownloadRounded fontSize="small"/>
                                    </Button>
                                </OverlayTrigger>
                            </CSVLink>
                        </Col>

                    </Row>


                    <h6>Vaccination Status</h6>

                    <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                            <thead>
                                <tr>
                                    <th>Batch</th>
                                    <th>Delivery Date</th>
                                    <th>Regimen</th>
                                    <th>Week</th>
                                    <th>Day</th>
                                    <th>Vaccine</th>
                                    <th>Application Mode</th>
                                    <th>Expected Vaccination Day</th>
                                    <th>Vaccination Status</th>
                                    <th>Delay Notification</th>
                                    <th>Delay (Days)</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            {batch_vaccine_status.map(program=>{
                                return (
                                    <tr key={program.id_}>
                                        <td>{program.batch_number}</td>
                                        <td>{program.delivery_date}</td>
                                        <td>{program.vaccine_regimen}</td>
                                        <td>{program.week}</td>
                                        <td>{program.vaccination_day_1}</td>
                                        <td>{program.vaccine_type_1}</td>
                                        <td>{program.application_mode}</td>
                                        <td>{program.expected_vaccination_date_1.toLocaleDateString("en-US", { day: 'numeric' }) + "-"+ program.expected_vaccination_date.toLocaleDateString("en-US", { month: 'short' }) + "-" + program.expected_vaccination_date.toLocaleDateString("en-US", { year: 'numeric' })}</td>
                                        <td>
                                            {program.vaccination_status===true? 
                                            <MUIcons.CheckCircleOutline  style={{ color: '#28a745', fontSize: '18px'}}  />:
                                            parseInt((today-Date.parse(program.expected_vaccination_date_1))/ms_per_day)<=0? 
                                            <MUIcons.CancelOutlined  style={{ color: '#FFA900', fontSize: '18px'}} />:
                                            <MUIcons.CancelOutlined  style={{ color: '#dc3545', fontSize: '18px'}} />
                                            }
                                        </td>
                                        <td>
                                            {program.vaccination_status===true? <MUIcons.HorizontalRuleOutlined style={{ color: '#28a745', fontSize: '18px'}} />:
                                            parseInt((today-Date.parse(program.expected_vaccination_date_1))/ms_per_day)<=0? 
                                            <MUIcons.Notifications  style={{ color: '#28a745', fontSize: '18px'}} />:
                                            <MUIcons.Notifications  style={{ color: '#dc3545', fontSize: '18px'}} /> 
                                            }
                                        </td>
                                        <td>{program.vaccination_status===true? <MUIcons.HorizontalRuleOutlined style={{ color: '#28a745', fontSize: '18px'}} />:
                                            parseInt((today-Date.parse(program.expected_vaccination_date_1))/ms_per_day)<=0?'-':
                                            parseInt((today-Date.parse(program.expected_vaccination_date_1))/ms_per_day)
                                            }
                                        </td>





                                    </tr>
                                ) 
                            })}
                            </tbody>
                    </Table>




            </Row>

            
        </Container>

        </div>
 
 )

}

export {VaccinationStatus};