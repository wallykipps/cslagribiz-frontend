import React from 'react'
import './css/Nav.css'
import {Card,Col,Row, CardGroup, Container } from "react-bootstrap";
import Chart from './chart'

  function Dashboard() {
  return (
    <>
        <Container fluid>
        <Row className='dashboardTitle' >
            <h3>Dashboard</h3>
        </Row>
        <Row className='dashboardCard'>
        {/* <h3>Dashboard</h3> */}
            <Col sm={12} md={6} lg={6} xl={6} className="cardCol">
            <Card border="primary" className='card'>
                <Card.Header></Card.Header>
                <Card.Body>
                <Card.Title>Our Products</Card.Title>
                <Card.Text>
                    Coming soon...
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col sm={12} md={6} lg={6} xl={6} className="cardCol">
                <Card border="secondary" className='card'>
                    <Card.Header></Card.Header>
                    <Card.Body>
                    <Card.Title>Agriprenuership 101</Card.Title>
                    <Card.Text>
                        Coming soon...
                    </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>

            <Col sm={12} md={6} lg={6} xl={6} className="cardCol">
                <Card border="success" className='card'>
                    <Card.Header></Card.Header>
                    <Card.Body>
                    <Card.Title>Layers Farming 101</Card.Title>
                    <Card.Text>
                        Coming soon
                    </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>

            <Col sm={12} md={6} lg={6} xl={6} className="cardCol">
                <Card border="danger" className='card'>
                    <Card.Header></Card.Header>
                    <Card.Body>
                    <Card.Title>Broilers Farming 101</Card.Title>
                    <Card.Text>
                        Coming soon...
                    </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>

        </Row>
        {/* <Row className='dashboardTitle'>
        <h3 >Chart</h3>

        </Row > */}
        {/* <Row className='dashboardCard'>
            <Chart/>
        </Row> */}
           
        </Container>
    </>
  )
}

export default Dashboard;