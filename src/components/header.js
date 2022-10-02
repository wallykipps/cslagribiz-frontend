import React,{useState} from "react";
import { Container,Navbar, Nav,NavDropdown, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';


function Header(){
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {
        setSidebar(!sidebar);
    };
    const openNav =() =>{
        document.getElementById("main").style.marginLeft = "15%";
        document.getElementById("mySidebar").style.width = "15%";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
    
      }
    
    return(
        <>
            <Navbar variant="dark" bg="success" expand="lg" className="navbar">
            <Button  id="openNav" variant="success" size="xs" onClick={openNav}>
                <FontAwesomeIcon icon={faBars} size="lg" variant="light"/>
            </Button>

            <Navbar.Brand href="#home" className="brand">CSL Agribiz</Navbar.Brand>
            <Container>
            

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-light">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
           
        </>
        
    )
    

}

export default Header;