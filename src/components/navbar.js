import React,{useState} from 'react';
import './css/Nav.css';
import { LinkContainer } from "react-router-bootstrap";
import { Container,Navbar, Nav,NavDropdown, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faToggleOn, faToggleOff, faWindowClose, faHome } from '@fortawesome/free-solid-svg-icons';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as TiIcons from 'react-icons/ti';
import * as RiIcons from 'react-icons/ri';
import {Home,Dashboard,Close, ShoppingCart, ShoppingBasket, Settings} from '@material-ui/icons';
// import App from '../App'
import SideBar from './sidebar';
import * as MUIcons from '@mui/icons-material';

function NavBar({showSidebar, toggleMain, sidebar}) {

    const toggleSideBar =()=>{
        showSidebar();
        toggleMain();
    }

    const userIcon = (<MUIcons.Person className="userIcon"/>);

  return (
      <>
    <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" fixed='top'>
        <Container fluid>
            <Button className="sidebarToggler" variant="success" size="xs" onClick={toggleSideBar} >
                    <FontAwesomeIcon icon={faBars} size="lg" variant="light" />
                </Button>
        
            <LinkContainer to="/">
                <Navbar.Brand> CSL Agribiz</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link>Products</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link>Tutorials</Nav.Link>
                    </LinkContainer>

                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
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

                {/* <Nav>
                    <LinkContainer to="/login">
                        <Nav.Link >
                            <MUIcons.Person/>
                        </Nav.Link>
                    </LinkContainer>
                </Nav> */}

            
                <NavDropdown title={userIcon} className="userIcon">
                    <LinkContainer to="/login">
                    <NavDropdown.Item className="userLoginItem"><MUIcons.Login className="userLoginIcon"/>Login</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/">
                    <NavDropdown.Item className="userLoginItem"><MUIcons.Logout className="userLoginIcon"/>Logout</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
                



            </Navbar.Collapse>

        </Container>
    </Navbar>
    </>
)
  
}

export default NavBar;
