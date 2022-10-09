import React, { PureComponent,useState, useEffect } from 'react'
import '../css/Layers.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend,ReferenceLine, ResponsiveContainer, BarChart, Bar, Cell, Area, AreaChart,ComposedChart,PieChart, Pie, Sector } from 'recharts';
import {Card,Col,Row,Container,Form, OverlayTrigger,Table, InputGroup,Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlusCircle,faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import Paginate from '../pagination'
import {useCookies} from 'react-cookie';
import * as MUIcons from '@mui/icons-material';
import { CSVLink, CSVDownload } from "react-csv";


function ProductionCharts(props) {
  const [token, setToken, deleteToken]= useCookies(['mr-token']);

  // const [batch, setBatch]=useState();
  const [batch_1, setBatch_1]=useState();
  const [batch_, setBatch_]=useState();
  const [compare_batch, setCompareBatch]=useState(false);

 

  const resetData = () => {
      setBatch_('')
      setCompareBatch(false)
  }




  const batch = props.batch
  const batches_ = props.batches_ && props.batches_
  const bacthes_active=props.batches&&props.batches
  // const batches_0=batches_.map(y=>y.id)
  // const batch_last = batches_0[batches_0.length - 1]
  const batch_last = props.batch_last && props.batch_last 
  const active_batches=props.active_batches&&props.active_batches
  const batch_default=props.batch_default&&props.batch_default
  // console.log(active_batches)

  const batches = batches_.map(a=>({batch:a.batch,birds:a.delivered_birds}))
  let bacthes_latest = [];
  for (var i = 0; i < 2; i++) {
    bacthes_latest.push(batches[i]);
  }


  const birds_ = props.birds_ && props.birds_
  let birds =  birds_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
  // console.log(birds)

  // egg production
  const eggsproduction_ = props.eggsproduction_ && props.eggsproduction_
  let eggsproduction =  eggsproduction_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( (x,key) => ({...x, index_:parseInt([key+1])}))
  // console.log(eggsproduction)


  //compared egg production
  let eggsproduction_compare =  eggsproduction_.filter(c=>c.batch ===parseInt(batch_) ).map( (x,key) => ({...x, gross_percentage_1:x.gross_percentage,net_percentage_1:x.net_percentage, index_:parseInt([key+1])}))
  // let eggsproduction_compare =eggsproduction_.filter(c=>c.batch ===parseInt(batch_)).map(d=>({...d,net_percentage_1:d.net_percentage}))
  // console.log(batch_)
  // console.log(eggsproduction_compare)


  const compared_eggsproduction_ = eggsproduction.map(a => ({
    ...a,
    batch_check: eggsproduction_compare.find(b => b.index_=== a.index_)

  }));

  // console.log(compared_eggsproduction_)
  const compared_eggsproduction = compared_eggsproduction_.map(b=>({...b, ...b.batch_check}))
  // console.log(compared_eggsproduction)


  //grouped egg production
  const grouped_eggsproduction_= [...eggsproduction.reduce((r, o) => {
    const key = o.prod_date.split(('-'))[0]+ '-' + o.prod_date.split(('-'))[1];
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
  // console.log(grouped_eggsproduction_);

  const grouped_eggsproduction=grouped_eggsproduction_.map(a=>({...a}))
  // console.log(grouped_eggsproduction)


 
  //grouped_sales
  const sales_ = props.sales_ && props.sales_
  let sales_1 =  sales_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x, "crates_sold": x.unit != "Crates"? parseFloat(x.quantity)/30:parseFloat(x.quantity)}))
  let sales = sales_1.filter(c=>c.product!=3).map(d=>({...d}))
  // console.log(sales)


  const grouped_sales_= [...sales.reduce((r, o) => {
    const key = o.date.split(('-'))[0]+ '-' + o.date.split(('-'))[1];
    
    const item = r.get(key) || Object.assign({}, o, {
      crates_sold_total: 0,
      year:o.date.split(('-'))[0],
      month:o.date.split(('-'))[1]
    });
    
    item.crates_sold_total+= o.crates_sold;
  
    return r.set(key, item);
  }, new Map).values()];
  
  // console.log(grouped_sales_);

  const grouped_sales = grouped_sales_.map(b=>({...b}));
  // console.log(grouped_sales);

  const grouped_eggsproduction_sales_ = grouped_eggsproduction.map(a => ({
    ...a,
    // sales_check: grouped_sales.find(b => b.index=== a.index)
    sales_check: grouped_sales.find(b => b.month=== a.month & b.year=== a.year)


  }));

  // console.log(grouped_eggsproduction_sales_)
  const grouped_eggsproduction_sales = grouped_eggsproduction_sales_.filter(a=>a.product!=2).map(b=>({...b, ...b.sales_check}))
  // console.log(grouped_eggsproduction_sales)

  const grouped_eggsproduction_sales_month_ = grouped_eggsproduction.map(a => ({
    ...a,
    month_check: grouped_sales.find(b => b.month=== a.month & b.year=== a.year)

  }));

  // console.log(grouped_eggsproduction_sales_month_)


  //eggs inventory
  const eggsinventory_ = props.eggsinventory_ && props.eggsinventory_
  let eggsinventory=  eggsinventory_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
  // console.log(eggsinventory)

  const grouped_eggsinventory_= [...eggsinventory.reduce((r, o) => {
    const key = o.inventory_date.split(('-'))[0]+ '-' + o.inventory_date.split(('-'))[1];
    
    const item = r.get(key) || Object.assign({}, o, {
      post_harvest_losses: 0,
      year:o.inventory_date.split(('-'))[0],
      month:o.inventory_date.split(('-'))[1]
    });
    
    item.post_harvest_losses+= o.egg_total_losses;
  
    return r.set(key, item);
  }, new Map).values()];
  
  // console.log(grouped_eggsinventory_);

  const grouped_eggsinventory  = grouped_eggsinventory_.map(b=>({...b}));
  // console.log(grouped_eggsinventory);
  

  const grouped_eggsinventorysales_ = grouped_eggsproduction_sales.map(a => ({
    ...a,
    // inventory_check: grouped_eggsinventory.find(b => b.index=== a.index)
    inventory_check: grouped_eggsinventory.find(b => b.month=== a.month & b.year=== a.year)

  }));

  // console.log(grouped_eggsinventorysales_)
  let eggs_crates_balance_acc=0
  const grouped_eggsinventorysales_0 = grouped_eggsinventorysales_.map(b=>({...b, ...b.inventory_check}))
  const grouped_eggsinventorysales_1 = grouped_eggsinventorysales_0.map(c=>({...c, crates_sold_total: c.sales_check===undefined?0:-(c.crates_sold_total),eggs_post_prod_losses: c.inventory_check===undefined?0:c.egg_total_losses})) 
  const grouped_eggsinventorysales_2=grouped_eggsinventorysales_1.map(d=>({...d, "eggs_losses_total":(d.gross_crates-d.net_crates+(d.egg_total_losses/30))===undefined?0:-(d.gross_crates-d.net_crates+(d.post_harvest_losses/30))}))
  const grouped_eggsinventorysales=grouped_eggsinventorysales_2.map((d,key)=>({...d, index_:parseInt([key+1]),"eggs_balance_total":eggs_crates_balance_acc+=d.gross_crates+d.crates_sold_total+d.eggs_losses_total}))
  // console.log(grouped_eggsinventorysales)

  let crates_sold = grouped_eggsinventorysales.reduce(add_eggs_sold, 0); // with initial value to avoid when the array is empty
  function add_eggs_sold(accumulator, a) {
      return accumulator + a.crates_sold_total;
  }

  let production_losses = grouped_eggsinventorysales.reduce(add_prod_losses, 0); // with initial value to avoid when the array is empty
  function add_prod_losses(accumulator, a) {
      return accumulator + (-a.eggs_losses_total-a.post_harvest_losses/30)
      ;
  }

  let postharvest_losses = grouped_eggsinventorysales.reduce(add_post_prod_losses, 0); // with initial value to avoid when the array is empty
  function add_post_prod_losses(accumulator, a) {
      return accumulator + a.post_harvest_losses/30;

  }

  const egg_losses_pie_chart =[
    {loss_type:'Production', eggs_lost:(production_losses)},
    {loss_type:'Post Harvest', eggs_lost: (postharvest_losses)},
  ]

  // console.log(crates_sold)
  // console.log(production_losses)
  // console.log(postharvest_losses)
  // console.log(postharvest_losses+production_losses)

  //Pie Chart colors
  const COLORS = ['#a3cfbb', '#9ec5fe','#f1aeb5']; 

  //Pie Chart customised label
  const RADIAN = Math.PI / 180;


  const renderCustomizedLabel_3 = ({ cx, cy, midAngle, innerRadius, outerRadius, eggs_lost, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="#198754" fontSize={12} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {eggs_lost.toFixed(2)}({(eggs_lost/((production_losses+postharvest_losses))*100).toFixed(1)}%)
      </text>
    );
  };
  
  
  //Pagination
  const [currentPage, setCurrentPage]= useState(1)
  const [recordsPerPage, setRecordsPerPage]= useState(15)

  const indexLastRecord = currentPage * recordsPerPage 
  const indexFirstRecord = indexLastRecord - recordsPerPage
  const  grouped_eggsinventorysales_paginated = grouped_eggsinventorysales.slice(indexFirstRecord,indexLastRecord )

  const paginate =(pageNumber)=> setCurrentPage(pageNumber)

  
    
  return (
    
    // <div className='chart'>
    //     <h3 className='charttitle'>Analytics</h3>

    // </div>

    <Container fluid>

      <Row >
        <Col lg={9} className="justify-content-center text-center chartCol">
        <p>Egg Production Trends</p>
          <Row>
            <Col sm={12} md={12} lg={1}></Col>
            <Col sm={12} md={12} lg={2}>
                <OverlayTrigger overlay={<Tooltip>Select Batch to Compare</Tooltip>}>
                <InputGroup  className="mb-2" size="sm">
                    {/* <InputGroup.Text >All Batches</InputGroup.Text> */}

                    <Form.Check
                        type="checkbox"
                        label="Compare"
                        checked={compare_batch || ''} 
                        onChange={evt => setCompareBatch(evt.target.checked)}

                    />
                    {/* {compare_batch===true?
                        <OverlayTrigger overlay={<Tooltip>Select Batch Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Batch</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={batch_ || ''}
                                    onChange={evt => setBatch_(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                    { active_batches===true?
                                       bacthes_active.map(btch =>{
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
                    
                    :''

                    } */}
                </InputGroup>
                </OverlayTrigger>
            </Col>

            <Col sm={12} md={12} lg={3}>
                <OverlayTrigger overlay={<Tooltip>Select Batch to Compare</Tooltip>}>
                <InputGroup  className="mb-2" size="sm">
                    {/* <InputGroup.Text >All Batches</InputGroup.Text> */}

                    {/* <Form.Check
                        type="checkbox"
                        label="Compare"
                        checked={compare_batch || ''} 
                        onChange={evt => setCompareBatch(evt.target.checked)}

                    /> */}
                    {compare_batch===true?
                        <OverlayTrigger overlay={<Tooltip>Select Batch Filter</Tooltip>}>
                        <InputGroup  className="mb-2" size="sm">
                            <InputGroup.Text >Batch</InputGroup.Text>
                                <Form.Select
                                    size="sm"
                                    value={batch_ || ''}
                                    onChange={evt => setBatch_(evt.target.value)}
                                >
                                    <option value=''>...</option>
                                    { active_batches===true?
                                       bacthes_active.map(btch =>{
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
                    
                    :''

                    }
                </InputGroup>
                </OverlayTrigger>
            </Col>

            <Col sm={12} md={12} lg={3}>
                <OverlayTrigger overlay={<Tooltip>Select Batch Filter</Tooltip>}>
                <InputGroup  className="mb-2" size="sm">
                    <InputGroup.Text >Batch</InputGroup.Text>
                        <Form.Select
                            size="sm"
                            value={batch || ''}
                            onChange={evt => setBatch_1(evt.target.value)}
                        >
                            <option value=''>{batch_default}</option>
                                { active_batches===true?
                                    bacthes_active.map(btch =>{
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
          </Row>
        
        {compare_batch===false?

          <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={eggsproduction}
            
            // margin={{
            //   top: 5,
            //   right: 30,
            //   left: 20,
            //   bottom: 5,
            // }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="index_" label={{ value: 'Day', position: 'insideBottom', dy: 5, fontSize:12}} style={{fontSize:12}} scaleToFit={true}/>
            <YAxis yAxisId="left" label={{ value: 'Crates',angle: -90, fontSize:12, dx: -0}} style={{fontSize:12}} scaleToFit={true}/>
            <YAxis yAxisId="right" orientation="right" unit="%" type="number" label={{ value: '% net production ', angle: -90, position: 'outsideLeft',fontSize:12,dx: 10}} style={{fontSize:12}} scaleToFit={true}/>
            <Tooltip wrapperStyle={{fontSize: "12px"}}  />
            <Legend wrapperStyle={{fontSize: "12px"}}  />
            <Line yAxisId="left" type="monotone" dataKey="net_crates" stroke="#8884d8" dot={false} formatter={(value) => value.toFixed(2)} />
            <Line yAxisId="left" type="monotone" dataKey="gross_crates" stroke="#82ca9d" dot={false} formatter={(value) => value.toFixed(2)}/>
            <Line yAxisId="right" type="monotone" dataKey="net_percentage" stroke="#feb272" dot={false} formatter={(value) => value.toFixed(2)+"%"}/>
          </LineChart>
          </ResponsiveContainer>

        :
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={compared_eggsproduction}
              
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index_" label={{ value: 'Day', position: 'insideBottom', dy: 5, fontSize:12}} style={{fontSize:12}} scaleToFit={true}/>
              <YAxis yAxisId="left" orientation="left" unit="%" type="number" label={{ value: '% production ', angle: -90, position: 'outsideLeft',fontSize:12,dx: -10}} style={{fontSize:12}} scaleToFit={true}/>
              <Tooltip wrapperStyle={{fontSize: "12px"}}  />
              <Legend wrapperStyle={{fontSize: "12px"}}  />
              {/* <Line yAxisId="left" type="monotone" dataKey="net_crates" stroke="#8884d8" activeDot={{ r: 8 }} formatter={(value) => value.toFixed(2)} />
              <Line yAxisId="left" type="monotone" dataKey="gross_crates" stroke="#82ca9d" activeDot={{ r: 8 }} formatter={(value) => value.toFixed(2)}/> */}
              <Line yAxisId="left" type="monotone" dataKey="gross_percentage" stroke="#8884d8" dot={false} formatter={(value) => value.toFixed(2)+"%"}/>
              <Line yAxisId="left" type="monotone" dataKey="gross_percentage_1" stroke="#feb272" dot={false} formatter={(value) => value.toFixed(2)+"%"}/>
              <Line yAxisId="left" type="monotone" dataKey="net_percentage" stroke="#82ca9d" dot={false} formatter={(value) => value.toFixed(2)+"%"}/>
              <Line yAxisId="left" type="monotone" dataKey="net_percentage_1" stroke="#3d8bfd"  dot={false} formatter={(value) => value.toFixed(2)+"%"}/>
            </ComposedChart>
        </ResponsiveContainer>
        
        } 
          
        </Col>

        <Col sm={12} md={12}  lg={3} className="justify-content-center text-center chartCol">
          <p>Egg Losses by Type</p>
          <ResponsiveContainer width="100%" height={300} className="mb-2">
            <PieChart >
              <Pie
                data={egg_losses_pie_chart}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={0}
                dataKey="eggs_lost"
                labelLine={false}
                label={renderCustomizedLabel_3}
                nameKey="loss_type"
                
                
              >
                {egg_losses_pie_chart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toFixed(2)} wrapperStyle={{fontSize: "12px"}} />
              <Legend verticalAlign="bottom" wrapperStyle={{fontSize: "12px"}} />
            </PieChart>
          </ResponsiveContainer>
       </Col>
        

        
      </Row>

      <Row>

        <Col sm={12} md={12}  lg={8} className="justify-content-center text-center chartCol">
          <p>Eggs Inventory</p>
          <ResponsiveContainer width="100%" height={300} className="mb-2">
            <ComposedChart
              data={grouped_eggsinventorysales}
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
              <YAxis label={{ value: 'Crates',angle: -90, fontSize:12, dx: -0}} style={{fontSize:12}}/>
              <Tooltip wrapperStyle={{fontSize: "12px"}} />
              <Legend wrapperStyle={{fontSize: "12px"}} />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="gross_crates" fill="#a3cfbb" stackId="stack" stroke="#a3cfbb" formatter={(value) => value.toFixed(2)}/>
              <Bar dataKey="crates_sold_total" fill="#9ec5fe" stackId="stack"  stroke="#9ec5fe" formatter={(value) => value.toFixed(2)}  />
              <Bar dataKey="eggs_losses_total" fill="#feb272" stackId="stack"  stroke="#feb272" formatter={(value) => value.toFixed(2)} />
              <Line dataKey="eggs_balance_total" stackId="stack" stroke="#ea868f" formatter={(value) => value.toFixed(2)}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Col>

        <Col sm={12} md={12}  lg={4} className="justify-content-center text-center chartCol">
          <p className="justify-content-center text-center mt-2">Inventory Table</p>
          <Table  className=" tables table-success table-striped table-hover table-sm table-borderless" >
            <thead>
                <tr>
                  <th>Months</th>
                  <th className="justify-content-center text-center">Production</th>
                  <th className="justify-content-center text-center">Losses</th>
                  <th className="justify-content-center text-center">Sales</th>
                  <th className="justify-content-center text-center">Balance</th>
                </tr>
            </thead>
            <tbody>
            {grouped_eggsinventorysales_paginated.map(a =>{
                return (
                    <tr key={a.id}>
                      <td>{a.index_}</td>
                      <td className="justify-content-center text-center">{parseFloat(a.gross_crates.toFixed(2)).toLocaleString()}</td>
                      <td className="justify-content-center text-center">{parseFloat(-(a.eggs_losses_total).toFixed(2)).toLocaleString()}</td>
                      <td className="justify-content-center text-center">{parseFloat(-(a.crates_sold_total).toFixed(2)).toLocaleString()}</td>
                      <td className="justify-content-center text-center">{parseFloat(a.eggs_balance_total.toFixed(2)).toLocaleString()}</td>
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
                      onChange={evt => setRecordsPerPage(evt.target.value)}
                      style={{fontSize:10}}
                  >
                      <option value='15'>15</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='100'>100</option>
                  </Form.Select>
              </OverlayTrigger>
              </Col>

              <Col sm={10} md={10} lg={10} style={{fontSize:8}}>
              <Paginate 
                  recordsPerPage={recordsPerPage} 
                  totalRecords={grouped_eggsinventorysales.length}
                  paginate={paginate}
              />
              </Col>
          </Row>

        </Col>

      </Row>
      
      

    </Container>

  
  )
}

export default ProductionCharts