import React from 'react'
import './css/menu.css'
import {Card,Col,Row, CardGroup } from "react-bootstrap";
import Chart from './chart'

  function Home() {
  return (
    <div className='home'>
        <Row>
            <h3>Dashboard</h3>
        </Row>
        <Row className='row'>
            <Col sm={12} md={6} lg={6} xl={3}>
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

            <Col sm={12} md={6} lg={6} xl={3}>
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

            <Col sm={12} md={6} lg={6} xl={3}>
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

            <Col sm={12} md={6} lg={6} xl={3}>
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

     
  
    </div>
  )
}

export default Home