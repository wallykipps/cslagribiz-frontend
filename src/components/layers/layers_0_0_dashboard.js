import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import {Dashboard} from './layers_0_dashboard'
// import {Chart} from './layers_22_saleschart'
// import {Batches} from './layers_1_batch';
// import {BirdsStock} from './layers_2_birdstock';
// import { EggsProduction } from './layers_3_production';
// import { EggsInventory } from './layers_4_eggsinventory';
// import { FeedTypes } from './layers_14_feedtypes';
// import { FeedInventory } from './layers_15_feedinventory';
// import { FeedTargets } from "./layers_21_feedtargets";
// import {VaccinationProgram} from './layers_18_vaccinationprogram';
import NavBar from '../navbar';
import SideBar from '../sidebar';
import Footer from '../footer';
import { Tabs, Tab, Row, Col, Nav, Container, Card} from "react-bootstrap";
import {useCookies} from 'react-cookie';
import { 
  useFetchBatches,
  useFetchBirdStock,
  useFetchStockMovement,
  useFetchVaccinationProgram,
  useFetchVaccination,
  useFetchWeightTargets,
  useFetchWeightMonitoring, 
  useFetchEggProduction,
  useFetchEggsInventory,
  useFetchLayersSales,
  useFetchFeedTypes,
  useFetchFeedInventory,
  useFetchLayersCostCategories,
  useFetchLayersExpenses,
  useFetchFeedTargets,
  useFetchLayersCreditSales,
  useFetchLayersBankDeposits,
  useFetchLayersCreditExpenses,
  
 } from "../../Hooks/layersFetch";
import {
  useFetchBusinessUnits, 
  useFetchEnterpriseTypes, 
  useFetchStaff,
  useFetchPaymentModes,
  useFetchBanking,
} from '../../Hooks/enterpriseFetch';


function LayersDashboard(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    // const [dataBunits, loadingBunits, errorBunits] = useFetchBusinessUnits();
    // const [dataEtypes, loadingEtypes, errorEtypes] = useFetchEnterpriseTypes();
    // const [dataStaff, loadingStaff, errorStaff] = useFetchStaff();

    // const [businessunits, setBusinessUnit] = useState([]);
    // const [enterprisetypes, setEnterpriseType] = useState([]);
    // const [staffTeam, setStaffTeam] = useState([]);

    
    const [dataBatches, loadingBatches, errorBatches] = useFetchBatches();
    // const [dataStockMovement, loadingStockMovement, errorStockMovement] = useFetchStockMovement();
    const [dataBirdStock, loadingBirdStock, errorBirdStock] = useFetchBirdStock();
    const [dataVaccinationProgram, loadingVaccinationProgram, errorVaccinationProgram] = useFetchVaccinationProgram();
    const [dataVaccination, loadingVaccination, errorVaccination] = useFetchVaccination();
    const [dataWeightTargets, loadingWeightTargets, errorWeightTargets] = useFetchWeightTargets();
    const [dataWeightMonitoring, loadingWeightMonitoring, errorWeightMonitoring] = useFetchWeightMonitoring();
    const [dataEggProduction, loadingEggProduction, errorEggProduction] = useFetchEggProduction();
    const [dataEggsInventory, loadingEggsInventory, errorEggsInventory] = useFetchEggsInventory();
    const [dataLayersSales, loadingLayersSales, errorLayersSales] = useFetchLayersSales();
    const [dataLayersExpenses, loadingLayersExpenses, errorLayersExpenses] = useFetchLayersExpenses();
    const [dataLayersCostCategories, loadingLayersCostCategories, errorLayersCostCategories] = useFetchLayersCostCategories();
    const [dataFeedTypes, loadingFeedTypes, errorFeedTypes] = useFetchFeedTypes();
    const [dataFeedInventory, loadingFeedInventory, errorFeedInventory] = useFetchFeedInventory();
    const [dataFeedTargets, loadingFeedTargets, errorFeedTargets] = useFetchFeedTargets();
    const [dataLayersCreditSales, loadingLayersCreditSales, errorLayersCreditSales] = useFetchLayersCreditSales();
    const [dataLayersCreditExpenses, loadingLayersCreditExpenses, errorLayersCreditExpenses] = useFetchLayersCreditExpenses();
    const [dataLayersBankDeposits, loadingLayersBankDeposits, errorLayersBankDeposits] = useFetchLayersBankDeposits();
  



    
    const [batches, setBatches] = useState([]);
    // const [selectedBatch, setSelectedBatch]=useState([]);

    // const [stocktypes, setStockTypes] = useState([]);
    const [birds, setBirds] = useState([]);
    // const [selectedStock, setSelectedStock]=useState([]);
    
    const [vaccineprogram, setVaccineProgram] = useState([]);
    const [vaccines, setVaccines] = useState([]);

    const [weighttargets, setWeightTargets] = useState([]);
    const [weights, setWeights] = useState([]);

    const [eggsproduction, setEggsProduction]=useState([]);
    // const [selectedEggsProduction, setSelectedEggsProduction]=useState([]);

    const [eggsinventory, setEggsInventory]=useState([]);
    // const [selectedEggsRecord, setSelectedEggsRecord]=useState([]);
    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [creditsales, setCreditSales] = useState([]);
    const [creditexpenses, setCreditExpenses] = useState([]);
    const [deposits, setDeposits] = useState([]);




    const [costcategories, setCostCategories] = useState([]);
    const [feedtypes, setFeedTypes]=useState([]);
    // const [selectedFeedType, setSelectedFeedType]=useState([]);
    const [feedinventory, setFeedInventory]=useState([]);
    // const [selectedFeedRecord, setSelectedFeedRecord]=useState([]);
    const [feedtargets, setFeedTargets]=useState([]);
    // const [selectedFeedTarget, setSelectedFeedTarget]=useState([]);

    

    //Authentication
    useEffect(()=>{
        // console.log(token);
        if(!token['mr-token']) window.location.href ='/login';
      },[token])

      //Enterprise App

      // useEffect(() => {
      //   setBusinessUnit(dataBunits);
      // },[dataBunits])
    
      // useEffect(() => {
      //   setEnterpriseType(dataEtypes);
      // },[dataEtypes])
    
      // useEffect(() => {
      //   setStaffTeam(dataStaff);
      // },[dataStaff])

    //Get data
    useEffect(() => {
        setBatches(dataBatches);
      },[dataBatches])

    // useEffect(() => {
    //     setStockTypes(dataStockMovement);
    //   },[dataStockMovement])

    useEffect(() => {
        setBirds(dataBirdStock);
      },[dataBirdStock])


      useEffect(() => {
        setVaccineProgram(dataVaccinationProgram);
      },[dataVaccinationProgram])

    useEffect(() => {
        setVaccines(dataVaccination);
      },[dataVaccination])

    useEffect(() => {
        setWeightTargets(dataWeightTargets);
      },[dataWeightTargets])

    useEffect(() => {
        setWeights(dataWeightMonitoring);
      },[dataWeightMonitoring])


    useEffect(() => {
        setEggsProduction(dataEggProduction);
      },[dataEggProduction])

    useEffect(() => {
        setEggsInventory(dataEggsInventory);
      },[dataEggsInventory])

    useEffect(() => {
        setSales(dataLayersSales);
      }, [dataLayersSales]);

    useEffect(() => {
        setExpenses(dataLayersExpenses);
      }, [dataLayersExpenses]);

    useEffect(() => {
        setCostCategories(dataLayersCostCategories);
      }, [dataLayersCostCategories]);

    useEffect(() => {
        setFeedTypes(dataFeedTypes);
      }, [dataFeedTypes]);

    useEffect(() => {
        setFeedInventory(dataFeedInventory);
      }, [dataFeedInventory]);

    useEffect(() => {
        setFeedTargets(dataFeedTargets);
      }, [dataFeedTargets]);

      useEffect(() => {
        setCreditSales(dataLayersCreditSales);
      }, [dataLayersCreditSales]);


      useEffect(() => {
        setCreditExpenses(dataLayersCreditExpenses);
      }, [dataLayersCreditExpenses]);
    
    
      useEffect(() => {
        setDeposits(dataLayersBankDeposits);
      }, [dataLayersBankDeposits]);
    

   
    
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
  
    
    return(
        <div className='App'>
            <NavBar toggleMain={toggleMain} showSidebar ={showSidebar} toggleNabar={toggleNavbar} />
            <div className={main? 'main active':'main'} >
              <SideBar sidebar={sidebar} navbartoggler={navbartoggler}/>
              <Container fluid>

              {loadingBatches ? (
                    <div className="loader-container">
                    <div className="spinner"></div>
                    </div>
                    ) :loadingBirdStock ? (
                    <div className="loader-container">
                    <div className="spinner"></div>
                    </div>
                      
                    ):loadingVaccinationProgram ? (
                      <div className="loader-container">
                      <div className="spinner"></div>
                      </div>
                        
                      ):loadingVaccination ? (
                        <div className="loader-container">
                        <div className="spinner"></div>
                        </div>
                          
                        ):loadingWeightTargets ? (
                          <div className="loader-container">
                          <div className="spinner"></div>
                          </div>
                            
                          ):loadingWeightMonitoring ? (
                            <div className="loader-container">
                            <div className="spinner"></div>
                            </div>
                              
                            ):loadingEggProduction? (
                              <div className="loader-container">
                              <div className="spinner"></div>
                              </div>
                                
                              ):loadingEggsInventory ? (
                                <div className="loader-container">
                                <div className="spinner"></div>
                                </div>
                                  
                                ):loadingLayersSales ? (
                                  <div className="loader-container">
                                  <div className="spinner"></div>
                                  </div>
                                    
                                  ):loadingLayersExpenses ? (
                                    <div className="loader-container">
                                    <div className="spinner"></div>
                                    </div>
                                      
                                    ):loadingLayersCostCategories ? (
                                      <div className="loader-container">
                                      <div className="spinner"></div>
                                      </div>
                                        
                                      ):loadingFeedTypes ? (
                                        <div className="loader-container">
                                        <div className="spinner"></div>
                                        </div>
                                          
                                        ):loadingFeedInventory ? (
                                          <div className="loader-container">
                                          <div className="spinner"></div>
                                          </div>
                                            
                                          ):loadingFeedTargets? (
                                            <div className="loader-container">
                                            <div className="spinner"></div>
                                            </div>
                                              
                                            ):loadingLayersCreditSales ? (
                                              <div className="loader-container">
                                              <div className="spinner"></div>
                                              </div>
                                                
                                              ):loadingLayersCreditExpenses ? (
                                                <div className="loader-container">
                                                <div className="spinner"></div>
                                                </div>
                                                  
                                                ):loadingLayersBankDeposits ? (
                                                  <div className="loader-container">
                                                  <div className="spinner"></div>
                                                  </div>
                                                    
                                                  ):(
                                                  <Dashboard
                                                    batches={batches}
                                                    birds={birds}
                                                    eggsproduction={eggsproduction}
                                                    sales={sales}
                                                    expenses={expenses}
                                                    eggsinventory={eggsinventory}
                                                    deposits={deposits}
                                                    weighttargets={weighttargets}
                                                    weights={weights}
                                                    vaccineprogram={vaccineprogram}
                                                    vaccines={vaccines}
                                                    creditsales={creditsales}
                                                    creditexpenses={creditexpenses}
                                                  />
                                  

                                                  )}

                <Footer/>
              </Container>
              
            </div>
        </div>
    )
}
export default LayersDashboard;