import {useState, useEffect} from 'react';
import ENTERPRISES_API from '../apis/enterprises-api';
import {useCookies} from 'react-cookie';
import axios from 'axios'

function useFetchCompanies(){
    const [dataCompanies, setDataCompanies] = useState([])
    const[loadingCompanies, setLoadingCompanies] = useState(true);
    const[errorCompanies, setErrorCompanies] = useState();
    const [token]= useCookies(['mr-token']);
    // console.log(token)
    // console.log(dataCompanies)

    useEffect(()=>{
        async function fetchData(){
            setLoadingCompanies(true);
            setErrorCompanies();
            const dataCompanies = await  ENTERPRISES_API.getCompanies(token['mr-token'])
                                  .catch(err => setErrorCompanies(errorCompanies))
            setDataCompanies(dataCompanies)
            setLoadingCompanies(false);
        }

        fetchData();

    },[])

    // useEffect(() => {
    //     console.log(dataCompanies)
    //   }, [dataCompanies])

    return [dataCompanies, loadingCompanies, errorCompanies]

}

export {useFetchCompanies};

function useFetchCompanies_1(){
    // const [companies_1, setCompanies_1]=useState([])
    const [token]= useCookies(['mr-token']);
    // console.log(token)
    // console.log(companies_1)

    useEffect(()=>{
        fetchData()

    },[])

    const fetchData = async()=>{
        
        const url = `http://127.0.0.1:8000/enterprises/companies/`

        try {
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization':  `Token ${token['mr-token']}`
                }
            })

            const companies_1 = await response.json()
            // console.log(companies_1)
        }
    
        catch (e){
            console.log(e)
        }
    
    }

    return [fetchData]

}
export {useFetchCompanies_1};

//Get data using axios (example 1)

function useFetchCompanies_2(){
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        fetchData_1()
        
    },[])

    const fetchData_1 = async()=>{

        const url = `http://127.0.0.1:8000/enterprises/companies/`

        axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':  `Token ${token['mr-token']}`
              }

        })
        .then((response) => {
            const data = response.data
            // console.log(data)
        
            // console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
   
    
    }

    
    return [fetchData_1]

}
export {useFetchCompanies_2};

//Get data using axios (example 2)

function useFetchCompanies_3(){
    const [token]= useCookies(['mr-token']);
    const [post, setPost] = useState(null);
    const url = `http://127.0.0.1:8000/enterprises/companies/`
    // console.log(post)

    useEffect(() => {
      axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Token ${token['mr-token']}`
          }

      })
      .then((response) => {
        setPost(response.data);
      });
    }, []);

    return[post]

}

export {useFetchCompanies_3};



function useFetchBusinessUnits(){
    const [dataBunits, setDataBunits] = useState([])
    const[loadingBunits, setLoadingBunits] = useState(true);
    const[errorBunits, setErrorBunits] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingBunits(true);
            setErrorBunits();
            const dataBunits = await  ENTERPRISES_API.getBusinessUnits(token['mr-token'])
                                  .catch(err => setErrorBunits(errorBunits))
            setDataBunits(dataBunits)
            setLoadingBunits(false);
        }

        fetchData();

    },[])

    return [dataBunits, loadingBunits, errorBunits]

}

export {useFetchBusinessUnits};


function useFetchEnterpriseTypes(){
    const [dataEtypes, setDataEtypes] = useState([])
    const[loadingEtypes, setLoadingEtypes] = useState(true);
    const[errorEtypes, setErrorEtypes] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingEtypes(true);
            setErrorEtypes();
            const dataEtypes = await  ENTERPRISES_API.getEnterpriseTypes(token['mr-token'])
                                  .catch(err => setErrorEtypes(errorEtypes))
            setDataEtypes(dataEtypes)
            setLoadingEtypes(false);
        }

        fetchData();

    },[])

    return [dataEtypes, loadingEtypes, errorEtypes]

}

export {useFetchEnterpriseTypes};


function useFetchStaff(){
    const [dataStaff, setDataStaff] = useState([])
    const[loadingStaff, setLoadingStaff] = useState(true);
    const[errorStaff, setErrorStaff] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingStaff(true);
            setErrorStaff();
            const dataStaff = await  ENTERPRISES_API.getStaff(token['mr-token'])
                                  .catch(err => setErrorStaff(errorStaff))
            setDataStaff(dataStaff)
            setLoadingStaff(false);
        }

        fetchData();

    },[])

    return [dataStaff, loadingStaff, errorStaff]

}

export {useFetchStaff};

function useFetchPaymentModes(){
    const [dataPaymentModes, setDataPaymentModes] = useState([])
    const[loadingPaymentModes, setLoadingPaymentModes] = useState(true);
    const[errorPaymentModes, setErrorPaymentModes] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingPaymentModes(true);
            setErrorPaymentModes();
            const dataPaymentModes = await  ENTERPRISES_API.getPaymentModes(token['mr-token'])
                                  .catch(err => setErrorPaymentModes(errorPaymentModes))
            setDataPaymentModes(dataPaymentModes)
            setLoadingPaymentModes(false);
        }

        fetchData();

    },[])

    return [dataPaymentModes, loadingPaymentModes, errorPaymentModes]

}

export {useFetchPaymentModes};


function useFetchBanking(){
    const [dataBanking, setDataBanking] = useState([])
    const[loadingBanking, setLoadingBanking] = useState(true);
    const[errorBanking, setErrorBanking] = useState();
    const [token]= useCookies(['mr-token']);

    useEffect(()=>{
        async function fetchData(){
            setLoadingBanking(true);
            setErrorBanking();
            const dataBanking = await  ENTERPRISES_API.getBanking(token['mr-token'])
                                  .catch(err => setErrorBanking(errorBanking))
            setDataBanking(dataBanking)
            setLoadingBanking(false);
        }

        fetchData();

    },[])

    return [dataBanking, loadingBanking, errorBanking]

}

export {useFetchBanking};