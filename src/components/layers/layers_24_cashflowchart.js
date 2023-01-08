import React, { PureComponent,useState, useEffect } from 'react'
import '../css/Layers.css';
import '../../App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, ResponsiveContainer, BarChart, Bar, Cell, ComposedChart, ReferenceLine, Scatter,PieChart,Pie, Area } from 'recharts';
import {Card,Col,Row,Container, Alert,ListGroup, Badge, Table, Form, OverlayTrigger } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from '../pagination';
import Paginate_1 from '../pagination_1';
import * as MUIcons from '@mui/icons-material';
import {useCookies} from 'react-cookie';
import { CSVLink, CSVDownload } from "react-csv";


function CashflowCharts(props) {
  const [token, setToken, deleteToken]= useCookies(['mr-token']);


  const batch = props.batch
  const batches_ = props.batches_ && props.batches_
  // const batches_0=batches_.map(y=>y.id)
  // const batch_last = batches_0[batches_0.length - 1]
  const batch_last = props.batch_last

  const batches = batches_.map(a=>({batch:a.batch,birds:a.delivered_birds}))

  let bacthes_latest = [];
  for (var i = 0; i < 2; i++) {
    bacthes_latest.push(batches[i]);
  }


  const birds_ = props.birds_ && props.birds_
  let birds =  birds_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
  // console.log(birds)


  const eggsproduction_ = props.eggsproduction_ && props.eggsproduction_
  let eggsproduction =  eggsproduction_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
  // console.log(eggsproduction)

  const grouped_eggsproduction= [...eggsproduction.reduce((r, o) => {
    const key = o.prod_date.split(('-'))[2]+ '-' + o.prod_date.split(('-'))[1]+ '-' + o.prod_date.split(('-'))[0];
    
    const item = r.get(key) || Object.assign({}, o, {
      gross_crates:0,
      net_crates: 0,
      net_percentage:(o.net_percentage),
      year:o.prod_date.split(('-'))[0],
      month:o.prod_date.split(('-'))[1]
    });
    
    item.net_crates+= (o.net_crates);
    item.gross_crates+= o.gross_crates;
    
  
    return r.set(key, item);
  }, new Map).values()];
  
  // console.log(grouped_eggsproduction);



  //sales
  const sales_ = props.sales_ && props.sales_
  let sales =  sales_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, "crates_sold": x.unit != "Crates"? parseInt(x.quantity)/30:parseInt(x.quantity)}))
  // console.log(sales)

  //grouped_sales per month
  const grouped_sales_= [...sales.reduce((r, o) => {
    const key = o.date.split(('-'))[0]+ '-' + o.date.split(('-'))[1];
    
    const item = r.get(key) || Object.assign({}, o, {
      sales_total: 0,
      year:o.date.split(('-'))[0],
      month:o.date.split(('-'))[1]
    });
    
    item.sales_total+= o.total_sales;
  
    return r.set(key, item);
  }, new Map).values()];
  
  // console.log(grouped_sales_);

  const grouped_sales = grouped_sales_.map(b=>({...b}));
  // console.log(grouped_sales);

  //expenses
  const expenses_ = props.expenses_ && props.expenses_
  let expenses =  expenses_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
 
  //grouped expenses per month
  const grouped_expenses_= [...expenses.reduce((r, o) => {
    const key = o.purchase_date.split(('-'))[0]+ '-' + o.purchase_date.split(('-'))[1];
    
    const item = r.get(key) || Object.assign({}, o, {
      expenses_total: 0,
      year:o.purchase_date.split(('-'))[0],
      month:o.purchase_date.split(('-'))[1]
    });
    
    item.expenses_total+= parseInt(o.quantity)*parseInt(o.unitprice);
  
    return r.set(key, item);
  }, new Map).values()];
  
  const grouped_expenses = grouped_expenses_.map(b=>({...b}));
  // console.log(grouped_expenses);

  //deposits/revenue
  const bankdeposits_ = props.bankdeposits_ && props.bankdeposits_
  // console.log(bankdeposits_)
  let bankdeposits=  bankdeposits_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))

  //grouped deposits per month
  const grouped_deposits_= [...bankdeposits.reduce((r, o) => {
    const key = o.deposit_date.split(('-'))[0]+ '-' + o.deposit_date.split(('-'))[1];
    
    const item = r.get(key) || Object.assign({}, o, {
      deposits_total: 0,
      year:o.deposit_date.split(('-'))[0],
      month:o.deposit_date.split(('-'))[1]
    });
    
    item.deposits_total+= parseInt(o.deposit_amount);
  
    return r.set(key, item);
  }, new Map).values()];
  
  const grouped_deposits = grouped_deposits_.map(b=>({...b}));
  // console.log(grouped_deposits);
  

  //mpesa-bank sales
  let mpesa_bank_sales=sales.filter(x=>(x.payment_mode!=1)).filter(y=>(y.payment_mode!=2)).map(z=>({...z}))

  //grouped mpesa-bank deposits per month
  const grouped_mpesa_bank_deposits_= [...mpesa_bank_sales.reduce((r, o) => {
    const key = o.date.split(('-'))[0]+ '-' + o.date.split(('-'))[1];
    
    const item = r.get(key) || Object.assign({}, o, {
      deposits_total: 0,
      year:o.date.split(('-'))[0],
      month:o.date.split(('-'))[1]
    });
    
    item.deposits_total+= o.total_sales;
  
    return r.set(key, item);
  }, new Map).values()];
  
  const grouped_mpesa_bank_deposits = grouped_mpesa_bank_deposits_.map(b=>({...b}));

  
  
  //grouped sales & expenses - monthly
  const grouped_sales_costs_ = grouped_expenses.map(a => ({
    ...a,
    sales_check: grouped_sales.find(b => b.month=== a.month & b.year=== a.year)

  }));

  const grouped_sales_costs_0 = grouped_sales_costs_.map(b=>({...b, ...b.sales_check}))
  const grouped_sales_costs = grouped_sales_costs_0.map(b=>({...b, sales_total: b.sales_check===undefined?0:b.sales_total}))


  const grouped_deposits_0 = grouped_deposits.concat(grouped_mpesa_bank_deposits)

  const grouped_deposits_all_= [...grouped_deposits_0.reduce((r, o) => {
    const key = o.month;
    
    const item = r.get(key) || Object.assign({}, o, {
      deposits_total: 0,
    });
    
    item.deposits_total+= o.deposits_total;
  
    return r.set(key, item);
  }, new Map).values()];
  
  const grouped_deposits_all = grouped_deposits_all_.map(b=>({...b}));


   
  const grouped_cashflow_ = grouped_sales_costs.map(a => ({
    ...a,
    deposit_check: grouped_deposits_all.find(b => b.month=== a.month & b.year=== a.year)
  }));

  let net_cashflow_acc=0
  const grouped_cashflow_0 = grouped_cashflow_.map(b=>({...b, ...b.deposit_check}))
  const grouped_cashflow_1 = grouped_cashflow_0.map(b=>({...b, deposits_total: b.deposit_check===undefined? 0: b.deposits_total}))
  const grouped_cashflow = grouped_cashflow_1.map((b,key)=>({...b, index_:parseInt([key+1]), costs_total: -(b.expenses_total), net_cashflow:net_cashflow_acc+=(b.sales_total-b.expenses_total)}))
  // console.log(grouped_cashflow_1)
  // console.log(grouped_cashflow)


  //grouped_sales per type
  const grouped_sales_type_= [...sales.reduce((r, o) => {
    const key = o.product_;
    
    const item = r.get(key) || Object.assign({}, o, {
      sales_total: 0,
      year:o.date.split(('-'))[0],
      month:o.date.split(('-'))[1]
    });
    
    item.sales_total+= o.total_sales;
  
    return r.set(key, item);
  }, new Map).values()];
  
  // console.log(grouped_sales_type_);

  const grouped_sales_type = grouped_sales_type_.map((b,key)=>({...b, index:parseInt([key+1])}));
  // console.log(grouped_sales_type);


  //grouped expenses per type (pie-chart)

  const grouped_expenses_type_= [...expenses.reduce((r, o) => {
    const key = o.cost_category_;
    
    const item = r.get(key) || Object.assign({}, o, {
      expenses_total: 0,
      year:o.purchase_date.split(('-'))[0],
      month:o.purchase_date.split(('-'))[1]
    });
    
    item.expenses_total+= parseInt(o.quantity)*parseInt(o.unitprice);
  
    return r.set(key, item);
  }, new Map).values()]
  

  const grouped_expenses_type= grouped_expenses_type_.sort((a, b) => b.expenses_total - a.expenses_total).map((b,key)=>({...b, cost_type: b.cost_category_, index:parseInt([key+1])}));
  // console.log(grouped_expenses_type);

  let sales_grand_total = grouped_sales_type.reduce(add_sales, 0); // with initial value to avoid when the array is empty
  function add_sales(accumulator, a) {
      return accumulator + a.sales_total;
  }

  let expenses_grand_total = grouped_expenses_type.reduce(add_expenses, 0); // with initial value to avoid when the array is empty
  function add_expenses(accumulator, a) {
      return accumulator + a.expenses_total;
  }

  // console.log(sales_grand_total)
  // console.log(expenses_grand_total)


  //credit sales
  const creditsales_ = props.creditsales && props.creditsales
  let creditsales =  creditsales_ .filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, "crates_sold": x.unit != "Crates"? parseInt(x.quantity)/30:parseInt(x.quantity)}))


  let credit_sales =  sales.filter(b => (b.payment_mode ===2) ).map( x => ({...x}))

  let credit_sales_due = credit_sales.reduce(add_credit_sales_due, 0); // with initial value to avoid when the array is empty
  function add_credit_sales_due(accumulator, a) {
      return accumulator + parseFloat(a.total_sales);
  }

  let credit_sales_paid = creditsales.reduce(add_credit_sales, 0); // with initial value to avoid when the array is empty
  function add_credit_sales(accumulator, a) {
      return accumulator + parseFloat(a.instalment_amount);
  }

  
  //credit expenses
  const creditexpenses_ = props.creditexpenses && props.creditexpenses
  let creditexpenses =  creditexpenses_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, "crates_sold": x.unit != "Crates"? parseInt(x.quantity)/30:parseInt(x.quantity)}))

  // console.log(creditexpenses_)
  // console.log(creditexpenses)

  let credit_expenses =  expenses.filter(b => (b.payment_mode ==='Credit') ).map( x => ({...x, total_cost: parseFloat(x.quantity)*parseFloat(x.unitprice)}))

  let credit_expenses_due = credit_expenses.reduce(add_credit_expenses_due, 0); // with initial value to avoid when the array is empty
  function add_credit_expenses_due(accumulator, a) {
      return accumulator +a.total_cost;
  }

  // console.log(credit_expenses_due)


  let credit_expenses_paid = creditexpenses.reduce(add_credit_expenses, 0); // with initial value to avoid when the array is empty
  function add_credit_expenses(accumulator, a) {
      return accumulator + parseInt(a.instalment_amount);
  }
  // console.log(credit_expenses_paid)
  

  
  
  
  //Pie Chart colors
  const COLORS = ['#a3cfbb', '#9ec5fe','#f1aeb5'];
  const BARCOLORS = ['#0d6efd', '#6c757d','#198754','#dc3545', '#ffc107','#0dcaf0', '#6610f2', '#fd7e14','#6f42c1','#d63384', '#20c997','#087990'];  

  //Pie Chart customised label
  const RADIAN = Math.PI / 180;


  const renderCustomizedLabel_Sales = ({ cx, cy, midAngle, innerRadius, outerRadius, sales_total, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * -0.9;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="#198754" fontSize={12} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {sales_total.toLocaleString()}({(sales_total/(sales_grand_total)*100).toFixed(1)}%)
      </text>
    );
  };



  //Pagination
  const [recordsPerPage, setRecordsPerPage]= useState(15)
  const [currentPage, setCurrentPage]= useState(1)
  const [active, setActive] = useState(1)

  const indexLastRecord = currentPage * recordsPerPage 
  const indexFirstRecord = indexLastRecord - recordsPerPage
  const grouped_cashflow_paginated = grouped_cashflow.slice(indexFirstRecord,indexLastRecord)
  const pages=Math.ceil(grouped_cashflow.length/recordsPerPage)

  const firstPage = () => {
      if (pages===0)
          setCurrentPage(0)
      else
          setCurrentPage(1) 
  }

  const lastPage = () => {
      if (pages===0)
          setCurrentPage(0)
      else
          setCurrentPage(pages) 
  }

  const activePage = (pageNumber) =>  setActive(pageNumber)

  const nextPage = () => {
   if(currentPage !== pages) 
       setCurrentPage(currentPage + 1)
       setActive(currentPage + 1)
  }

  const prevPage = () => {
       if(currentPage > 1) 
           setCurrentPage(currentPage - 1)
           setActive(currentPage - 1)
  }

  //Pagination_1

  const [recordsPerPage_, setRecordsPerPage_]= useState(15)
  const [currentPage_, setCurrentPage_]= useState(1)
  const [active_, setActive_] = useState(1)

  const indexLastRecord_ = currentPage_ * recordsPerPage_
  const indexFirstRecord_ = indexLastRecord_ - recordsPerPage_
  const grouped_expenses_type_paginated = grouped_expenses_type.slice(indexFirstRecord_,indexLastRecord_)
  const pages_=Math.ceil(grouped_expenses_type.length/recordsPerPage_)

  const firstPage_ = () => {
      if (pages_===0)
          setCurrentPage_(0)
      else
          setCurrentPage_(1) 
  }

  const lastPage_ = () => {
      if (pages_===0)
          setCurrentPage_(0)
      else
          setCurrentPage_(pages_) 
  }

  const activePage_ = (pageNumber_) =>  setActive_(pageNumber_)

  const nextPage_ = () => {
   if(currentPage_ !== pages_) 
       setCurrentPage_(currentPage_ + 1)
       setActive_(currentPage_ + 1)
  }

  const prevPage_ = () => {
       if(currentPage_ > 1) 
           setCurrentPage_(currentPage_ - 1)
           setActive_(currentPage_ - 1)
  }



//   const [currentPage, setCurrentPage]= useState(1)
//   const [recordsPerPage, setRecordsPerPage]= useState(15)
//   const [active, setActive] = useState(1)

//   const indexLastRecord = currentPage * recordsPerPage 
//   const indexFirstRecord = indexLastRecord - recordsPerPage
//   const grouped_cashflow_paginated = grouped_cashflow.slice(indexFirstRecord,indexLastRecord)
//   const grouped_expenses_type_paginated = grouped_expenses_type.slice(indexFirstRecord,indexLastRecord )

//   const pages=Math.ceil(grouped_cashflow.length/recordsPerPage)
//   const pages_=Math.ceil(grouped_expenses_type.length/recordsPerPage)

//   const firstPage = () => {
//       if (pages===0)
//           setCurrentPage(0)
//       else
//           setCurrentPage(1) 
//   }

//   const lastPage = () => {
//       if (pages===0)
//           setCurrentPage(0)
//       else
//           setCurrentPage(pages) 
//   }

//   const activePage = (pageNumber) =>  setActive(pageNumber)

//   const nextPage = () => {
//    if(currentPage !== pages) 
//        setCurrentPage(currentPage + 1)
//        setActive(currentPage + 1)
//   }

//   const prevPage = () => {
//     if(currentPage > 1) 
//         setCurrentPage(currentPage - 1)
//         setActive(currentPage - 1)
//   }


//   const firstPage_ = () => {
//     if (pages_===0)
//         setCurrentPage(0)
//     else
//         setCurrentPage(1) 
//   }

// const lastPage_ = () => {
//     if (pages_===0)
//         setCurrentPage(0)
//     else
//         setCurrentPage(pages) 
//   }
      
  
      
  return (
    

    <Container fluid>

      <Row>
        <Col sm={12} md={12}  lg={12} className="justify-content-center text-center chartCol">
          <p>Cashflow Trends</p>
          <ResponsiveContainer width="100%" height={300} className="mb-2">
            <ComposedChart
              data={grouped_cashflow}
              stackOffset="sign"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index_" label={{ value: 'Month', position: 'insideBottom', dy: 5, fontSize:12}} style={{fontSize:12}}/>
              <YAxis label={{ value: 'Amount (KES)',angle: -90, fontSize:12, dx: -0}} style={{fontSize:12}}/>
              <Tooltip wrapperStyle={{fontSize: "12px"}} />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="costs_total" fill="#9ec5fe" stackId="stack" stroke="#9ec5fe" formatter={(value) => value.toFixed(2)}/>
              <Bar dataKey="sales_total" fill="#a3cfbb" stackId="stack"  stroke="#a3cfbb" formatter={(value) => value.toFixed(2)}  />
              {/* <Bar dataKey="eggs_losses_total" fill="#feb272" stackId="stack" barSize={10} stroke="#feb272" formatter={(value) => value.toFixed(2)} /> */}
              <Scatter dataKey="deposits_total"  stroke="#fd7e14" fill='#fd7e14' formatter={(value) => value.toFixed(2)}/>
              <Area dataKey="net_cashflow" stroke="#fd7e14" fill='#fecba1' formatter={(value) => value.toFixed(2)}/>

            </ComposedChart>
          </ResponsiveContainer>
        </Col>


      </Row>

      <Row>
        <Col sm={12} md={12}  lg={3} className="justify-content-center text-center chartCol">
          <p className="justify-content-center text-center mt-2">Sales per Type</p>
          <ResponsiveContainer width="100%" height={300} className="mb-2">
            <PieChart >
              <Pie
                data={grouped_sales_type}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={0}
                dataKey="sales_total"
                labelLine={false}
                label={renderCustomizedLabel_Sales}
                nameKey="product_"
                
                
                
              >
                {grouped_sales_type.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} wrapperStyle={{fontSize: "12px"}} />
              <Legend verticalAlign="bottom" wrapperStyle={{fontSize: "12px"}} />
            </PieChart>
          </ResponsiveContainer>
        </Col>

        <Col sm={12} md={12}  lg={6} className="justify-content-center text-center chartCol">
        <p className="justify-content-center text-center mt-2">Expenses per Type</p>
          <ResponsiveContainer width="100%" height={300} className="mb-2">
            <BarChart 
              data={grouped_expenses_type} 
              layout="vertical"
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis type="number" label={{ value: 'Amount (KES)', fontSize:12, dy:10}} style={{fontSize:12}} formatter={(value) => value.toLocaleString()}/>
              <YAxis type="category" dataKey="cost_type" style={{fontSize:12}} />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip wrapperStyle={{fontSize: "12px"}} />
              <Bar dataKey="expenses_total" label={{value: 'expenses_total',fontSize:12, fill: '#495057', dx:50}} >
              {grouped_expenses_type.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BARCOLORS[index % BARCOLORS.length]} />
                    ))}
              </Bar>
            </BarChart>      
          </ResponsiveContainer>
        </Col>

        <Col sm={12} md={12}  lg={3} className="bg-none chartCol">
            <Card className="mt-3 mb-3">
                    <Card.Header className='text-success'>
                        <Row>
                            <Col> Credit Sales(KES) </Col>
                            <Col xs={1} sm={1} md={1} lg={1} style={{display:'flex', justifyContent:'right'}}>
                                <MUIcons.AccountBalanceWallet/>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body style={{ color: '#198754'}}>

                      <Badge pill bg="success">Credit Sales: {credit_sales_due.toLocaleString()}                      </Badge>
                      <Badge pill bg="warning">Credit Repaid: {credit_sales_paid.toLocaleString()}</Badge>
                      <Badge pill bg="danger">Credit Balance: {(credit_sales_due-credit_sales_paid).toLocaleString()}</Badge>


                    </Card.Body>

                    <Card.Header className='text-success'>
                        <Row>
                            <Col> Credit Expenses(KES) </Col>
                            <Col xs={1} sm={1} md={1} lg={1} style={{display:'flex', justifyContent:'right'}}>
                                <MUIcons.ShoppingBasket/>
                            </Col>
                        </Row>
                    </Card.Header>
                    
                    <Card.Body style={{ color: '#198754'}}>
                      <Badge pill bg="success">Credit Sales: {credit_expenses_due.toLocaleString()}                      </Badge>
                      <Badge pill bg="warning">Credit Repaid: {credit_expenses_paid.toLocaleString()}</Badge>
                      <Badge pill bg="danger">Credit Balance: {(credit_expenses_due-credit_expenses_paid).toLocaleString()}</Badge>

                    </Card.Body>
                    
                    <Card.Footer>
                      <Row style={{fontSize:12}}>
                        <Col>
                          <LinkContainer to="/layers-sales-dashboard">
                            <a>Credit Sales</a>
                          </LinkContainer>
                        </Col>
                        <Col>
                          <LinkContainer to="/layers-expenses-dashboard">
                            <a>Credit Expenses</a>
                          </LinkContainer>
                        </Col>
                      </Row>
                </Card.Footer>
            </Card>
        </Col>
      </Row>

      <Row className="chartCol">
        <Col>
          <p className="justify-content-center text-center mt-2">Cashflow Trends</p>
          <Table  className=" tables table-success table-striped table-hover table-sm table-borderless" >
            <thead>
                <tr>
                  <th>Month</th>
                  <th className="justify-content-center text-center">Batch</th>
                  <th className="justify-content-center text-center">Expenses</th>
                  <th className="justify-content-center text-center">Sales</th>
                  <th className="justify-content-center text-center">Receipts</th>
                  <th className="justify-content-center text-center">Net Cashflow</th>
                </tr>
            </thead>
            <tbody>
            {grouped_cashflow_paginated.map(a =>{
                return (
                    <tr key={a.id}>
                      <td>{a.index_}</td>
                      <td className="justify-content-center text-center">{a.batch_number}</td>
                      <td className="justify-content-center text-center">{a.expenses_total.toLocaleString()}</td>
                      <td className="justify-content-center text-center">{a.sales_total.toLocaleString()}</td>
                      <td className="justify-content-center text-center">{a.deposits_total.toLocaleString()}</td>
                      <td className="justify-content-center text-center">{a.net_cashflow.toLocaleString()}</td>
                    </tr>
                ) 
            })}
            </tbody>
          </Table>
          <Row>
            <Col sm={2} md={2} lg={2}>
            <OverlayTrigger overlay={<Tooltip>Select Records Per Page</Tooltip>}>
                <Form.Select 
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    value={recordsPerPage || ''}
                    onChange={evt => setRecordsPerPage(evt.target.value)}
                    style={{fontSize:12}}
                >
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                </Form.Select>
            </OverlayTrigger>
            </Col>

            <Col sm={10} md={10} lg={10} style={{fontSize:10}}>
            <Paginate 
                recordsPerPage={recordsPerPage} 
                totalRecords={grouped_cashflow.length}
                nextPage={nextPage}
                prevPage={prevPage}
                activePage={activePage}
                active={active}
                totalPages={pages}
                currentPage={currentPage}
                firstPage={firstPage}
                lastPage={lastPage}
            />
            </Col>
        </Row>

        </Col>

        <Col>
          <p className="justify-content-center text-center mt-2">Expenses per Category</p>
          <Table  className=" tables table-success table-striped table-hover table-sm table-borderless" >
            <thead>
                <tr>
                  <th>#</th>
                  <th>Expense Category</th>
                  <th className="justify-content-center text-center">Amount</th>
                  <th className="justify-content-center text-center">%</th>
                </tr>
            </thead>
            <tbody>
            {grouped_expenses_type_paginated.map(a =>{
                return (
                    <tr key={a.id}>
                      <td>{a.index}</td>
                      <td>{a.cost_category_}</td>
                      <td className="justify-content-center text-center">{a.expenses_total.toLocaleString()}</td>
                      <td className="justify-content-center text-center">{(a.expenses_total/expenses_grand_total*100).toFixed(1)+"%"}</td>

                    </tr>
                ) 
            })}
          </tbody>
          </Table>
          <Row>
                    <Col sm={2} md={2} lg={2} >
                    <OverlayTrigger overlay={<Tooltip>Select Records Per Page</Tooltip>}>
                        <Form.Select 
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            value={recordsPerPage || ''}
                            onChange={evt => setRecordsPerPage_(evt.target.value)}
                            style={{fontSize:12}}
                        >
                            <option value='15'>15</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </Form.Select>
                    </OverlayTrigger>
                    </Col>

                    <Col sm={10} md={10} lg={10} style={{fontSize:10}}>
                    <Paginate_1 
                        recordsPerPage_={recordsPerPage_} 
                        totalRecords_={grouped_expenses_type.length}
                        nextPage_={nextPage_}
                        prevPage_={prevPage_}
                        activePage_={activePage_}
                        active_={active_}
                        totalPages_={pages_}
                        currentPage_={currentPage_}
                        firstPage_={firstPage_}
                        lastPage_={lastPage_}
                    />
                    </Col>
                </Row>

        </Col>


      </Row>






    </Container>

  
  )
}

export default CashflowCharts