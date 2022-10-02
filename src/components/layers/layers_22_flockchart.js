import React, { PureComponent,useState, useEffect } from 'react'
import '../css/Layers.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend,ReferenceLine, ResponsiveContainer, BarChart, Bar, Cell, Area, AreaChart,ComposedChart,PieChart, Pie, Sector } from 'recharts';
import {Card,Col,Row,Container,ProgressBar,Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as MUIcons from '@mui/icons-material';
import {useCookies} from 'react-cookie';
import { CSVLink, CSVDownload } from "react-csv";


function FlockCharts(props) {
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
  // console.log(bacthes_latest)

 //birds
  const birds_ = props.birds_ && props.birds_
  let birds =  birds_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
  // console.log(birds_)

 
  let birds_delivered =  batches_.filter(b => (batch===undefined||batch==='')? (b.id ===batch_last ) : (b.id ===parseInt(batch)) ).map( x => x.delivered_birds)
  // console.log(birds_delivered)

  let birds_actual = birds.reduce(add_birds_net, 0); // with initial value to avoid when the array is empty
  function add_birds_net(accumulator, a) {
      return accumulator + parseInt(a.birds);
  }

  // console.log(birds_actual)

  const sales_ = props.sales_ && props.sales_
  let sales =  sales_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x}))
  let sales_xlayers =  sales.filter(b => (b.product===3) ).map( x => ({...x}))
  
  let xlayers_sales = sales_xlayers.reduce(add_xlayers, 0); // with initial value to avoid when the array is empty
  function add_xlayers(accumulator, a) {
      return accumulator + parseInt(a.quantity);
  }
  

  const birds_pie_chart =[
    {stock_type:'Stock', birds: parseInt(birds_actual)},
    {stock_type:'Losses', birds: parseInt(birds_delivered)-birds_actual-xlayers_sales},
    {stock_type:'X-Layers', birds: xlayers_sales}
  
  ]

  
  let birds_acc = 0;
  let birds_net= birds.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last) : (b.batch ===parseInt(batch)) ).map( (x,key) => ({...x,index:[key+1], birds_total: birds_acc+=x.birds}))
  // console.log(birds_net)


  //weights
  const weights_ = props.weights && props.weights
  let weights= weights_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last) : (b.batch ===parseInt(batch)) ).map( (x,key) => ({...x, actual_average_weight:parseInt(x.actual_average_weight),percentage_weight:(parseInt(x.actual_average_weight)/x.average_weight_target)*100}))
  // console.log(weights)
  

  //vaccination

  let batches_1 = batches.filter(e=>e.status===true).map(w=>({...w,"batch_id": w.id,"vaccine": null,"vaccine_1": null,"v_regimen":null}))
  
  const vaccineprogram = props.vaccineprogram && props.vaccineprogram
  const vaccines_ = props.vaccines && props.vaccines
  let vaccines=  vaccines_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( x => ({...x,"vaccination":x.vaccination, "expected_vaccination_date": new Date(Date.parse(x.delivery_date)+((x.vaccination_day)*86400000))}))

  const batch_vaccine_status_0 = vaccineprogram.map(a => ({
      ...a,
      batch_check: vaccines.find(b=>(batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch))),
      vaccination_status: vaccines.find(b => b.vaccination=== a.id)?true:false,
      vaccine_regimen_check:vaccines.find(b => b.vaccine_regimen=== a.vaccine_regimen),
      vaccine_type: vaccines.find(b => b.vaccination=== a.id),

  }));
  var today = Date.parse(new Date())
  const batch_vaccine_status_1 = batch_vaccine_status_0.map(b=>({id_:b.id, vaccination_day_1:b.vaccination_day,vaccine_type_1:b.vaccine, ...b, ...b.batch_check, ...b.vaccine_type}))
  const batch_vaccine_status_2 = batch_vaccine_status_1.filter(a=>a.vaccine_regimen_check!=undefined).map(b=>({...b, expected_vaccination_date_1: new Date(Date.parse(b.delivery_date)+((b.vaccination_day_1)*86400000))}))
  const batch_vaccine_status = batch_vaccine_status_2.map(b=>({...b, vaccine_due: parseInt((today-Date.parse(b.expected_vaccination_date_1))/86400000)<=0? false: true}))
  const batch_vaccine_completed = batch_vaccine_status.filter(a=>a.vaccination_status===true).map(b=>({...b}))
  const batch_vaccine_due = batch_vaccine_status.filter(a=>a.vaccine_due===true&& a.vaccination_status===false).map(b=>({...b}))


  const total_vaccines=batch_vaccine_status.length
  const completed_vaccines=batch_vaccine_completed.length
  const due_vaccines=batch_vaccine_due.length


  const eggsproduction_ = props.eggsproduction_ && props.eggsproduction_
  let eggsproduction =  eggsproduction_.filter(b => (batch===undefined||batch==='')? (b.batch ===batch_last ) : (b.batch ===parseInt(batch)) ).map( (x,key) => ({...x, index:[key+1]}))
  // console.log(eggsproduction)

  const grouped_eggsproduction= [...eggsproduction.reduce((r, o) => {
    const key = o.prod_date.split(('-'))[2]+ '-' + o.prod_date.split(('-'))[1]+ '-' + o.prod_date.split(('-'))[0];
    
    const item = r.get(key) || Object.assign({}, o, {
      index: parseInt(o.index),
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


  
//Pie Chart colors
const COLORS = ['#a3cfbb', '#9ec5fe','#f1aeb5']; 

//Pie Chart customised label
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, birds, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#198754" fontSize={12} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {birds}({(birds/parseInt(birds_delivered)*100).toFixed(1)}%)
    </text>
  );
};


     
  return (
    
    <Container fluid>

      <Row>
        <Col sm={12} md={12} lg={8} className="chartCol">
          <p className="justify-content-center text-center">Birds Stock Trends - Batch {(batch===undefined||batch==='')? batch_last  : parseInt(batch)}</p>
            <ResponsiveContainer width="100%" height={350} className="mb-2">
              <AreaChart
                data={birds_net}
              >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="index" label={{ value: 'Day', position: 'insideBottom', dy: 5, fontSize:12}} style={{fontSize:12}} scaleToFit={true} />
              <YAxis label={{ value: 'Birds',angle: -90, fontSize:12, dx: -10}} style={{fontSize:12}} scaleToFit={true} />
              <Tooltip wrapperStyle={{fontSize: "12px"}}/>
              <Legend verticalAlign="bottom" wrapperStyle={{fontSize: "12px"}} />
              <Area type="monotone" dataKey="delivered_birds" stroke="#9ec5fe" fill="#9ec5fe" />
              <Area type="monotone" dataKey="birds_stock_actual" stroke="#a3cfbb" fill="#a3cfbb" />
            </AreaChart>
          </ResponsiveContainer>
        </Col>

        <Col sm={12} md={12} lg={4} className="justify-content-center text-center chartCol">

          <p>Birds</p>
          <small className="text-success">Initial Stock: {birds_delivered}</small>
          <ResponsiveContainer width="100%"  height={300} className="mb-2">
            <PieChart>
              <Pie
                data={birds_pie_chart}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={0}
                dataKey="birds"
                labelLine={false}
                label={renderCustomizedLabel}
                nameKey="stock_type"
                
              >
                {birds_pie_chart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{fontSize: "12px"}}  />
              <Legend verticalAlign="bottom" wrapperStyle={{fontSize: "12px"}} />
            </PieChart>
          </ResponsiveContainer>
        </Col>

      </Row>
      <Row>
        <Col sm={12} md={12} lg={8} className="chartCol">
          <p className="justify-content-center text-center mt-2"> Weekly Weight Monitoring (Chicks)</p>

          <ResponsiveContainer width="100%"  height={300} className="mb-2">
            <ComposedChart
              data={weights}
           >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottom', dy: 5, fontSize:12}} style={{fontSize:12}} scaleToFit={true} scale="band"/>
              <YAxis yAxisId="left" label={{ value: 'Weight',angle: -90, fontSize:12, dx: -0}} style={{fontSize:12}} scaleToFit={true}/>
              <YAxis yAxisId="right" orientation="right" unit="%" type="number" label={{ value: '% weight ', angle: -90, position: 'outsideLeft',fontSize:12,dx: 10}} style={{fontSize:12}} scaleToFit={true}/>
              <Tooltip wrapperStyle={{fontSize: "12px"}} />
              <Legend wrapperStyle={{fontSize: "12px"}}  />
              <Bar yAxisId="left" dataKey="average_weight_target"  stroke="#a3cfbb" fill="#a3cfbb" formatter={(value) => value.toFixed(2)} />
              <Bar yAxisId="left" dataKey="actual_average_weight"  stroke="#9ec5fe" fill="#9ec5fe" formatter={(value) => value.toFixed(2)} />
              <Line yAxisId="right" type="monotone" dataKey="percentage_weight" stroke="#ff7300" formatter={(value) => value.toFixed(1)+"%"} />
            </ComposedChart>
          </ResponsiveContainer>
        </Col>

        <Col sm={12} md={12}  lg={4} className="bg-none chartCol">

          <Card className="mt-3 mb-3">
                  <Card.Header className='text-success'>
                      <Row>
                          <Col> Vaccination Progress </Col>
                          <Col xs={1} sm={1} md={1} lg={1} style={{display:'flex', justifyContent:'right'}}>
                              <MUIcons.Vaccines/>
                          </Col>
                      </Row>
                      
                  </Card.Header>
                  <Card.Body style={{ color: '#198754'}}>
                        <Alert variant='success'>
                          Completed Vaccines: {completed_vaccines}
                        </Alert>

                      
                        <Alert variant='warning'>
                        Remaining Vaccines: {total_vaccines -completed_vaccines}
                        </Alert>


                        <Alert variant='danger'>
                        Vaccines Due:{due_vaccines}
                        </Alert>

                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to="/layers-flock-dashboard">
                        <a>View Vaccination Details</a>
                    </LinkContainer>
                  </Card.Footer>
            </Card>

        </Col>

      </Row>
    </Container>

  
  )
}

export default FlockCharts