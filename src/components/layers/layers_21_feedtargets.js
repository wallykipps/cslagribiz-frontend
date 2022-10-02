import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip, Stack,Card, Alert} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import LAYERS_PRODUCTION_API from '../../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import Paginate from '../pagination'
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";



function FeedTargets(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const selectFeedTarget = feed =>{
        props.selectFeedTarget(feed);
        handleShow();
    }

    const feed_ = props.feed;
    // console.log(feed_)

       
    const [feed_type, setFeedType]=useState();
    const [week, setWeek]=useState();
    const [weeks, setWeeks]=useState('');
    const [weekly_feed_per_bird, setWeeklyFeedPerBird]=useState();
    
    


    useEffect(()=>{
        setFeedType(feed_.feed_type);
        setWeek(feed_.week);
        setWeeks(feed_.weeks);
        setWeeklyFeedPerBird(feed_.weekly_feed_per_bird);

    }, [feed_])

    const [feed_type_, setFeedType_]=useState();
    const [batch, setBatch]=useState();
    // console.log(feed_type_)

    const resetTable = () => {
        setFeedType_('')
        setBatch('')
    }

    var ms_per_week = 86400000*7//miliseconds in a day
    const feed_default = "Chick Mash"
    
    const batches_ =props.batches && props.batches
    let batches = batches_.filter(e=>e.status===true).map(w=>({...w}))
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]

    const birds_delivered=parseInt(batches.map(y=>y.delivered_birds))
    console.log(batches)
    console.log(birds_delivered)



    const costcategories_0= props.costcategories && props.costcategories
    let costcategories =  costcategories_0.filter(d =>  (d.id === 1)||(d.id === 2)||(d.id === 3) ).map( y => ({...y}))

    const birds_stock_0 = props.birds && props.birds
    // let birds_stock_1= birds_stock_0.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let birds_stock_1=  birds_stock_0.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, 'birds_week': (Date.parse(new Date(x.stock_date))-Date.parse(new Date(x.delivery_date)))/(ms_per_week)===0? 1: Math.ceil((Date.parse(new Date(x.stock_date))-Date.parse(new Date(x.delivery_date)))/(ms_per_week))}))
    console.log(birds_stock_0)

    const birds_stock = [...birds_stock_1.reduce((r, o) => {
        const key = o.birds_week;
        
        const item = r.get(key) || Object.assign({}, o, {
          birds_actual: 0,
        });
        
        item.birds_actual+= o.birds;
      
        return r.set(key, item);
      }, new Map).values()];
      
      console.log(birds_stock);

    
    const feedinventory_0 = props.feedinventory && props.feedinventory
    let feedinventory_1= feedinventory_0.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let feedinventory_2 = feedinventory_1.filter(c => (feed_type_===undefined||feed_type_==='')? (c.feed_type_1 ===feed_default): (c.feed_type_1 ===feed_type_) ).map( y => ({...y, "bags_delivered": parseInt(y.stock_in),'feeds_week': (Date.parse(new Date(y.stock_date))-Date.parse(new Date(y.delivery_date)))/(ms_per_week)===0?1: Math.ceil((Date.parse(new Date(y.stock_date))-Date.parse(new Date(y.delivery_date)))/(ms_per_week))}))
    console.log(feedinventory_2)

    // let bags_delivered_acc = 0
    // let feedinventory_3 = feedinventory_2.map( x => ({...x,"total_bags_delivered": bags_delivered_acc +=parseInt(x.bags_delivered)}))
    // let feedinventory_4 = feedinventory_3.map( x => ({...x, "total_bags_consumed": x.total_bags_delivered-parseInt(x.bags_balance)}))
    // console.log(feedinventory_4);


    const feedinventory = [...feedinventory_2.reduce((r, o) => {
        const key = o.feeds_week + '-' + o.feed_type_1;
        
        const item = r.get(key) || Object.assign({}, o, {
          bags_delivered_weekly: 0,
          bags_consumed_weekly: 0,
        });
        
        item.bags_delivered_weekly+= o.bags_delivered;
        item.bags_consumed_weekly+= parseInt(o.bags_consumed);
      
        return r.set(key, item);
      }, new Map).values()];
      
      console.log(feedinventory);

    

    const feeds_consumption_0 = feedinventory.map(a => ({
        ...a,
        birds_check: birds_stock.find(b => b.birds_week=== a.feeds_week)

    }));

    console.log(feeds_consumption_0)

    const feeds_consumption_1 = feeds_consumption_0.map(a=>({...a, ...a.birds_check}))
    const feeds_consumption = feeds_consumption_1.map(a=>({...a, birds_actual: a.birds_check===undefined?birds_delivered:a.birds_actual}))
    console.log(feeds_consumption_1)
    console.log(feeds_consumption)
    
    
    
    const feedtargets_0 = props.feedtargets && props.feedtargets
    let feedtargets =  feedtargets_0.filter(c => (feed_type_===undefined||feed_type_==='')? (c.feed_type_1 ===feed_default): (c.feed_type_1 ===feed_type_) ).map( y => ({...y}))
    console.log(feedtargets)
    
    let birds_stock_length = birds_stock.length
    let feedinventory_length = feedinventory.length
    let feedtargets_length = feedtargets.length
    
    // console.log(birds_stock_length)
    // console.log(feedinventory_length)
    // console.log(feedtargets_length)


    const feeds_status_0 = feeds_consumption.map(a => ({
        ...a,
        week_: feedtargets.find(b => parseInt(b.week)=== a.feeds_week)?true:false,
        birds_check: feedtargets.find(b => parseInt(b.week)=== a.birds_week)?true:false,
        weekly_feed_targets: feedtargets.find(b => parseInt(b.week)=== a.feeds_week)?feedtargets.find(b => parseInt(b.week)=== a.feeds_week):feedtargets[feedtargets_length-1],
        // weekly_feed_targets: feedtargets.find(b => parseInt(b.week)=== a.feeds_week)
        // last_weekly:feedtargets[feedtargets_length-1]

    }));
    console.log(feeds_status_0)


    const feeds_status_1 = feeds_status_0.map(a=>({...a,
        ...a.week_,
        ...a.weekly_feed_targets,
        feed_targets_length_check:a.feeds_week<=[feedtargets_length]?true:false
    }))
    console.log(feeds_status_1)

    const feeds_status = feeds_status_1.filter(a=>a.week_===true).map(b=>({
        ...b,
        weekly_feeds_target: (b.birds_actual*parseInt(b.weekly_feed_per_bird))/50000
    
    }))

    // console.log(feeds_status)



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

  
    const createFeedTarget= (e) =>{
        handleSubmit (e);
        if(feed_type !== undefined && week !== undefined &&  weeks !== undefined && weekly_feed_per_bird !== undefined){
            console.log(feed_type)
            console.log(week)
            console.log(weeks)
            console.log(weekly_feed_per_bird)
            if(feed_type !== '' && week !=='' && weeks !== '' && weekly_feed_per_bird !==''){
                LAYERS_PRODUCTION_API.addFeedTargets({feed_type, week, weeks, weekly_feed_per_bird}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.newFeedTarget(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;
    }

    const updateFeedTarget= feed =>{
        handleSubmit (feed);
        if(feed_type !== undefined && week !== undefined &&  weeks !== undefined && weekly_feed_per_bird !== undefined ){
            if(feed_type !== '' && week !=='' && weeks !== '' && weekly_feed_per_bird !==''){
                LAYERS_PRODUCTION_API.updateFeedTargets(feed_.id,{feed_type, week, weeks, weekly_feed_per_bird}, token['mr-token'])
                // .then(resp => console.log(resp))
                .then(resp => props.updatedFeedTarget(resp))
                .catch(error => console.log(error))
                handleClose()
            }
        }return;

    }


    const deleteFeedTarget= feed =>{
        LAYERS_PRODUCTION_API.removeFeedTargets(feed.id, token['mr-token'])
        .then(()=>props.deletedFeedTarget(feed))
        .catch(error => console.log(error))
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        props.createdFeedTarget();
        setShow(false);
        setValidated(false);
        
    }
    const handleShow = () => setShow(true);

    
    return(

        <div>
            
            <Container fluid>
                <Row>
                    <Col>
                        {birds_stock_length===feedinventory_length?
                            "":
                            <Alert variant="danger">
                                Alert!! Birds Stock or Feeds Inventory is not up to date
                            </Alert>
                        }
                        
                    </Col>

                </Row>


                
                <Row className="tables">
                    <Row>
                        <h5>Feed Targets</h5>
                    </Row>

                    <Row>
                        <Col sm={1} md={3} lg={5}>
                            <OverlayTrigger overlay={<Tooltip >Add Record</Tooltip>}>
                            <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={handleShow}>
                            <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                            </Button>
                            </OverlayTrigger>
                        </Col>

                        <Col sm={4} md={3} lg={2}>
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


                        <Col sm={5} md={3} lg={3}>
                            <OverlayTrigger overlay={<Tooltip>Select Feed Type Filter</Tooltip>}>
                            <InputGroup  className="mb-2" size="sm">
                                <InputGroup.Text >Feed Type</InputGroup.Text>
                                    <Form.Select
                                        size="sm"
                                        value={feed_type_ || ''}
                                        onChange={evt => setFeedType_(evt.target.value)}
                                    >
                                        <option value=''>...</option>costcategories
                                            {
                                                costcategories.map(feedtype =>{
                                                    return (<option key={feedtype.id} value={feedtype.cost_sub_category}>{feedtype.cost_sub_category}</option>)
                                                    })
                                            }
                                    </Form.Select>
                            </InputGroup>
                            </OverlayTrigger>
                        </Col>

                        <Col sm={1} md={1} lg={1}>
                            <OverlayTrigger overlay={<Tooltip variant="success">Refresh Records</Tooltip>}>
                            <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={resetTable}>
                                <FontAwesomeIcon icon={faSyncAlt} size="lg"/>
                            </Button>
                            </OverlayTrigger>
                        </Col>

                        <Col sm={1} md={1} lg={1}>
                            <CSVLink data={feedtargets} className='text-success'>
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
                                <th>Feed Type</th>
                                <th>Week</th>
                                <th>Weeks</th>
                                <th>Weekly Feed Target per Bird (g)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {feedtargets.map(feed=>{
                            return (
                                <tr key={feed.id}>
                                    <td>{feed.feed_type_1}</td>
                                    <td>{feed.week}</td>
                                    <td>{feed.weeks}</td>
                                    <td>{feed.weekly_feed_per_bird}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectFeedTarget(feed)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteFeedTarget(feed) } }
                                        />
                                    </td>

                                </tr>
                            ) 
                        })}
                        </tbody>
                    </Table>
                    <Row className='mt-3'>
                        <Col sm={12} md={12} lg={11} ><h5>Feed Consumption Monitoring</h5></Col>
                        <Col sm={12} md={12} lg={1}>
                            <CSVLink data={feeds_status} className='text-success'>
                                <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                    <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                            <MUIcons.CloudDownloadRounded fontSize="small"/>
                                    </Button>
                                </OverlayTrigger>
                            </CSVLink>
                        </Col>
                        
                    </Row>
                    {/* <Row>
                        <Col sm={12} md={12} lg={11}></Col>
                        <Col sm={12} md={12} lg={1}>
                            <CSVLink data={feeds_status} className='text-success'>
                                <OverlayTrigger overlay={<Tooltip variant="success">Download</Tooltip>}>
                                    <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success">
                                            <MUIcons.CloudDownloadRounded fontSize="small"/>
                                    </Button>
                                </OverlayTrigger>
                            </CSVLink>
                        </Col>
                        
                    </Row> */}

                    

                    <Table  className="table table-success table-striped table-hover table-sm table-borderless" >
                        <thead>
                            <tr>
                                <th>Feed Type</th>
                                <th>Week</th>
                                <th>Weeks</th>
                                <th>Batch</th>
                                <th>Birds</th>
                                <th>Weekly Feed Target per Bird (g)</th>
                                <th>Weekly Feed Target (bags)</th>
                                <th>Weekly Feed Consumption (bags)</th>
                                <th>Variance (bags)</th>
                                <th>% Variance</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {feeds_status.map(feed=>{
                            return (
                                <tr key={feed.id}>
                                    <td>{feed.feed_type_1}</td>
                                    <td>{feed.week}</td>
                                    <td>{feed.weeks}</td>
                                    <td>{feed.batch_number}</td>
                                    <td>{feed.birds_actual}</td>
                                    <td>{parseInt(feed.weekly_feed_per_bird)}</td>
                                    <td>{(feed.weekly_feeds_target).toFixed(1)}</td>
                                    <td>{feed.bags_consumed_weekly}</td>
                                    <td>{(feed.bags_consumed_weekly-feed.weekly_feeds_target).toFixed(1)}</td>
                                    <td>{parseInt(((feed.bags_consumed_weekly-feed.weekly_feeds_target)/feed.weekly_feeds_target)*100)+"%"}</td>

                                    <td>
                                        <FontAwesomeIcon 
                                            icon={faEdit} size="sm" style={{ color: '#17a2b8'}} title={"edit"} 
                                            onClick={ () => {selectFeedTarget(feed)}}
                                        />
                                        
                                        <FontAwesomeIcon
                                            icon={faTrash} size="sm" style={{ color: '#dc3545'}} title={"delete"} 
                                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))
                                            deleteFeedTarget(feed) } }
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
                <Modal.Title> {feed_.id ? 'Edit Feed Target': 'Add Feed Target'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <React.Fragment>
                {feed_ ? (
                    <div>
                        <Row>
                            <Col sm={12} md={12} lg={12}>

                                <Form.Group className="mb-2" controlId="feedtype">
                                    <Form.Label>Feed Type:</Form.Label>
                                    <Form.Select
                                        size="sm"
                                        value={feed_type || ''}
                                        onChange={evt => setFeedType(evt.target.value)}
                                    >
                                        <option value=''>...</option>
                                            {
                                                costcategories.map(feedtype =>{
                                                    return (<option key={feedtype.id} value={feedtype.id}>{feedtype.cost_sub_category}</option>)
                                                    })
                                            }
                                    </Form.Select>

                                </Form.Group>





                                <Form.Group className="mb-2" controlId="week">
                                    <Form.Label>Week:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Week" required
                                        value={week || ''} onChange={evt => setWeek(evt.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="weeks">
                                    <Form.Label>Weeks:</Form.Label>
                                    <Form.Control type="interger" placeholder="Enter Vaccination Day" required
                                        value={weeks || ''} onChange={evt => setWeeks(evt.target.value)}
                                        />
                                </Form.Group>


                                <Form.Group className="mb-2" controlId="vaccine">
                                    <Form.Label>Weekly Average Feed:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Average Weekly Consumption" required
                                        value={weekly_feed_per_bird || ''} onChange={evt => setWeeklyFeedPerBird(evt.target.value)}
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
                feed_.id?(
                <Button variant="primary"  onClick={updateFeedTarget}>
                    Submit
                </Button>)  :(
                <Button variant="primary" onClick={createFeedTarget}>
                    Submit
                </Button> )

                }

                </Modal.Footer>
            </Form>
        </Modal>


        </div>
 
 )

}

export {FeedTargets};