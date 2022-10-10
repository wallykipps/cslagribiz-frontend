import React, {useState, useEffect} from 'react';
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';
import Footer from './footer';
import { Container,Form, Button} from "react-bootstrap";
import {useCookies} from 'react-cookie';
import ENTERPRISES_API from '../apis/enterprises-api';


function Login(){

    const[username, setUsername]= useState('');
    const[password, setPassword]= useState('');
    const[isLoginView, setisLoginView] = useState(true);


    const [token, setToken]= useCookies(['mr-token']);

    useEffect(()=>{
        // console.log(token);
        if(token['mr-token']) window.location.href ='/';
    },[token])

    const loginUser = () =>{
        ENTERPRISES_API.loginUser({username, password})
        .then(resp => setToken('mr-token',resp.token))
        .catch(error => console.log(error))
    }

    const registerUser = () =>{
        ENTERPRISES_API.registerUsers({username, password})
        .then(() => loginUser())
        .catch(error => console.log(error))
    }

    //Navigation

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


    const isDisabled = username.length ===0 || password.length ===0 ||isLoginView===false;

    return(
        <div>
            <NavBar toggleMain={toggleMain} showSidebar ={showSidebar} toggleNabar={toggleNavbar} />
                {/* <div className="dash-board"> */}
                <div className={main? 'main active':'main'} >
                    <SideBar sidebar={sidebar} navbartoggler={navbartoggler}/>
                    <Container fluid>
                    <div className='loginContainer'>

                        <Form>
                            {isLoginView ? <h3 className="text-center py-3" style={{color:"#28a745"}}>Login</h3>:<h3 className="text-center py-3" style={{color:"#28a745"}}>Register</h3>}
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" 
                                        value={username} onChange={evt => setUsername(evt.target.value)}
                                        />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" 
                                        value={password} onChange={evt => setPassword(evt.target.value)}
                                        />
                                </Form.Group>

                                {isLoginView?
                                <p className="text-decoration-underline"
                                    onMouseEnter={(e)=>{e.target.style.color = "#28a745 "}}
                                    onMouseLeave={(e)=>{e.target.style.color = "#343a40"}}  
                                    onClick={()=>setisLoginView(false)}>You dont have an account? Contact Admin to Register</p>
                                    :
                                <p className="text-decoration-underline" 
                                    onMouseEnter={(e)=>{e.target.style.color = "#28a745"}}
                                    onMouseLeave={(e)=>{e.target.style.color = "#343a40"}}  
                                    onClick={()=>setisLoginView(true)}>You already have an account? Login here!</p>
                                }

                                {isLoginView?

                                <Button variant="success" onClick={loginUser} disabled={isDisabled}>
                                    Log In
                                </Button> 
                                
                                :

                                <Button variant="success" onClick={registerUser} disabled={isDisabled}>
                                    Register
                                </Button>
                                } 
                            </Form>
                        </div>

                    <Footer/>
                    </Container>
                    
                </div>
        </div>

    )
}

export default Login;