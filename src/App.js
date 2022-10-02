import React, { useState, useEffect } from 'react';
import './App.css';
import './components/css/Nav.css'
import { Tabs, Tab} from "react-bootstrap";
import NavBar from './components/navbar';
import SideBar from './components/sidebar';
import Dashboard from './components/dashboard';
import Footer from './components/footer';
import Header from './components/header';
// import Header1 from './components/header1';
// import NavMenu from './components/navbar';
// import Topnav from './components/topnav';
// import Sidenav from './components/sidenav';
// import Home from './components/home';
import { Row, Col, Card, Button, CardGroup, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faToggleOn, faToggleOff, faWindowClose, faHome } from '@fortawesome/free-solid-svg-icons';
import { DataUsageRounded } from '@material-ui/icons';


function App() {
  const [main, setMain] = useState(false);
  const toggleMain = () => {
      setMain(!main);
  };

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const [navbartoggler, setNavbartoggler]=useState(false);
  const toggleNavbar =()=>{
    setNavbartoggler(!navbartoggler)
  }

  return (
    
    <div className='App'>
      <NavBar toggleMain={toggleMain} showSidebar ={showSidebar} toggleNabar={toggleNavbar} />
      {/* <div className="dash-board"> */}
      <div className={main? 'main active':'main'} >
        <SideBar sidebar={sidebar} navbartoggler={navbartoggler}/>
        <Container fluid>
          <Dashboard/>
          {/* <Home/> */}
          <Footer/>
        </Container>
        
      </div>
   
      


 

      



      {/* <Header1 toggleMain={toggleMain}/>
      <div className={main? 'main active':'main'}> 
        <h1 >Content</h1>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col>
        </Col>
        </Row>
      </div> */}

   

      {/* <Topnav/>
      <div className='main-container' >
        <Sidenav/>
        <Home/>
      </div> */}
     


      {/* <SideBar/>
      <div id="main">
      <Header/>
      
      <h2>Collapsed Sidebar</h2>
      <p>Click on the hamburger menu/bar icon to open the sidebar, and push this content to the right.</p>

      <Row xs={1} md={2} className="g-0">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      <Footer/>
      </div> */}



      
        {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Home">
        <h1>Under Development. Coming Soon.....</h1>
        </Tab>
        <Tab eventKey="profile" title="Profile">
        <h1>Under Development. Coming Soon.....</h1>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
        <h1>Under Development. Coming Soon.....</h1>
        </Tab>
    </Tabs> */}

   

    
    </div>

  );
}

export default App;
