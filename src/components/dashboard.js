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
            <Col sm={12} md={6} lg={6} xl={3} className="cardCol">
            <Card border="primary" className='card'>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                <Card.Title>Primary Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col sm={12} md={6} lg={6} xl={3} className="cardCol">
                <Card border="secondary" className='card'>
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                    <Card.Title>Secondary Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>

            <Col sm={12} md={6} lg={6} xl={3} className="cardCol">
                <Card border="success" className='card'>
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                    <Card.Title>Success Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>

            <Col sm={12} md={6} lg={6} xl={3} className="cardCol">
                <Card border="danger" className='card'>
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                    <Card.Title>Danger Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
                
            </Col>

        </Row>
        <Row className='dashboardTitle'>
        <h3 >Chart</h3>

        </Row >
        <Row className='dashboardCard'>
            <Chart/>
        </Row>
           
        </Container>
    </>
  )
}

export default Dashboard;