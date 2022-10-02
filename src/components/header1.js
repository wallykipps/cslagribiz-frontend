import React,{useState} from 'react';
import { Container,Navbar, Nav,NavDropdown, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faToggleOn, faToggleOff, faWindowClose, faHome } from '@fortawesome/free-solid-svg-icons';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as TiIcons from 'react-icons/ti';
import * as RiIcons from 'react-icons/ri';
import {Home,Dashboard,Close, ShoppingCart, ShoppingBasket, Settings} from '@material-ui/icons';
// import App from '../App'

function Header1({toggleMain}) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {
        setSidebar(!sidebar);
    };


    const toggleMenu =()=>{
        toggleMain();
        showSidebar();
    }

 
  return (
    <>
    <Navbar variant="dark" bg="success" expand="lg" className="navbar">
    <Button  variant="success" size="xs" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} size="lg" variant="light" />
    </Button>
    <Navbar.Brand href="#home"   >CSL Agribiz</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Container>
        <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            {/* <Nav.Link href="#link">{props.data}</Nav.Link> */}
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
    <div className={sidebar? 'sidebar-container active':'sidebar-container'}>

        <ul className='sidebar-items'>
            <li className='sidebar-item'>
            <Nav.Link href="#home"><FaIcons.FaHome className='sidebar-icon'/><span className='sidebar-menu'>Home</span></Nav.Link>
            </li>
            <li className='sidebar-item'>
            <Nav.Link href="#home"><FaIcons.FaTachometerAlt className='sidebar-icon'/><span className='sidebar-menu'>Dashboard</span></Nav.Link>
            </li>
            <li className='sidebar-item'>
            <Nav.Link href="#link"><FaIcons.FaShoppingCart className='sidebar-icon'/>Sales</Nav.Link>
            </li>
            <li className='sidebar-item'>
            <Nav.Link href="#home"><FaIcons.FaShoppingCart className='sidebar-icon'/><span className='sidebar-menu'>Sales</span></Nav.Link>
            </li>
            <li className='sidebar-item'>
            <Nav.Link href="#home"><FaIcons.FaShoppingBasket className='sidebar-icon'/><span className='sidebar-menu'>Expenses</span></Nav.Link>
            </li>

        </ul>


    </div>

    {/* <div className={sidebar? 'main active':'main'}> 
        <h1>Content</h1>
      </div>
    */}

</>

  )
  
}

export default Header1;
