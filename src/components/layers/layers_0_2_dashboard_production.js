import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
// import {Batches} from './layers_1_batch';
// import {BirdsStock} from './layers_2_birdstock';
import { EggsProduction } from './layers_3_production';
import { EggsInventory } from './layers_4_eggsinventory';
import { FeedTypes } from './layers_14_feedtypes';
import { FeedInventory } from './layers_15_feedinventory';
import { FeedTargets } from "./layers_21_feedtargets";
// import {VaccinationProgram} from './layers_18_vaccinationprogram';
import NavBar from '../navbar';
import SideBar from '../sidebar';
import Footer from '../footer';
import { Tabs, Tab, Row, Col, Nav, Container} from "react-bootstrap";
import {useCookies} from 'react-cookie';
import { 
  useFetchBatches,
  useFetchBirdStock,
  useFetchStockMovement,
  useFetchEggProduction,
  useFetchEggsInventory,
  useFetchLayersSales,
  useFetchFeedTypes,
  useFetchFeedInventory,
  useFetchLayersCostCategories,
  useFetchLayersExpenses,
  useFetchFeedTargets,
 } from "../../Hooks/layersFetch";
import {
  useFetchBusinessUnits, 
  useFetchEnterpriseTypes, 
  useFetchStaff,
} from '../../Hooks/enterpriseFetch';


function EggProductionDashboard(props){

    const [token, setToken, deleteToken]= useCookies(['mr-token']);

    const [dataBunits, loadingBunits, errorBunits] = useFetchBusinessUnits();
    const [dataEtypes, loadingEtypes, errorEtypes] = useFetchEnterpriseTypes();
    const [dataStaff, loadingStaff, errorStaff] = useFetchStaff();

    const [businessunits, setBusinessUnit] = useState([]);
    const [enterprisetypes, setEnterpriseType] = useState([]);
    const [staffTeam, setStaffTeam] = useState([]);

    
    const [dataBatches, loadingBatches, errorBatches] = useFetchBatches();
    const [dataStockMovement, loadingStockMovement, errorStockMovement] = useFetchStockMovement();
    const [dataBirdStock, loadingBirdStock, errorBirdStock] = useFetchBirdStock();
    const [dataEggProduction, loadingEggProduction, errorEggProduction] = useFetchEggProduction();
    const [dataEggsInventory, loadingEggsInventory, errorEggsInventory] = useFetchEggsInventory();
    const [dataLayersSales, loadingLayersSales, errorLayersSales] = useFetchLayersSales();
    const [dataLayersExpenses, loadingLayersExpenses, errorLayersExpenses] = useFetchLayersExpenses();
    const [dataLayersCostCategories, loadingLayersCostCategories, errorLayersCostCategories] = useFetchLayersCostCategories();
    const [dataFeedTypes, loadingFeedTypes, errorFeedTypes] = useFetchFeedTypes();
    const [dataFeedInventory, loadingFeedInventory, errorFeedInventory] = useFetchFeedInventory();
    const [dataFeedTargets, loadingFeedTargets, errorFeedTargets] = useFetchFeedTargets();



    
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch]=useState([]);

    const [stocktypes, setStockTypes] = useState([]);
    const [birds, setBirds] = useState([]);
    const [selectedStock, setSelectedStock]=useState([]);

    const [eggsproduction, setEggsProduction]=useState([]);
    const [selectedEggsProduction, setSelectedEggsProduction]=useState([]);

    const [eggsinventory, setEggsInventory]=useState([]);
    const [selectedEggsRecord, setSelectedEggsRecord]=useState([]);
    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);


    const [costcategories, setCostCategories] = useState([]);
    const [feedtypes, setFeedTypes]=useState([]);
    const [selectedFeedType, setSelectedFeedType]=useState([]);
    const [feedinventory, setFeedInventory]=useState([]);
    const [selectedFeedRecord, setSelectedFeedRecord]=useState([]);
    const [feedtargets, setFeedTargets]=useState([]);
    const [selectedFeedTarget, setSelectedFeedTarget]=useState([]);

    

    //Authentication
    useEffect(()=>{
        console.log(token);
        if(!token['mr-token']) window.location.href ='/login';
      },[token])

      //Enterprise App

      useEffect(() => {
        setBusinessUnit(dataBunits);
      },[dataBunits])
    
      useEffect(() => {
        setEnterpriseType(dataEtypes);
      },[dataEtypes])
    
      useEffect(() => {
        setStaffTeam(dataStaff);
      },[dataStaff])

    //Get data
    useEffect(() => {
        setBatches(dataBatches);
      },[dataBatches])

    useEffect(() => {
        setStockTypes(dataStockMovement);
      },[dataStockMovement])

    useEffect(() => {
        setBirds(dataBirdStock);
      },[dataBirdStock])

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


    //Egg Production

    const createdEggProduction = () => {
      setSelectedEggsProduction({prod_date:'', batch:'',birds:'', gross:'', defects:'',broken:'', staff:''});
    }

    const newEggProduction = eggs => {
      const newEggsProduced = [...eggsproduction, eggs];
      setEggsProduction(newEggsProduced);
      createdEggProduction();
    }


    const selectEggProduction = eggs=>{
      // console.log(btch)
      setSelectedEggsProduction(eggs);
    }

    const updatedEggProduction = eggs =>{
      const revisedEggProduction = eggsproduction.map(eggs_ => {
        if (eggs_.id === eggs.id){
          return eggs;
        
        }
        return eggs_;
      })
      setEggsProduction(revisedEggProduction);
      createdEggProduction();
    }


    const deletedEggProduction = eggs => {
      const newEggProduction = eggsproduction.filter(eggs_ => eggs_.id !== eggs.id)
      setEggsProduction(newEggProduction);
    }


    //Eggs Inventory

    const createdEggsInventory = () => {
      setSelectedEggsRecord({
        inventory_date: "",
        egg_loss_defects: "",
        egg_loss_breakages: "",
        egg_loss_transport: "",
        egg_loss_unaccounted: "",
        eggs_stock_actual_crates: "",
        eggs_stock_actual_pieces: "",
        batch: "",
        staff: "",
      });
    };

    const newEggsInventory = record => {
      const newEggsRecords = [...eggsinventory, record];
      setEggsInventory(newEggsRecords);
      createdEggsInventory();
    }


    const selectEggsRecord = record=>{
      // console.log(btch)
      setSelectedEggsRecord(record);
    }

    const updatedEggsInventory = record =>{
      const revisedEggsInventory = eggsinventory.map(record_ => {
        if (record_.id === record.id){
          return record;
        
        }
        return record_;
      })
      setEggsInventory(revisedEggsInventory);
      createdEggsInventory();
    }


    const deletedEggsInventory = record => {
      const revisedEggsRecords = eggsproduction.filter(record_ => record_.id !== record.id)
      setEggsInventory(revisedEggsRecords);
    }

    //Feed Types

    const createdFeedType = () => {
      setSelectedFeedType({
        feed_type_1: "",
        unit: "",
        unitmeasure: "",
        brand: "",
      });
    };

    const newFeedType = feedtype => {
      const newFeedTypes = [...feedtypes, feedtype];
      setFeedTypes(newFeedTypes);
      createdFeedType();
    }

    const selectFeedType = feedtype=>{
      console.log(feedtype)
      setSelectedFeedType(feedtype);
    }

    const updatedFeedType= feedtype =>{
      const revisedFeedTypes = feedtypes.map(feedtype_ => {
        if (feedtype_.id === feedtype.id){
          return feedtype;
        
        }
        return feedtype_;
      })
      setFeedTypes(revisedFeedTypes);
      createdFeedType();
    }

    const deletedFeedType = feedtype => {
      const revisedFeedTypes = feedtypes.filter(feedtype_ => feedtype_.id !== feedtype.id)
      setFeedTypes(revisedFeedTypes);
    }


  // Feed Inventory

  const createdFeedInventory = () => {
    setSelectedFeedRecord({
      stock_date: "",
      batch: "",
      feed_type: "",
      stock_in: "",
      bags_consumed: "",
      bags_balance: "",
      staff: "",
    });
  };


  const newFeedInventory = record => {
    const newFeedInentory__ = [...feedinventory, record];
    setFeedInventory(newFeedInentory__);
    createdFeedInventory();
  }

  const selectFeedInventory = record=>{
    console.log(record)
    setSelectedFeedRecord(record);
  }

  const updatedFeedInventory= record =>{
    const revisedFeedInventory = feedinventory.map(record_ => {
      if (record_.id === record.id){
        return record;
      
      }
      return record_;
    })
    setFeedInventory(revisedFeedInventory);
    createdFeedInventory();
  }

  const deletedFeedInventory = record => {
    const revisedFeedInventory_ = feedinventory.filter(record_ => record_.id !== record.id)
    setFeedInventory(revisedFeedInventory_);
  }

  //Feed Targets

  const createdFeedTarget = () => {
    setSelectedFeedTarget({
      feed_type: "",
      week: "",
      weeks: "",
      weekly_feed_per_bird: "",

    });
  };

  const newFeedTarget = feed => {
    const newFeedTargets = [...feedtargets, feed];
    setFeedTargets(newFeedTargets);
    createdFeedTarget();
  }

  const selectFeedTarget = feed=>{
    setSelectedFeedTarget(feed);
  }

  const updatedFeedTarget= feed =>{
    const revisedFeedTargets= feedtargets.map(feed_ => {
      if (feed_.id === feed.id){
        return feed;
      
      }
      return feed_;
    })
    setFeedTargets(revisedFeedTargets);
    createdFeedTarget();
  }

  const deletedFeedTarget= feed => {
    const revisedFeedTargets_ = feedtargets.filter(feed_ => feed.id !== feed.id)
    setFeedTargets(revisedFeedTargets_);
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
  
    
    return(
        <div className='App'>
            <NavBar toggleMain={toggleMain} showSidebar ={showSidebar} toggleNabar={toggleNavbar} />
            <div className={main? 'main active':'main'} >
              <SideBar sidebar={sidebar} navbartoggler={navbartoggler}/>
              <Container fluid>
                <div className="tabContainer"> 
                <Tabs defaultActiveKey="production-dashboard" id="production-dashboard" className="mb-3">
                  <Tab eventKey="production-dashboard" title="Dashboard">
                  Production Dashboard
                  </Tab>
                  <Tab eventKey="eggs-production" title="Eggs Production">

                      <EggsProduction
                        staffTeam={staffTeam}
                        batches={batches}
                        eggsproduction={eggsproduction}
                        selectEggProduction={selectEggProduction}
                        eggs={selectedEggsProduction}
                        updatedEggProduction={updatedEggProduction}
                        newEggProduction={newEggProduction}
                        createdEggProduction={createdEggProduction}
                        deletedEggProduction={deletedEggProduction}
                        
                      
                      />

                      
                      
                  </Tab>
                  <Tab eventKey="eggs-inventory" title="Eggs Inventory">
                    Eggs Inventory
                      <EggsInventory
                        staffTeam={staffTeam}
                        batches={batches}
                        eggsproduction={eggsproduction}
                        sales={sales}
                        eggsinventory={eggsinventory}
                        selectEggsRecord={selectEggsRecord}
                        record ={selectedEggsRecord}
                        createdEggsInventory={createdEggsInventory}
                        newEggsInventory={newEggsInventory}
                        updatedEggsInventory={updatedEggsInventory}
                        deletedEggsInventory={deletedEggsInventory}
                      
                      
                      />

                  </Tab>

                  <Tab eventKey="feeds" title="Feeds">
                    <Tabs defaultActiveKey="feeds_inventory" id="layers_feeds" className="mb-3">
                      <Tab eventKey="feed_types" title="Feed Types">
                        <FeedTypes
                            costcategories={costcategories}
                            feedtypes={feedtypes}
                            selectFeedType={selectFeedType}
                            feedtype={selectedFeedType}
                            createdFeedType={createdFeedType}
                            newFeedType={newFeedType}
                            updatedFeedType={updatedFeedType}
                            deletedFeedType={deletedFeedType}
                          
                        />

                      </Tab>

                     <Tab eventKey="feeds_inventory" title="Feeds Inventory">
                        <FeedInventory
                          staffTeam={staffTeam}
                          batches={batches}
                          costcategories={costcategories}
                          expenses={expenses}
                          feedtypes={feedtypes}
                          feedinventory={feedinventory}
                          selectFeedInventory={selectFeedInventory}
                          record ={selectedFeedRecord}
                          createdFeedInventory={createdFeedInventory}
                          newFeedInventory={newFeedInventory}
                          updatedFeedInventory={updatedFeedInventory}
                          deletedFeedInventory={deletedFeedInventory}
                        
                        />

                      </Tab>

                      <Tab eventKey="feeds_monitoring" title="Feeds Monitoring">
                        <FeedTargets
                          batches={batches}
                          birds={birds}
                          costcategories={costcategories}
                          expenses={expenses}
                          feedinventory={feedinventory}
                          feedtargets={feedtargets}
                          selectFeedTarget={selectFeedTarget}
                          feed ={selectedFeedTarget}
                          createdFeedTarget={createdFeedTarget}
                          newFeedTarget={newFeedTarget}
                          updatedFeedTarget={updatedFeedTarget}
                          deletedFeedTarget={deletedFeedTarget}
                        
                        />

                      </Tab>

                    </Tabs>
                  </Tab>



                </Tabs>
                </div>
                <Footer/>
              </Container>
              
            </div>
        </div>
    )
}
export default EggProductionDashboard;