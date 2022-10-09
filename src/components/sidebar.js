import React,{useState} from "react";
import './css/Nav.css';
import { LinkContainer } from "react-router-bootstrap";
import { Nav,Accordion} from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import {Home,Dashboard,Close, ShoppingCart, ShoppingBasket, Settings} from '@material-ui/icons';
import * as MUIcons from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';


function SideBar({sidebar}){
   
    return(
        <div className={sidebar?'side-bar toggle':'side-bar'}>
            {/* <Navbar collapseOnSelect expand="lg"  variant="dark" fixed="top"> */}
            <div className={sidebar?'sidebar-wrapper toggle':'sidebar-wrapper'}>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='sidebar-accordion'>
                            <MUIcons.Home className='sidebar-accordion-icon'/>
                            <span className={sidebar?'sidebar-accordion-text toggle':'sidebar-accordion-text'}>Home</span>
                        </Accordion.Header>
                        <Accordion.Body >
                            <Nav defaultActiveKey="/home" className='flex-column '>
                                <LinkContainer to="/">
                                    <Nav.Link className='sidebar-item'>
                                        {/* <Home className='sidebar-icon'/> */}
                                        <MUIcons.HomeRounded className='sidebar-icon'/>
                                        <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Home</span>
                                    </Nav.Link>
                                </LinkContainer>

                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <MUIcons.Store className='sidebar-accordion-icon'/>
                            <span className={sidebar?'sidebar-accordion-text toggle':'sidebar-accordion-text'}>Layers</span>
                        </Accordion.Header>
                        <Accordion.Body>
                        <Nav defaultActiveKey="/layers-dashboard" className='flex-column '>
                            <LinkContainer to="/layers-dashboard">
                                <Nav.Link className='sidebar-item'>
                                    {/* <Dashboard className='sidebar-icon'/> */}
                                    <MUIcons.DashboardCustomizeRounded className='sidebar-icon'/>
                                    <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Dashboard</span>
                                </Nav.Link>
                            </LinkContainer >

                            <LinkContainer to="/layers-flock-dashboard">
                                <Nav.Link  className='sidebar-item'>
                                    <MUIcons.StoreOutlined className='sidebar-icon'/>
                                    <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Flock</span>
                                </Nav.Link>
                            </LinkContainer>


                            <LinkContainer to="/layers-production-dashboard">
                                <Nav.Link  className='sidebar-item'>
                                    <MUIcons.Agriculture className='sidebar-icon'/>
                                    <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Production</span>
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/layers-sales-dashboard">
                                <Nav.Link href="#link" className='sidebar-item'>
                                    <ShoppingCart className='sidebar-icon'/>
                                    <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Sales</span>
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/layers-expenses-dashboard">
                                <Nav.Link href="#link" className='sidebar-item'>
                                    <ShoppingBasket className='sidebar-icon'/>
                                    <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Expenses</span>
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <MUIcons.Storefront className='sidebar-accordion-icon'/>
                            <span className={sidebar?'sidebar-accordion-text toggle':'sidebar-accordion-text'}>Broilers</span>
                        </Accordion.Header>
                        <Accordion.Body >
                            <Nav defaultActiveKey="/home" className='flex-column '>
                                <LinkContainer to="/">
                                    <Nav.Link href="#link" className='sidebar-item'>
                                        <Dashboard className='sidebar-icon'/>
                                        <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Flock</span>
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/">
                                    <Nav.Link href="#link" className='sidebar-item'>
                                        <MUIcons.Agriculture className='sidebar-icon'/>
                                        <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Production</span>
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/">
                                    <Nav.Link href="#link" className='sidebar-item'>
                                        <ShoppingCart className='sidebar-icon'/>
                                        <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Sales</span>
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/">
                                    <Nav.Link href="#link" className='sidebar-item'>
                                        <ShoppingBasket className='sidebar-icon'/>
                                        <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Expenses</span>
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item> */}
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='sidebar-accordion'>
                            <MUIcons.Business className='sidebar-accordion-icon'/>
                            <span className={sidebar?'sidebar-accordion-text toggle':'sidebar-accordion-text'}>Enterprise</span>
                        </Accordion.Header>
                        <Accordion.Body >
                            <Nav defaultActiveKey="enterprises" className='flex-column '>
                                <LinkContainer to="/enterprises">
                                    <Nav.Link className='sidebar-item'>
                                        <MUIcons.BusinessCenterSharp className='sidebar-icon'/>
                                        <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Enterprise Centre</span>
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            {/* </Navbar> */}





            {/* <div className='sidebar-wrapper'>
                <div className='sidebar-menu' >
                    <ul className='sidebar-list'>
                        <Nav>
                        <li className='sidebar-item'>
                            <Nav.Link href="#home">
                                <Home/>
                                <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Home</span>
                            </Nav.Link>
                        </li>
                        <li className='sidebar-item'>
                            <Nav.Link href="#link">
                                <Dashboard />
                                <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Dashboard</span>
                            </Nav.Link>
                        </li>
                        <li className='sidebar-item'>
                            <Nav.Link href="#link">
                                <ShoppingCart/>
                                <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Sales</span>
                            </Nav.Link>
                        </li>
                        <li className='sidebar-item'>
                            <Nav.Link href="#link">
                                <ShoppingBasket/>
                                <span className={sidebar?'sidebar-text toggle':'sidebar-text'}>Expenses</span>
                            </Nav.Link>
                        </li>
                        </Nav>
                    </ul>
                </div>
            </div> */}
        </div>

    )
}
export default SideBar;