import React from 'react'
import './css/menu.css'
import { Container,Navbar, Nav,NavDropdown, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import {Home,Dashboard,Close, ShoppingCart, ShoppingBasket, Settings} from '@material-ui/icons';


function Sidenav() {
  return (
    <div className='sidenav'>
      <div className='sidenavWrapper'>
        <div className='sidenav-menu'>
        <ul className='sidenav-list'>
            <li className='sidenav-item'>
            <Nav.Link href="#home"><Home className='sidenavIcon'/>Home</Nav.Link>
            </li>
            <li className='sidenav-item'>
            <Nav.Link href="#link"><Dashboard className='sidenavIcon'/>Dashboard</Nav.Link>
            </li>
            <li className='sidenav-item'>
            <Nav.Link href="#link"><ShoppingCart className='sidenavIcon'/>Sales</Nav.Link>
            </li>
            <li className='sidenav-item'>
            <Nav.Link href="#link"><ShoppingBasket className='sidenavIcon'/>Expenses</Nav.Link>
            </li>
        </ul>


        </div>

      </div>
    </div>
  )
}

export default Sidenav