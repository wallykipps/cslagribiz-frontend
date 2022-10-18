import React, {useState, useEffect} from "react";
import '../css/Layers.css';
import { LinkContainer } from "react-router-bootstrap";
import {Card,Col,Row, CardGroup, Container, Nav, Table, Button,InputGroup, OverlayTrigger, Tooltip, Form, ProgressBar,Alert, ToggleButton,ButtonGroup } from "react-bootstrap";
import * as MUIcons from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {useCookies} from 'react-cookie';
import FlockCharts from './layers_22_flockchart'
import ProductionCharts from './layers_23_productionchart'
import CashflowCharts from './layers_24_cashflowchart'

  function Dashboard(props) {
    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const [batch, setBatch]=useState();
    const [batch_, setBatch_]=useState();
    const [chart_choices, setChartChoices]=useState();
    const [active_batches, setActiveBatches]=useState(true);
    const [compare_batch, setCompareBatch]=useState(false);

    const resetData = () => {
        setBatch('')
        setBatch_('')
        setChartChoices('')
        setActiveBatches(true)
        setCompareBatch(false)
    }

    const charts =[
        {chart_id:1,chart:'Flock Charts'},
        {chart_id:2,chart:'Production Charts'},
        {chart_id:3,chart:'Sales & Expenses Charts'},
    ]

    // const batch_last = 1

    //batches
    const batches_ =props.batches && props.batches
    let batches= batches_.filter(c=>c.status===true).map(w=>({...w}))//filter active batches
    const batches_0=batches.map(y=>y.id)
    const batch_last = batches_0[batches_0.length - 1]
    const batches_1=batches.map(y=>y.batch)
    const batch_default = batches_1[batches_0.length - 1]

    
    
    let batches_all = batches_.length
    let batches_active = batches.length
    let current_batch =  batches_.filter(b => (batch===undefined||batch==='')? (b.id ===batch_last ) : (b.id ===parseInt(batch)) ).map( x => x.batch)
    
    //birds
    const birds_ = props.birds && props.birds
    let delivered_birds_ =  batches_.filter(b => (batch===undefined||batch==='')? (b.id ===batch_last ) : (b.id ===parseInt(batch)) ).map( x => x.delivered_birds)
    let delivered_birds = parseInt(delivered_birds_)
    // console.log(delivered_birds)

    let birds =  birds_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let birds_delivered_net = birds.reduce(add_birds_net, 0); // with initial value to avoid when the array is empty
    function add_birds_net(accumulator, a) {
        return accumulator + parseInt(a.birds);
    }


    //weights
    const weights = props.weights && props.weights
    const vaccines = props.vaccines && props.vaccines
    const vaccineprogram = props.vaccineprogram && props.vaccineprogram

    //egg production
    const eggsproduction_ = props.eggsproduction && props.eggsproduction
    let eggsproduction =  eggsproduction_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    let eggsproduction_length = eggsproduction.length

    let eggs_gross= eggsproduction.reduce(add_eggs_gross, 0); // with initial value to avoid when the array is empty
    function add_eggs_gross(accumulator, a) {
        return accumulator + parseInt(a.gross);
    }

    let laying_rate_cumsum= eggsproduction.reduce(add_eggs_rate, 0); // with initial value to avoid when the array is empty
    function add_eggs_rate(accumulator, a) {
        return accumulator + parseInt(a.gross_percentage);
    }

    let laying_rate = laying_rate_cumsum/eggsproduction.length


    let eggs_defects = eggsproduction.reduce(add_eggs_defects, 0); // with initial value to avoid when the array is empty
    function add_eggs_defects(accumulator, a) {
        return accumulator + parseInt(a.defects+a.broken);
    }
    

    let birds_production= eggsproduction.reduce(add_birds, 0); // with initial value to avoid when the array is empty
    function add_birds(accumulator, a) {
        return accumulator + parseInt(a.birds);
    }

    let eggs_nett = eggs_gross-eggs_defects
    let egg_laying_rate =eggs_nett*100/birds_production
    let egg_defects_rate =eggs_defects*100/birds_production

 
    //sales
    const sales_ = props.sales && props.sales
    let sales =  sales_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, "crates_sold": x.unit != "Crates"? parseFloat(x.quantity)/30:parseFloat(x.quantity)}))

    let sales_total= sales .reduce(add_sales, 0); // with initial value to avoid when the array is empty
    function add_sales(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }

    //xlayers
    let sales_xlayers =  sales.filter(b => (b.product===3) ).map( x => ({...x}))
    let xlayers_birds= sales_xlayers.reduce(add_sales_xlayers, 0); // with initial value to avoid when the array is empty
    function add_sales_xlayers(accumulator, a) {
        return accumulator + parseInt(a.quantity);
    }


    //eggs inventory
    const eggsinventory_ = props.eggsinventory && props.eggsinventory
    let eggsinventory=  eggsinventory_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    // console.log(eggsinventory)

    let eggs_postharvest_losses = eggsinventory.reduce(add_eggs_losses, 0); // with initial value to avoid when the array is empty
    function add_eggs_losses(accumulator, a) {
        return accumulator + a.egg_total_losses/30;
    }

    // console.log(eggs_postharvest_losses)

    let eggs_sales_crates= sales .reduce(add_crates, 0); // with initial value to avoid when the array is empty
    function add_crates(accumulator, a) {
        return accumulator + a.crates_sold;
    }

    let eggs_stock = eggs_nett/30-eggs_sales_crates-eggs_postharvest_losses
    let eggs_losses_total = eggs_defects/30+eggs_postharvest_losses
    

    //expenses
    const expenses_ = props.expenses && props.expenses
    let expenses=  expenses_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))

    let expenses_total= expenses.reduce(add_expenses, 0); // with initial value to avoid when the array is empty
    function add_expenses(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }

    //net cashflow
    let net_cashflow = sales_total-expenses_total

    //cash deposits
    const bankdeposits_ = props.deposits && props.deposits
    let bankdeposits=  bankdeposits_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
    // console.log(bankdeposits_)

    let deposits_total= bankdeposits.reduce(add_deposits, 0); // with initial value to avoid when the array is empty
    function add_deposits(accumulator, a) {
        return accumulator + parseFloat(a.deposit_amount);
    }


    //Cash sales

    let cash_sales_=  sales.filter(b => (b.payment_mode===1) ).map( x => ({...x}))
    let cash_sales = cash_sales_.reduce(add_cash_sales, 0); // with initial value to avoid when the array is empty
    function add_cash_sales(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }



    //Cash deposits

    let cash_deposits_=  bankdeposits.filter(b => (b.credit_ac===1) ).map( x => ({...x}))
    let cash_deposits= cash_deposits_.reduce(add_cash_deposits, 0); // with initial value to avoid when the array is empty
    function add_cash_deposits(accumulator, a) {
        return accumulator + parseFloat(a.deposit_amount);
    }



    
    //mpesa and bank deposits
    let mpesa_bank_sales=  sales.filter(b => (b.payment_mode!=1&&b.payment_mode!=2) ).map( x => ({...x}))
    let mpesa_bank_deposits= mpesa_bank_sales.reduce(add_mpesa_bank, 0); // with initial value to avoid when the array is empty
    function add_mpesa_bank(accumulator, a) {
        return accumulator + parseFloat(a.quantity*a.unitprice);
    }

  

    //credit sales
    const creditsales = props.creditsales && props.creditsales


    //credit expenses
    const creditexpenses = props.creditexpenses && props.creditexpenses



   

  return (
    <div>
        <Container fluid>
        <Row className='dashboardTitle' >
            <Col sm={12} md={12} lg={6}>
                <h3>Dashboard</h3>
            </Col>

            <Col sm={12} md={12} lg={2}>
                <OverlayTrigger overlay={<Tooltip>Select Active/All Batches</Tooltip>}>
                <InputGroup  className="mb-2" size="sm">
                    {/* <InputGroup.Text >All Batches</InputGroup.Text> */}

                    <Form.Check
                        type="checkbox"
                        label={active_batches===true?"Active Batches":"All Batches"}
                        checked={active_batches || ''} 
                        onChange={evt => setActiveBatches(evt.target.checked)}

                    />

                </InputGroup>
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
                <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={resetData}>
                    <FontAwesomeIcon icon={faSyncAlt} size="lg"/>
                </Button>
                </OverlayTrigger>
            </Col>

        </Row>

        <Row className='dashboardCard'>
            <Row>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card>
                        <div>
                            <Card.Header style={{ color: '#198754'}}>
                                <Row>
                                    <Col xs={11} sm={11} md={11} lg={11}>
                                    <Row>
                                        <Col xs={12} sm={12} md={3} lg={3}>Batches</Col>
                                        <Col xs={12} sm={12} md={9} lg={9}>
                                        <ProgressBar className="mt-2">
                                            <ProgressBar  variant="success bg-opacity-50" now={batches_active/batches_all*100} label={`${batches_active}/${batches_all} active batches`} key={1} />
                                            <ProgressBar  variant="warning bg-opacity-50" now={(batches_all-batches_active)/batches_all*100} label={`${batches_all-batches_active}/${batches_all} closed batches`} key={2} />
                                        </ProgressBar>

                                        </Col>

                                    </Row>

                                    </Col>
                                    <Col xs={1} sm={1} md={1} lg={1} style={{display:'flex', justifyContent:'right'}}>
                                        <MUIcons.StoreOutlined/>
                                    </Col>
                                </Row>
                                
                            </Card.Header>
                            <Card.Body style={{ color: '#198754'}}>
                            <Row>
                            <Col xs={6} sm={6} md={4} lg={2} xl={2}>
                                <Card.Footer style={{background:'white'}}>
                                    <Card.Text> Batch: {current_batch}</Card.Text>
                                </Card.Footer>

                            </Col>
                            <Col xs={6} sm={6} md={8} lg={10} xl={10}>
                                <Card.Footer style={{background:'white'}}>
                                    <Row>
                                    <Col xs={12} sm={12} md={6} lg={3}>
                                        <Card.Text>
                                            Delivered: {(delivered_birds).toLocaleString()} Birds
                                        </Card.Text>

                                    </Col>

                                    <Col xs={12} sm={12} md={6} lg={3}>
                                        <Card.Text>
                                            Actual: {(delivered_birds+birds_delivered_net-xlayers_birds).toLocaleString()} Birds
                                        </Card.Text>

                                    </Col>

                                    <Col xs={12} sm={12} md={6} lg={3}>
                                        <Card.Text>
                                            X-Layers: {(xlayers_birds).toLocaleString()} Birds 
                                        </Card.Text>
                                    </Col>
                                    
                                    <Col xs={12} sm={12} md={6} lg={3}>
                                        <Card.Text>
                                            Losses: {(-birds_delivered_net).toLocaleString()} Birds ({((-birds_delivered_net)/(delivered_birds)*100).toFixed(1) +"%"})
                                        </Card.Text>
                                    </Col>
                                    </Row>
                                </Card.Footer>
                            </Col>
                            </Row>


                            </Card.Body>
                        </div>


                    </Card>

                </Col>


            </Row>
          
            <Row>
            <Col xs={12} sm={12} md={6} lg={3} xl={3} className="cardCol">
                <Card  >
                    <Card.Header style={{ color: '#198754'}}>
                    <Row >
                        <Col lg={10} xl={10}>Production</Col>
                        <Col lg={2} xl={2} style={{display:'flex', justifyContent:'right'}}>
                            <MUIcons.Agriculture />
                        </Col>
                    </Row>

                    </Card.Header>
                    <Card.Body style={{ color: '#198754'}}>
                    <Row className="justify-content-center text-center">
                        <small>Gross (crates):</small>
                        <Card.Title>
                            {(eggs_gross/30).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>
                        <small>Net (crates):</small>
                        <Card.Title>
                            {(eggs_nett/30).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>

                        <Card.Text>
                            <small className="text-muted">Laying rate: {laying_rate.toFixed(1) +"%"} {<br/>} Defects: {(((eggs_gross/30)-(eggs_nett/30))/(eggs_gross/30)*100).toFixed(1) +"%"}</small>
                        </Card.Text>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                        <Col sm={7}>
                            <LinkContainer to="/layers-production-dashboard">
                                    <a>View More</a>
                            </LinkContainer>
                        </Col>
                        <Col sm={5}  className="justify-content-center text-center">
                            <p>Batch {current_batch}</p>
                        </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>

            <Col xs={12} sm={12} md={6} lg={3} xl={3} className="cardCol">
                <Card >
                    <Card.Header style={{ color: '#198754'}}>
                    <Row >
                        <Col lg={10} xl={10}>Inventory</Col>
                        <Col lg={2} xl={2} style={{display:'flex', justifyContent:'right'}}>
                            <MUIcons.Inventory2Rounded />
                        </Col>
                    </Row>

                    </Card.Header>
                    <Card.Body style={{ color: '#198754'}}>
                    <Row className="justify-content-center text-center">
                        <small>Sales (crates):</small>
                        <Card.Title>
                            {(eggs_sales_crates).toLocaleString(undefined, {minimumFractionDigits: 1})}
                        </Card.Title>
                        <small>Stock (crates):</small>
                        <Card.Title>
                            {(eggs_stock).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>

                        <Card.Text>
                            <small className="text-muted">Losses: {(eggs_losses_total).toLocaleString(undefined, {minimumFractionDigits: 2})} crates {<br/>} ({((eggs_losses_total)/(eggs_gross/30)*100).toFixed(1) +"%"})</small>
                        </Card.Text>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                        <Col sm={7}>
                            <LinkContainer to="/layers-production-dashboard">
                                    <a>View More</a>
                            </LinkContainer>
                        </Col>
                        <Col sm={5}  className="justify-content-center text-center">
                            <p>Batch {current_batch}</p>
                        </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>

            <Col xs={12} sm={12} md={6} lg={3} xl={3} className="cardCol">
                <Card>
                    <Card.Header style={{ color: '#198754'}}>
                    <Row >
                        <Col lg={10} xl={10}>Sales/Costs</Col>
                        <Col lg={2} xl={2} style={{display:'flex', justifyContent:'right'}}>
                            <MUIcons.ShoppingCart />
                        </Col>
                    </Row>

                    </Card.Header>
                    <Card.Body className="text-success">
                    <Row className="justify-content-center text-center">
                        <small>Sales (KES):</small>
                        <Card.Title>
                            {(sales_total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>
                        <small>Costs (KES):</small>
                        <Card.Title>
                            {(expenses_total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>

                        <Card.Text>
                            <small className={sales_total<expenses_total? "text-danger":"text-muted"}>  Cashflow (Accrued): {<br/>} KES {(sales_total-expenses_total).toLocaleString(undefined, {minimumFractionDigits: 2})} </small>
                        </Card.Text>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                        <Col sm={7}>
                            <LinkContainer to="/layers-expenses-dashboard">
                                    <a>View More</a>
                            </LinkContainer>
                        </Col>
                        <Col sm={5}  className="justify-content-center text-center">
                            <p>Batch {current_batch}</p>
                        </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>

            <Col xs={12} sm={12} md={6} lg={3} xl={3} className="cardCol">
                <Card >
                    <Card.Header className="text-success">
                    <Row >
                        <Col lg={10} xl={10}>Income</Col>
                        <Col lg={2} xl={2} style={{display:'flex', justifyContent:'right'}}>
                            <MUIcons.Payments />
                        </Col>
                    </Row>

                    </Card.Header>
                    <Card.Body className="text-success">
                    <Row className="justify-content-center text-center">
                        <small>Receipts (KES):</small>
                        <Card.Title>
                            {(deposits_total+mpesa_bank_deposits+(cash_sales-cash_deposits)).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>
                        <small>Due (KES):</small>
                        <Card.Title>
                            {(sales_total-deposits_total-mpesa_bank_deposits-(cash_sales-cash_deposits)).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Card.Title>

                        <Card.Text>
                            <small className={deposits_total<expenses_total? "text-danger":"text-muted"}> Cashflow (Net): {<br/>}  KES {(deposits_total-expenses_total).toLocaleString(undefined, {minimumFractionDigits: 2})} </small>
                        </Card.Text>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                        <Col sm={7}>
                            <LinkContainer to="/layers-sales-dashboard">
                                    <a>View More</a>
                            </LinkContainer>
                        </Col>
                        <Col sm={5}  className="justify-content-center text-center">
                            <p>Batch {current_batch}</p>
                        </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>


            </Row>

        </Row>

        <Row className='dashboardTitle'>
            <Col sm={12} md={12} lg={3}>
                <h3>Analytics</h3>
            </Col>


            <Col sm={12} md={12} lg={3}>
                <OverlayTrigger overlay={<Tooltip>Select Chart Filter</Tooltip>}>
                <InputGroup  className="mb-2" size="sm">
                    <InputGroup.Text >Charts</InputGroup.Text>
                        <Form.Select
                            size="sm"
                            value={chart_choices || ''}
                            onChange={evt => setChartChoices(evt.target.value)}
                        >
                            <option value=''>...</option>
                                {
                                    charts.map(chart =>{
                                        return (<option key={chart.chart_id} value={chart.chart_id}>{chart.chart}</option>)
                                        })
                                }
                        </Form.Select>
                </InputGroup>
                </OverlayTrigger>
            </Col>

            <Col sm={12} md={12} lg={2}>
                <OverlayTrigger overlay={<Tooltip>Select Active/All Batches</Tooltip>}>
                <InputGroup  className="mb-2" size="sm">
                    {/* <InputGroup.Text >All Batches</InputGroup.Text> */}

                    <Form.Check
                        type="checkbox"
                        label={active_batches===true?"Active Batches":"All Batches"}
                        checked={active_batches || ''} 
                        onChange={evt => setActiveBatches(evt.target.checked)}

                    />

                </InputGroup>
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
                                {/* { 
                                    batches.map(btch =>{
                                        return (<option key={btch.id} value={btch.id}>{btch.batch}</option>)
                                        })
                                } */}

                                { active_batches===true?
                                    batches.map(btch =>{
                                        return (<option key={btch.id} value={btch.id}>{btch.batch}</option>)
                                        })

                                    :
                                    batches_.map(btch =>{
                                        return (<option key={btch.id} value={btch.id}>{btch.batch}</option>)
                                        })
                                }

                        </Form.Select>
                </InputGroup>
                </OverlayTrigger>
            </Col>

            <Col sm={12} md={12} lg={1}>
                <OverlayTrigger overlay={<Tooltip variant="success">Refresh Records</Tooltip>}>
                <Button className="mb-2 ml-0 btn btn-sm"  variant="outline-success" onClick={resetData}>
                    <FontAwesomeIcon icon={faSyncAlt} size="lg"/>
                </Button>
                </OverlayTrigger>
            </Col>

        </Row >
        <Row className='dashboardCard'>
            
            {parseInt(chart_choices)===1?
                <FlockCharts
                    batch={batch}
                    batch_last={batch_last}
                    batches_={batches_}
                    birds_ ={birds_ }
                    weights={weights}
                    vaccines={vaccines}
                    vaccineprogram={vaccineprogram}
                    eggsproduction_ = {eggsproduction_}
                    sales_ ={sales_ }
            
                />
        
            : parseInt(chart_choices)===2?
                <ProductionCharts
                    batch={batch}
                    batch_last={batch_last}
                    active_batches={active_batches}
                    batch_default={batch_default}
                    batches_={batches_}
                    batches={batches}
                    birds_ ={birds_ }
                    eggsproduction_ = {eggsproduction_}
                    eggsinventory_={eggsinventory_}
                    sales_ ={sales_ }

            
                />
            : 
                <CashflowCharts
                    batch={batch}
                    batch_last={batch_last}
                    batches_={batches_}
                    birds_ ={birds_ }
                    eggsproduction_ = {eggsproduction_}
                    sales_ ={sales_ }
                    expenses_={expenses_}
                    bankdeposits_={bankdeposits_}
                    creditsales={creditsales}
                    creditexpenses={creditexpenses}
        
                />

            
            
            }
        </Row>
           
        </Container>
    </div>
  )
}

export {Dashboard};