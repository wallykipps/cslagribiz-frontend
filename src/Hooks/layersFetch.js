import {useState, useEffect} from 'react';
import LAYERS_PRODUCTION_API from '../apis/layers_production_inventory_api';
import LAYERS_SALES_EXPENSES_API from '../apis/layers_sales_expenses_api';
import {useCookies} from 'react-cookie';
import { Row, Col, Table, Button, Container, Modal, Form, InputGroup, OverlayTrigger,Tooltip} from "react-bootstrap";
// import useDebounce from './use-debounce';
import { Sales } from '../components/layers/layers_7_sales';



function useFetchBatches(){

    const [dataBatches, setDataBatches] = useState([])
    const[loadingBatches, setLoadingBatches] = useState(true);
    const[errorBatches, setErrorBatches] = useState();
    const [token]= useCookies(['mr-token']);
    // console.log(token)
    // console.log(dataBatches)

    useEffect(()=>{
        async function fetchData(){
            setLoadingBatches(true);
            setErrorBatches();
            const dataBatches = await  LAYERS_PRODUCTION_API.getBatches(token['mr-token'])
                                  .catch(err => setErrorBatches(errorBatches))
            setDataBatches(dataBatches)
            setLoadingBatches(false);
        }

        fetchData();

    },[])


    return [dataBatches, loadingBatches, errorBatches]

}

export {useFetchBatches};


function useFetchStockMovement(){
    const [dataStockMovement, setDataStockMovement] = useState([])
    const[loadingStockMovement, setLoadingStockMovement] = useState(true);
    const[errorStockMovement, setErrorStockMovement] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingStockMovement(true);
            setErrorStockMovement();
            const dataStockMovement = await  LAYERS_PRODUCTION_API.getStockMovement(token['mr-token'])
                                  .catch(err => setErrorStockMovement(errorStockMovement))
            setDataStockMovement(dataStockMovement)
            setLoadingStockMovement(false);
        }

        fetchData();

    },[])

    return [dataStockMovement, loadingStockMovement, errorStockMovement]

}

export {useFetchStockMovement};


function useFetchBirdStock(){
    const [dataBirdStock, setDataBirdStock] = useState([])
    const[loadingBirdStock, setLoadingBirdStock] = useState(true);
    const[errorBirdStock, setErrorBirdStock] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingBirdStock(true);
            setErrorBirdStock();
            const dataBirdStock = await  LAYERS_PRODUCTION_API.getBirdStock(token['mr-token'])
                                  .catch(err => setErrorBirdStock(errorBirdStock))
            setDataBirdStock(dataBirdStock)
            setLoadingBirdStock(false);
        }

        fetchData();

    },[])

    return[dataBirdStock, loadingBirdStock, errorBirdStock]

}

export {useFetchBirdStock};


function useFetchEggProduction(){
    const [dataEggProduction, setDataEggProduction] = useState([])
    const[loadingEggProduction, setLoadingEggProduction] = useState(true);
    const[errorEggProduction, setErrorEggProduction] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingEggProduction(true);
            setErrorEggProduction();
            const dataEggProduction = await  LAYERS_PRODUCTION_API.getEggProduction(token['mr-token'])
                                  .catch(err => setErrorEggProduction(errorEggProduction))
            setDataEggProduction(dataEggProduction)
            setLoadingEggProduction(false);
        }

        fetchData();

    },[])

    return [dataEggProduction, loadingEggProduction, errorEggProduction]

}

export {useFetchEggProduction};

function useFetchEggsInventory(){
    const [dataEggsInventory, setDataEggsInventory] = useState([])
    const[loadingEggsInventory, setLoadingEggsInventory] = useState(true);
    const[errorEggsInventory, setErrorEggsInventory] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingEggsInventory(true);
            setErrorEggsInventory();
            const dataEggsInventory = await  LAYERS_PRODUCTION_API.getEggsInventory(token['mr-token'])
                                  .catch(err => setErrorEggsInventory(errorEggsInventory))
            setDataEggsInventory(dataEggsInventory)
            setLoadingEggsInventory(false);
        }

        fetchData();

    },[])

    return [dataEggsInventory, loadingEggsInventory, errorEggsInventory]

}

export {useFetchEggsInventory};



function useFetchLayersProducts(){
    const [dataLayersProducts, setDataLayersProducts] = useState([])
    const[loadingLayersProducts, setLoadingLayersProducts] = useState(true);
    const[errorLayersProducts, setErrorLayersProducts] = useState();
    const [token]= useCookies(['mr-token']);
    const [searchTxt,setSearchTxt]=useState('')
    // const debounce = useDebounce(searchTxt,500)
    const searchForm = 
    (<div>
    <Form.Group className="mb-2" controlId="searchbox">
    <Form.Control 
        type="text" 
        placeholder="Search Table"
        value={searchTxt} 
        onChange = {(e)=>setSearchTxt(e.target.value)}
        />
    </Form.Group>
    </div>)


    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersProducts(true);
            setErrorLayersProducts();
            const dataLayersProducts = await  LAYERS_SALES_EXPENSES_API.getLayersProducts(token['mr-token'],searchTxt)
                                  .catch(err => setErrorLayersProducts(errorLayersProducts))
            setDataLayersProducts(dataLayersProducts)
            setLoadingLayersProducts(false);
            
        }

        fetchData();
    })

    // },[debounce])
    return [dataLayersProducts, loadingLayersProducts, errorLayersProducts, searchForm]
    
    

}

export {useFetchLayersProducts};



function useFetchLayersCustomers(){
    const [dataLayersCustomers, setDataLayersCustomers] = useState([])
    const[loadingLayersCustomers, setLoadingLayersCustomers] = useState(true);
    const[errorLayersCustomers, setErrorLayersCustomers] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersCustomers(true);
            setErrorLayersCustomers();
            const dataLayersCustomers = await  LAYERS_SALES_EXPENSES_API.getLayersCustomers(token['mr-token'])
                                  .catch(err => setErrorLayersCustomers(errorLayersCustomers))
            setDataLayersCustomers(dataLayersCustomers)
            setLoadingLayersCustomers(false);
        }

        fetchData();

    },[])

    return [dataLayersCustomers, loadingLayersCustomers, errorLayersCustomers]

}

export {useFetchLayersCustomers};


function useFetchLayersSales(){
    const [dataLayersSales, setDataLayersSales] = useState([])
    const[loadingLayersSales, setLoadingLayersSales] = useState(true);
    const[errorLayersSales, setErrorLayersSales] = useState();
    const [token]= useCookies(['mr-token']);
    const [batchFilter,setBatchFilter]=useState(3)
    // console.log(batchFilter)

    const updateBatchFilter = (newBatch) => {
        // console.log(newBatch)
        setBatchFilter(newBatch);
      }
    // const debounce = useDebounce(batchFilter,500)
    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersSales(true);
            setErrorLayersSales();
            const dataLayersSales = await  LAYERS_SALES_EXPENSES_API.getLayersSales(token['mr-token'],batchFilter)
                                  .catch(err => setErrorLayersSales(errorLayersSales))
            setDataLayersSales(dataLayersSales)
            setLoadingLayersSales(false);
        }

        fetchData();

    })
    // },[debounce])

    return [dataLayersSales, loadingLayersSales, errorLayersSales,batchFilter,setBatchFilter,updateBatchFilter]
}

export {useFetchLayersSales};


function useFetchLayersCreditSales(){
    const [dataLayersCreditSales, setDataLayersCreditSales] = useState([])
    const[loadingLayersCreditSales, setLoadingLayersCreditSales] = useState(true);
    const[errorLayersCreditSales, setErrorLayersCreditSales] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersCreditSales(true);
            setErrorLayersCreditSales();
            const dataLayersCreditSales = await  LAYERS_SALES_EXPENSES_API.getLayersCreditSales(token['mr-token'])
                                  .catch(err => setErrorLayersCreditSales(errorLayersCreditSales))
            setDataLayersCreditSales(dataLayersCreditSales)
            setLoadingLayersCreditSales(false);
        }

        fetchData();

    },[])

    return [dataLayersCreditSales, loadingLayersCreditSales, errorLayersCreditSales]

}

export {useFetchLayersCreditSales};


function useFetchLayersVendors(){
    const [dataLayersVendors, setDataLayersVendors] = useState([])
    const[loadingLayersVendors, setLoadingLayersVendors] = useState(true);
    const[errorLayersVendors, setErrorLayersVendors] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersVendors(true);
            setErrorLayersVendors();
            const dataLayersVendors = await  LAYERS_SALES_EXPENSES_API.getLayersVendors(token['mr-token'])
                                  .catch(err => setErrorLayersVendors(errorLayersVendors))
            setDataLayersVendors(dataLayersVendors)
            setLoadingLayersVendors(false);
        }

        fetchData();

    },[])

    return [dataLayersVendors, loadingLayersVendors, errorLayersVendors]

}

export {useFetchLayersVendors};


function useFetchLayersCostCategories(){
    const [dataLayersCostCategories, setDataLayersCostCategories] = useState([])
    const[loadingLayersCostCategories, setLoadingLayersCostCategories] = useState(true);
    const[errorLayersCostCategories, setErrorLayersCostCategories] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersCostCategories(true);
            setErrorLayersCostCategories();
            const dataLayersCostCategories = await  LAYERS_SALES_EXPENSES_API.getLayersCostCategories(token['mr-token'])
                                  .catch(err => setErrorLayersCostCategories(errorLayersCostCategories))
            setDataLayersCostCategories(dataLayersCostCategories)
            setLoadingLayersCostCategories(false);
        }

        fetchData();

    },[])

    return [dataLayersCostCategories, loadingLayersCostCategories, errorLayersCostCategories]

}

export {useFetchLayersCostCategories};



function useFetchLayersExpenses(){
    const [dataLayersExpenses, setDataLayersExpenses] = useState([])
    const[loadingLayersExpenses, setLoadingLayersExpenses] = useState(true);
    const[errorLayersExpenses, setErrorLayersExpenses] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersExpenses(true);
            setErrorLayersExpenses();
            const dataLayersExpenses = await  LAYERS_SALES_EXPENSES_API.getLayersExpenses(token['mr-token'])
                                  .catch(err => setErrorLayersExpenses(errorLayersExpenses))
            setDataLayersExpenses(dataLayersExpenses)
            setLoadingLayersExpenses(false);
        }

        fetchData();

    },[])

    return [dataLayersExpenses, loadingLayersExpenses, errorLayersExpenses]

}

export {useFetchLayersExpenses};


function useFetchLayersCreditExpenses(){
    const [dataLayersCreditExpenses, setDataLayersCreditExpenses] = useState([])
    const[loadingLayersCreditExpenses, setLoadingLayersCreditExpenses] = useState(true);
    const[errorLayersCreditExpenses, setErrorLayersCreditExpenses] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersCreditExpenses(true);
            setErrorLayersCreditExpenses();
            const dataLayersCreditExpenses = await  LAYERS_SALES_EXPENSES_API.getLayersCreditExpenses(token['mr-token'])
                                  .catch(err => setErrorLayersCreditExpenses(errorLayersCreditExpenses))
            setDataLayersCreditExpenses(dataLayersCreditExpenses)
            setLoadingLayersCreditExpenses(false);
        }

        fetchData();

    },[])

    return [dataLayersCreditExpenses, loadingLayersCreditExpenses, errorLayersCreditExpenses]

}

export {useFetchLayersCreditExpenses};


function useFetchLayersBankDeposits(){
    const [dataLayersBankDeposits, setDataLayersBankDeposits] = useState([])
    const[loadingLayersBankDeposits, setLoadingLayersBankDeposits] = useState(true);
    const[errorLayersBankDeposits, setErrorLayersBankDeposits] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingLayersBankDeposits(true);
            setErrorLayersBankDeposits();
            const dataLayersBankDeposits = await  LAYERS_SALES_EXPENSES_API.getLayersBankDeposits(token['mr-token'])
                                  .catch(err => setErrorLayersBankDeposits(errorLayersBankDeposits))
            setDataLayersBankDeposits(dataLayersBankDeposits)
            setLoadingLayersBankDeposits(false);
        }

        fetchData();

    },[])

    return [dataLayersBankDeposits, loadingLayersBankDeposits, errorLayersBankDeposits]

}

export {useFetchLayersBankDeposits};

function useFetchFeedTypes(){
    const [dataFeedTypes, setDataFeedTypes] = useState([])
    const[loadingFeedTypes, setLoadingFeedTypes] = useState(true);
    const[errorFeedTypes, setErrorFeedTypes] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingFeedTypes(true);
            setErrorFeedTypes();
            const dataFeedTypes = await  LAYERS_PRODUCTION_API.getFeedTypes(token['mr-token'])
                                  .catch(err => setErrorFeedTypes(errorFeedTypes))
            setDataFeedTypes(dataFeedTypes)
            setLoadingFeedTypes(false);
        }

        fetchData();

    },[])

    return [dataFeedTypes, loadingFeedTypes, errorFeedTypes]

}

export {useFetchFeedTypes};


function useFetchFeedInventory(){
    const [dataFeedInventory, setDataFeedInventory] = useState([])
    const[loadingFeedInventory, setLoadingFeedInventory] = useState(true);
    const[errorFeedInventory, setErrorFeedInventory] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingFeedInventory(true);
            setErrorFeedInventory();
            const dataFeedInventory = await  LAYERS_PRODUCTION_API.getFeedInventory(token['mr-token'])
                                  .catch(err => setErrorFeedInventory(errorFeedInventory))
            setDataFeedInventory(dataFeedInventory)
            setLoadingFeedInventory(false);
        }

        fetchData();

    },[])

    return [dataFeedInventory, loadingFeedInventory, errorFeedInventory]

}

export {useFetchFeedInventory};


function useFetchVaccinationProgram(){
    const [dataVaccinationProgram, setDataVaccinationProgram] = useState([])
    const[loadingVaccinationProgram, setLoadingVaccinationProgram] = useState(true);
    const[errorVaccinationProgram, setErrorVaccinationProgram] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingVaccinationProgram(true);
            setErrorVaccinationProgram();
            const dataVaccinationProgram = await  LAYERS_PRODUCTION_API.getVaccinationProgram(token['mr-token'])
                                  .catch(err => setErrorVaccinationProgram(errorVaccinationProgram))
            setDataVaccinationProgram(dataVaccinationProgram)
            setLoadingVaccinationProgram(false);
        }

        fetchData();

    },[])

    return [dataVaccinationProgram, loadingVaccinationProgram, errorVaccinationProgram]

}

export {useFetchVaccinationProgram};


function useFetchVaccination(){
    const [dataVaccination, setDataVaccination] = useState([])
    const[loadingVaccination, setLoadingVaccination] = useState(true);
    const[errorVaccination, setErrorVaccination] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingVaccination(true);
            setErrorVaccination();
            const dataVaccination = await  LAYERS_PRODUCTION_API.getVaccination(token['mr-token'])
                                  .catch(err => setErrorVaccination(errorVaccination))
            setDataVaccination(dataVaccination)
            setLoadingVaccination(false);
        }

        fetchData();

    },[])

    return [dataVaccination, loadingVaccination, errorVaccination]

}

export {useFetchVaccination};


function useFetchWeightTargets(){
    const [dataWeightTargets, setDataWeightTargets] = useState([])
    const[loadingWeightTargets, setLoadingWeightTargets] = useState(true);
    const[errorWeightTargets, setErrorWeightTargets] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingWeightTargets(true);
            setErrorWeightTargets();
            const dataWeightTargets = await  LAYERS_PRODUCTION_API.getWeightTargets(token['mr-token'])
                                  .catch(err => setErrorWeightTargets(errorWeightTargets))
            setDataWeightTargets(dataWeightTargets)
            setLoadingWeightTargets(false);
        }

        fetchData();

    },[])

    return [dataWeightTargets, loadingWeightTargets, errorWeightTargets]

}

export {useFetchWeightTargets};


function useFetchWeightMonitoring(){
    const [dataWeightMonitoring, setDataWeightMonitoring] = useState([])
    const[loadingWeightMonitoring, setLoadingWeightMonitoring] = useState(true);
    const[errorWeightMonitoring, setErrorWeightMonitoring] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingWeightMonitoring(true);
            setErrorWeightMonitoring();
            const dataWeightMonitoring = await  LAYERS_PRODUCTION_API.getWeightMonitoring(token['mr-token'])
                                  .catch(err => setErrorWeightMonitoring(errorWeightMonitoring))
            setDataWeightMonitoring(dataWeightMonitoring)
            setLoadingWeightMonitoring(false);
        }

        fetchData();

    },[])

    return [dataWeightMonitoring, loadingWeightMonitoring, errorWeightMonitoring]

}

export {useFetchWeightMonitoring};



function useFetchFeedTargets(){
    const [dataFeedTargets, setDataFeedTargets] = useState([])
    const[loadingFeedTargets, setLoadingFeedTargets] = useState(true);
    const[errorFeedTargets, setErrorFeedTargets] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingFeedTargets(true);
            setErrorFeedTargets();
            const dataFeedTargets = await  LAYERS_PRODUCTION_API.getFeedTargets(token['mr-token'])
                                  .catch(err => setErrorFeedTargets(errorFeedTargets))
            setDataFeedTargets(dataFeedTargets)
            setLoadingFeedTargets(false);
        }

        fetchData();

    },[])

    return [dataFeedTargets, loadingFeedTargets, errorFeedTargets]

}

export {useFetchFeedTargets};


