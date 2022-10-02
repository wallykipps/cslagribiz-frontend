import React, {useState, useEffect} from "react";
import { Row, Col, Table, Button, Container, Modal, Form} from "react-bootstrap";
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import {useCookies} from 'react-cookie';
// import EnterpriseDashboard from "../enterprises/enterprise_dashboard";

function BatchForm(props){
    const batch_ = props.batch;
    const [delivery_date_1, setDeliveryDate]=useState();
    const [batch, setBatch]=useState();
    const [supplier, setSupplier]=useState();
    const [breed, setBreed]=useState();
    const [ordered_birds, setOrderedBirds]=useState();
    const [delivered_birds, setDeliveredBirds]=useState();
    const [unitprice, setUnitPrice]=useState();
    const [businessunit, setBusinessUnit]=useState();
    const [enterprisetype, setEnterpriseType]=useState();

    useEffect(()=>{
        setDeliveryDate(batch_.delivery_date_1);
        setBatch(batch_.batch);
        setSupplier(batch_.supplier);
        setBreed(batch_.breed);
        setOrderedBirds(batch_.ordered_birds);
        setDeliveredBirds(batch_.delivered_birds);
        setUnitPrice(batch_.unitprice);
        setBusinessUnit(batch_.businessunit);
        setEnterpriseType(batch_.businessunit);
    }, [batch_])


    const updateBatch = () => {
        console.log('updatetest')

    }

    return(
        
       
        <React.Fragment>
        {batch_ ? (
            <div>
                <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="deliverydate">
                                <Form.Label>Delivery Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Delivery Date" 
                                    value={delivery_date_1|| ''} onChange={evt => setDeliveryDate(evt.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="batch">
                                <Form.Label>Batch</Form.Label>
                                <Form.Control type="text" placeholder="Enter Batch" 
                                    value={batch|| ''} onChange={evt => setBatch(evt.target.value)}
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="supplier">
                                <Form.Label>Supplier</Form.Label>
                                <Form.Control type="text" placeholder="Enter Supplier" 
                                    value={supplier} onChange={evt => setSupplier(evt.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="breed">
                                <Form.Label>Breed</Form.Label>
                                <Form.Control type="text" placeholder="Enter Breed" 
                                    value={breed|| ''} onChange={evt => setBreed(evt.target.value)}
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="supplier">
                                <Form.Label>Ordered Birds</Form.Label>
                                <Form.Control type="interger" placeholder="Enter Ordered Birds" 
                                    value={ordered_birds|| ''} onChange={evt => setOrderedBirds(evt.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="deliveredbirds">
                                <Form.Label>Delivered Birds</Form.Label>
                                <Form.Control type="interger" placeholder="Enter Delivered Birds" 
                                    value={delivered_birds || ''} onChange={evt => setDeliveredBirds(evt.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="unitprice">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control type="decimal" placeholder="Enter Unit Price" 
                                    value={unitprice || ''} onChange={evt => setUnitPrice(evt.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="businessunit">
                                <Form.Label>Business Unit</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={batch_.businessunit}
                                    onChange={evt => setBusinessUnit(evt.target.value)}
                                >
                                    <option value=''>Select...</option>
                                    
                                    {
                                        props.businessunits && props.businessunits.map(enterprise =>{
                                            return (<option key={enterprise.id} value={enterprise.id}>{enterprise.unit}</option>)
                                            })
                                        }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="enterprisetype">
                                <Form.Label>Enterprise Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={batch_.enterprisetype}
                                    onChange={evt => setEnterpriseType(evt.target.value)}
                                >
                                    <option value=''>Select...</option>
                                    
                                    {
                                        props.enterprisetypes && props.enterprisetypes.map(type =>{
                                            return (<option key={type.id} value={type.id}>{type.unit}</option>)
                                            })
                                        }
                                </Form.Control>
                            </Form.Group>





                            {batch_.id ?
                            <Button variant="primary" type="submit" onClick={updateBatch}>
                            Submit
                            </Button>  :
                            <Button variant="primary" type="submit" >
                                Submit
                            </Button> 
                            }


                        </Form>
                </Container>
            </div>
        ): null}
        </React.Fragment>
    
    )

}

export default BatchForm;