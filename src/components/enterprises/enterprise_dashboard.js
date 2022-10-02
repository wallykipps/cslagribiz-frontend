import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Container} from "react-bootstrap";
import CompanyList from './enterprise-details';
import NavBar from '../navbar';
import SideBar from '../sidebar';
import Dashboard from '../dashboard';
import Footer from '../footer';
import Header from '../header';
import {useCookies} from 'react-cookie';
import {useFetchCompanies, useFetchBusinessUnits, useFetchEnterpriseTypes, useFetchStaff} from '../../Hooks/enterpriseFetch';
import StaffForm from '../form_staff';

function EnterpriseDashboard() {

  const [token, setToken, deleteToken]= useCookies(['mr-token']);

  const [dataCompanies, loadingCompanies, errorCompanies] = useFetchCompanies();
  const [dataBunits, loadingBunits, errorBunits] = useFetchBusinessUnits();
  const [dataEtypes, loadingEtypes, errorEtypes] = useFetchEnterpriseTypes();
  const [dataStaff, loadingStaff, errorStaff] = useFetchStaff();

  
  const [companies, setCompany] = useState([]);
  const [businessunits, setBusinessUnit] = useState([]);
  const [enterprisetypes, setEnterpriseType] = useState([]);
  const [staffTeam, setStaffTeam] = useState([]);
  const [editedStaff, setEditedSaff] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/enterprises/companies/", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token 666affd707ee528ec7010f9e8de1f2a96482980f'
  //     }

  //   })
  //   .then(resp => resp.json())
  //   .then(resp => setCompany(resp))
  //   .catch(error => console.log(error))

  // },[])

  // useEffect(() => {
  //   ENTERPRISES_API.getCompanies()
  //   .then(resp => setCompany(resp))
  //   .catch(error => console.log(error))
  // },[])

  useEffect(()=>{
    console.log(token);
    if(!token['mr-token']) window.location.href ='/login';
  },[token])


  useEffect(() => {
    setCompany(dataCompanies);
  },[dataCompanies])

  useEffect(() => {
    setBusinessUnit(dataBunits);
  },[dataBunits])

  useEffect(() => {
    setEnterpriseType(dataEtypes);
  },[dataEtypes])

  useEffect(() => {
    setStaffTeam(dataStaff);
  },[dataStaff])



  const selectStaff= staff =>{
    setEditedSaff(staff);
  }

  const newStaff = () => {
    setEditedSaff({firstname: '', lastname: '', phonenumber: '', businessunit: ''});
  }

  const createdStaff = staff => {
    const newStaff = [...staffTeam, staff];
    setStaffTeam(newStaff);
  }


  const updatedStaff = staff =>{
    const revisedStaff = staffTeam.map(staff_ => {
      if (staff_.id === staff.id){
        return staff;
      
      }
      return staff_;
    })
    setStaffTeam(revisedStaff);
    newStaff();
  }


  const deletedStaff = staff => {
    const newStaff = staffTeam.filter(staff_ => staff_.id !== staff.id)
    setStaffTeam(newStaff);
  }

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
          <CompanyList 
            companies={companies} 
            businessunits={businessunits} 
            enterprisetypes={enterprisetypes} 
            selectStaff={selectStaff}
            staffTeam={staffTeam} 
            staff={editedStaff}
            newStaff={newStaff}
            createdStaff ={createdStaff}
            updatedStaff={updatedStaff}
            deletedStaff = {deletedStaff}
            
          />
            <Footer/>
        </Container>
        
      </div>



    {/* <Header/>
    <CompanyList 
      companies={companies} 
      businessunits={businessunits} 
      enterprisetypes={enterprisetypes} 
      selectStaff={selectStaff}
      staffTeam={staffTeam} 
      staff={editedStaff}
      newStaff={newStaff}
      createdStaff ={createdStaff}
      updatedStaff={updatedStaff}
      deletedStaff = {deletedStaff}
      
    /> */}
    {/* <StaffForm staff={editedStaff} updatedStaff={updatedStaff} staffTeam={staffTeam} /> */}
    {/* <Footer/> */}
    </div>

  );
}

export default EnterpriseDashboard;
