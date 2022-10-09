import React, {useState, useEffect} from "react";
import '../../App.css';
import '../css/Layers.css';
import {Batches} from './layers_1_batch';
import {BirdsStock} from './layers_2_birdstock';
import {WeightTargets} from './layers_16_weighttargets';
import {Weights} from './layers_17_weights';
import {VaccinationProgram} from './layers_18_vaccinationprogram';
import {Vaccination} from './layers_19_vaccination';
import {VaccinationStatus} from './layers_20_vaccinationstatus'
import NavBar from '../navbar';
import SideBar from '../sidebar';
import Footer from '../footer';
import { Tabs, Tab, Row, Col, Nav, Container} from "react-bootstrap";
import {useCookies} from 'react-cookie';
import { 
  useFetchBatches, 
  useFetchBirdStock, 
  useFetchStockMovement,
  useFetchVaccinationProgram,
  useFetchVaccination,
  useFetchWeightTargets,
  useFetchWeightMonitoring,
  useFetchLayersSales,
  useFetchLayersExpenses, 
} from "../../Hooks/layersFetch";
import BatchForm from './batch-form';
import {useFetchBusinessUnits, useFetchEnterpriseTypes, useFetchStaff} from '../../Hooks/enterpriseFetch';


function LayersFlockDashboard(props){

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

    const [dataLayersSales, loadingLayersSales, errorLayersSales] = useFetchLayersSales();
    const [dataLayersExpenses, loadingLayersExpenses, errorLayersExpenses] = useFetchLayersExpenses();


    const [dataVaccinationProgram, loadingVaccinationProgram, errorVaccinationProgram] = useFetchVaccinationProgram();
    const [dataVaccination, loadingVaccination, errorVaccination] = useFetchVaccination();

    const [dataWeightTargets, loadingWeightTargets, errorWeightTargets] = useFetchWeightTargets();
    const [dataWeightMonitoring, loadingWeightMonitoring, errorWeightMonitoring] = useFetchWeightMonitoring();



    
    const [batches, setBatches] = useState([]);
    const [selectedBatch, setSelectedBatch]=useState([]);

    const [stocktypes, setStockTypes] = useState([]);
    const [birds, setBirds] = useState([]);
    const [selectedStock, setSelectedStock]=useState([]);

    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);


    const [vaccineprogram, setVaccineProgram] = useState([]);
    const [selectedVaccineProgram, setSelectedVaccineProgram]=useState([]);
    const [vaccines, setVaccines] = useState([]);
    const [selectedVaccine, setSelectedVaccine]=useState([]);


    const [weighttargets, setWeightTargets] = useState([]);
    const [selectedWeightTarget, setSelectedWeightTarget]=useState([]);
    const [weights, setWeights] = useState([]);
    const [selectedWeight, setSelectedWeight]=useState([]);


    

    //Authentication
    useEffect(()=>{
        // console.log(token);
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
      setSales(dataLayersSales);
    }, [dataLayersSales]);

    useEffect(() => {
      setExpenses(dataLayersExpenses);
    }, [dataLayersExpenses]);
  

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



      //Batches
      const newBatch = () => {
        setSelectedBatch({delivery_date:'', batch:'', supplier:'', ordered_birds:'', delivered_birds:'',unitprice:'', businessunit:'', enterprisetype:''});
      }
    
      const createdBatch = btch => {
        const newBatches = [...batches, btch];
        setBatches(newBatches);
        newBatch();
      }


      const selectBatch = btch =>{
        // console.log(btch)
        setSelectedBatch(btch);
      }

    const updatedBatch = btch =>{
        const revisedBatch = batches.map(btch_ => {
          if (btch_.id === btch.id){
            return btch;
          
          }
          return btch_;
        })
        setBatches(revisedBatch);
        newBatch();
      }


    const deletedBatch = btch => {
        const newBatches = batches.filter(btch_ => btch_.id !== btch.id)
        setBatches(newBatches);
      }
    
    //Birds Stock
    const createdStock = () => {
      setSelectedStock({stock_date:'', batch:'', stock_movement_type:'', birds:'', birds_stock_actual:'',stock_movement_notes:'', staff:''});
    }

    const newBirdsStock = bird => {
      const newBirds = [...birds, bird];
      setBirds(newBirds);
      // createdStock();
    }


    const selectStock = bird =>{
        setSelectedStock(bird);
    }

    const updatedBirds = bird =>{
      const revisedBirds = birds.map(bird_ => {
        if (bird_.id === bird.id){
          return bird;
        
        }
        return bird_;
      })
      setBirds(revisedBirds);
      createdStock();
    }

    const deletedBirdsStock = bird => {
      const newBirds = birds.filter(bird_ => bird_.id !== bird.id)
      setBirds(newBirds);
    }

    //Weight Targets

      const createdWeightTarget = () => {
        setSelectedWeightTarget({
          week:"", 
          weight_range:"", 
          target_average_weight:"", 
        });
      }
    
      const newWeightTarget = weighttarget => {
        const newWeightTarget_ = [...weighttargets, weighttarget];
        setWeightTargets(newWeightTarget_);
        createdWeightTarget();
      }


      const selectWeightTarget = weighttarget =>{
        // console.log(weighttarget)
        setSelectedWeightTarget(weighttarget);
      }

    const updatedWeightTarget = weighttarget =>{
        const revisedWeightTarget = weighttargets.map(weighttarget_ => {
          if (weighttarget_.id === weighttarget.id){
            return weighttarget;
          
          }
          return weighttarget_;
        })
        setWeightTargets(revisedWeightTarget);
        createdWeightTarget();
      }


    const deletedWeightTarget = weighttarget => {
        const revisedWeightTarget_ = batches.filter(weighttarget_ => weighttarget_.id !== weighttarget.id)
        setWeightTargets(revisedWeightTarget_);
      }

    // Weights

    const createdWeight = () => {
      setSelectedWeight({
        weight_date:"",
        week:"", 
        batch:"", 
        actual_maximum_weight:"", 
        actual_minimum_weight:"",
        actual_average_weight:"", 
        weight_range:"", 
        measuredby:"",
      });
    }
  
    const newWeight = weight => {
      const newWeight_ = [...weights, weight];
      setWeights(newWeight_);
      createdWeight();
    }


    const selectWeight = weight =>{
      setSelectedWeight(weight);
    }

  const updatedWeight = weight =>{
      const revisedWeight = weights.map(weight_ => {
        if (weight_.id === weight.id){
          return weight;
        
        }
        return weight_;
      })
      setWeights(revisedWeight);
      createdWeight();
    }


  const deletedWeight = weight => {
      const revisedWeight_ =  weights.filter(weight_ => weight_.id !== weight.id)
      setWeights(revisedWeight_);
    }


    //Vaccination Program

    const createdVaccineProgram = () => {
      setSelectedVaccineProgram({
        vaccine_regimen:"",
        week:"", 
        vaccine:"", 
        application_mode:"", 
      });
    }
  
    const newVaccineProgram = program => {
      const newVaccineProgram_ = [...vaccineprogram, program];
      setVaccineProgram(newVaccineProgram_ );
      createdVaccineProgram();
    }


    const selectVaccineProgram= program =>{
      setSelectedVaccineProgram(program);
    }

  const updatedVaccineProgram= program =>{
      const revisedVaccineProgram = vaccineprogram.map(program_ => {
        if (program_.id === program.id){
          return program;
        
        }
        return program_;
      })
      setVaccineProgram(revisedVaccineProgram);
      createdVaccineProgram();
    }


  const deletedVaccineProgram = program => {
      const revisedVaccineProgram_ = vaccineprogram.filter(program_ => program_.id !== program.id)
      setVaccineProgram(revisedVaccineProgram_);
    }


    //Vaccination

    const createdVaccine = () => {
      setSelectedVaccine({
        week:"", 
        vaccine:"", 
        application_mode:"", 
      });
    }
  
    const newVaccine = vaccine => {
      const newVaccine_ = [...vaccines, vaccine];
      setVaccines(newVaccine_ );
      createdVaccine();
    }


    const selectVaccine= vaccine =>{
      setSelectedVaccine(vaccine);
    }

  const updatedVaccine= vaccine =>{
      const revisedVaccine = vaccines.map(vaccine_ => {
        if (vaccine_.id === vaccine.id){
          return vaccine;
        
        }
        return vaccine_;
      })
      setVaccines(revisedVaccine);
      createdVaccine();
    }


  const deletedVaccine = vaccine => {
      const revisedVaccine_ = vaccines.filter(vaccine_ => vaccine_.id !== vaccine.id)
      setVaccines(revisedVaccine_);
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
                <Tabs defaultActiveKey="birdsstock" id="production" className="mb-3">
                  <Tab eventKey="batches" title="Batches">
                    <Batches
                        businessunits={businessunits} 
                        enterprisetypes={enterprisetypes} 
                        staffTeam={staffTeam}  
                        batches={batches}
                        selectBatch={selectBatch}
                        btch={selectedBatch}
                        updatedBatch={updatedBatch}
                        newBatch={newBatch}
                        createdBatch={createdBatch}
                        deletedBatch={deletedBatch}
                      />
                  </Tab>
                  <Tab eventKey="birdsstock" title="Birds Stock">
                    <BirdsStock 
                        birds={birds}
                        staffTeam={staffTeam} 
                        stocktypes={stocktypes}
                        selectStock={selectStock}
                        bird={selectedStock}
                        batches={batches}
                        sales={sales}
                        expenses={expenses}
                        updatedBirds={updatedBirds}
                        deletedBirdsStock={deletedBirdsStock}
                        createdStock={createdStock}
                        newBirdsStock={newBirdsStock}
                    />
                  </Tab>

                  <Tab eventKey="weightmonitoring" title="Weight Monitoring">
                    <Tabs defaultActiveKey="weights" id="vweightmonitoring" className="mb-3">
                      <Tab eventKey="weighttargets" title="Weight Targets">
                        <WeightTargets
                          weighttargets={weighttargets}
                          selectWeightTarget={selectWeightTarget}
                          weighttarget={selectedWeightTarget}
                          createdWeightTarget={createdWeightTarget}
                          newWeightTarget={newWeightTarget}
                          updatedWeightTarget={updatedWeightTarget}
                          deletedWeightTarget={deletedWeightTarget}
                        
                        />
                    </Tab>

                    <Tab eventKey="weights" title="Weights">
                      <Weights
                        staffTeam={staffTeam}
                        batches={batches}
                        weighttargets={weighttargets}
                        weights={weights}
                        selectWeight={selectWeight}
                        weight={selectedWeight}
                        createdWeight={createdWeight}
                        newWeight={newWeight}
                        updatedWeight={updatedWeight}
                        deletedWeight={deletedWeight}

                      />
                  </Tab>



                    </Tabs>

                  </Tab>


                  <Tab eventKey="vaccinationprogram_status" title="Vaccination Program/Status">
                    <Tabs defaultActiveKey="vaccination" id="vaccinationprogramstatus" className="mb-3">
                      <Tab eventKey="vaccinationprogram" title="Vaccination Program">
                        <VaccinationProgram
                          batches={batches}
                          vaccines={vaccines}
                          vaccineprogram={vaccineprogram}
                          selectVaccineProgram={selectVaccineProgram}
                          program={selectedVaccineProgram}
                          createdVaccineProgram={createdVaccineProgram}
                          newVaccineProgram={newVaccineProgram}
                          updatedVaccineProgram={updatedVaccineProgram}
                          deletedVaccineProgram={deletedVaccineProgram}
                        
                        />

                      </Tab>

                      
                      <Tab eventKey="vaccination" title="Vaccination">
                        <Vaccination
                          staffTeam={staffTeam}
                          batches={batches}
                          vaccineprogram={vaccineprogram}
                          vaccines={vaccines}
                          selectVaccine={selectVaccine}
                          vaccine={selectedVaccine}
                          createdVaccine={createdVaccine}
                          newVaccine={newVaccine}
                          updatedVaccine={updatedVaccine}
                          deletedVaccine={deletedVaccine}


                        />
                      </Tab>

                      <Tab eventKey="vaccinationstatus" title="Vaccination Status">
                        <VaccinationStatus
                          batches={batches}
                          vaccines={vaccines}
                          vaccineprogram={vaccineprogram}
                          selectVaccineProgram={selectVaccineProgram}
                          program={selectedVaccineProgram}
                          createdVaccineProgram={createdVaccineProgram}
                          newVaccineProgram={newVaccineProgram}
                          updatedVaccineProgram={updatedVaccineProgram}
                          deletedVaccineProgram={deletedVaccineProgram}
                        
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
export default LayersFlockDashboard;