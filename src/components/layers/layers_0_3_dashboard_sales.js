import React, { useState, useEffect } from "react";
import "../../App.css";
import "../css/Layers.css";
// import { Batches } from "./layers_1_batch";
// import { BirdsStock } from "./layers_2_birdstock";
// import { EggsProduction } from "./layers_3_production";
import {Products} from './layers_5_products';
import {Customers} from './layers_6_customers';
import {Sales} from './layers_7_sales';
import {CreditSales} from './layers_8_creditsales';
import {DepositsBalances} from './layers_13_deposits_balances';
import NavBar from "../navbar";
import SideBar from "../sidebar";
import Footer from "../footer";
import { Tabs, Tab, Row, Col, Nav, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import {
  useFetchBatches,
  useFetchBirdStock,
  useFetchStockMovement,
  useFetchEggProduction,
  useFetchLayersProducts,
  useFetchLayersCustomers,
  useFetchLayersSales,
  useFetchLayersCreditSales,
  useFetchLayersBankDeposits,
  useFetchLayersExpenses,
  useFetchLayersCreditExpenses,

} from "../../Hooks/layersFetch";
import {
  useFetchBusinessUnits,
  useFetchEnterpriseTypes,
  useFetchStaff,
  useFetchPaymentModes,
  useFetchBanking,
} from "../../Hooks/enterpriseFetch";

function LayersSalesDashboard(props) {
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);

  const [dataBunits, loadingBunits, errorBunits] = useFetchBusinessUnits();
  const [dataEtypes, loadingEtypes, errorEtypes] = useFetchEnterpriseTypes();
  const [dataStaff, loadingStaff, errorStaff] = useFetchStaff();
  const [dataPaymentModes, loadingPaymentModes, errorPaymentModes] = useFetchPaymentModes();
  const [dataBanking, loadingBanking, errorBanking] = useFetchBanking();

  const [businessunits, setBusinessUnit] = useState([]);
  const [enterprisetypes, setEnterpriseType] = useState([]);
  const [staffTeam, setStaffTeam] = useState([]);
  const [paymentmodes, setPaymentModes] = useState([]);
  const [banking, setBanking] = useState([]);

  const [dataBatches, loadingBatches, errorBatches] = useFetchBatches();
  const [dataStockMovement, loadingStockMovement, errorStockMovement] = useFetchStockMovement();
  const [dataBirdStock, loadingBirdStock, errorBirdStock] = useFetchBirdStock();
  const [dataEggProduction, loadingEggProduction, errorEggProduction] = useFetchEggProduction();


  const [dataLayersProducts, loadingLayersProducts, errorLayersProducts] = useFetchLayersProducts();
  const [dataLayersCustomers, loadingLayersCustomers, errorLayersCustomers] = useFetchLayersCustomers();
  const [dataLayersSales, loadingLayersSales, errorLayersSales] = useFetchLayersSales();
  const [dataLayersCreditSales, loadingLayersCreditSales, errorLayersCreditSales] = useFetchLayersCreditSales();
  const [dataLayersExpenses, loadingLayersExpenses, errorLayersExpenses] = useFetchLayersExpenses();
  const [dataLayersCreditExpenses, loadingLayersCreditExpenses, errorLayersCreditExpenses] = useFetchLayersCreditExpenses();
  const [dataLayersBankDeposits, loadingLayersBankDeposits, errorLayersBankDeposits] = useFetchLayersBankDeposits();


  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);

  const [stocktypes, setStockTypes] = useState([]);
  const [birds, setBirds] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);

  const [eggsproduction, setEggsProduction] = useState([]);
  const [selectedEggsProduction, setSelectedEggsProduction] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const [creditexpenses, setCreditExpenses] = useState([]);



  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState([]);
  const [creditsales, setCreditSales] = useState([]);
  const [selectedCreditSale, setSelectedCreditSale] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [selecteddeposit, setSelectedDeposit] = useState([]);



  //Authentication 
  useEffect(() => {
    console.log(token);
    if (!token["mr-token"]) window.location.href = "/login";
  }, [token]);

  //Enterprise App

  useEffect(() => {
    setBusinessUnit(dataBunits);
  }, [dataBunits]);

  useEffect(() => {
    setEnterpriseType(dataEtypes);
  }, [dataEtypes]);

  useEffect(() => {
    setStaffTeam(dataStaff);
  }, [dataStaff]);

  useEffect(() => {
    setPaymentModes(dataPaymentModes);
  }, [dataPaymentModes]);

  
  useEffect(() => {
    setBanking(dataBanking);
  }, [dataBanking]);



  //Get data
  useEffect(() => {
    setBatches(dataBatches);
  }, [dataBatches]);

  useEffect(() => {
    setStockTypes(dataStockMovement);
  }, [dataStockMovement]);

  useEffect(() => {
    setBirds(dataBirdStock);
  }, [dataBirdStock]);

  useEffect(() => {
    setEggsProduction(dataEggProduction);
  }, [dataEggProduction]);

  useEffect(() => {
    setProducts(dataLayersProducts);
  }, [dataLayersProducts]);

  useEffect(() => {
    setCustomers(dataLayersCustomers);
  }, [dataLayersCustomers]);

  useEffect(() => {
    setSales(dataLayersSales);
  }, [dataLayersSales]);


  useEffect(() => {
    setCreditSales(dataLayersCreditSales);
  }, [dataLayersCreditSales]);

  useEffect(() => {
    setExpenses(dataLayersExpenses);
  }, [dataLayersExpenses]);

  useEffect(() => {
    setCreditExpenses(dataLayersCreditExpenses);
  }, [dataLayersCreditExpenses]);

  useEffect(() => {
    setDeposits(dataLayersBankDeposits);
  }, [dataLayersBankDeposits]);


  //Products

  const createdProduct = () => {
    setSelectedProduct({
      product: "",
      unit: "",
    });
  };

  const newProduct = (product) => {
    const addedProduct = [...products, product];
    setProducts(addedProduct);
    createdProduct();
  };


  const selectProduct = (product) => {
    // console.log(product)
    setSelectedProduct(product);
  };

  const updatedProduct = (product) => {
    const revisedProduct= products.map((product_) => {
      if (product_.id === product.id) {
        return product;
        
      }
      return product_;
    });
    setProducts(revisedProduct);
    createdProduct();
  };

  const deletedProduct = (product) => {
    const newProducts = products.filter(
      (product_) => product_.id !== product.id
    );
    setProducts(newProducts);
  };



  //Customers

  const createdCustomer = () => {
    setSelectedCustomer({
      reg_date: "",
      name: "",
      phonenumber: "",
      email: "",
      location: "",
    });
  };

  const newCustomer = (customer) => {
    const addedCustomer = [...customers, customer];
    setCustomers(addedCustomer);
    createdCustomer();
  };


  const selectCustomer = (customer) => {
    // console.log(customer)
    setSelectedCustomer(customer);
  };

  const updatedCustomer = (customer) => {
    const revisedCustomer= customers.map((customer_) => {
      if (customer_.id === customer.id) {
        return customer;
      }
      return customer_;
    });
    setCustomers(revisedCustomer);
    createdCustomer();
  };

  const deletedCustomer = (customer) => {
    const newCustomers = customers.filter(
      (customer_) => customer_.id !== customer.id
    );
    setCustomers(newCustomers);
  };





  //Sales

  const createdSale = () => {
    setSelectedSale({
      date: "",
      product: "",
      quantity: "",
      unitprice: "",
      payment_mode: "",
      customer: "",
      batch: "",
      staff: "",
  
    });
  };

  const newSale = (sale) => {
    const addedSale = [...sales, sale];
    setSales(addedSale);
    createdSale();
  };


  const selectSale = (sale) => {
    // console.log(customer)
    setSelectedSale(sale);
  };

  const updatedSale = (sale) => {
    const revisedSale= sales.map((sale_) => {
      if (sale_.id === sale.id) {
        return sale;
      }
      return sale_;
    });
    setSales(revisedSale);
    createdSale();
  };

  const deletedSale = (sale) => {
    const newSales = sales.filter(
      (sale_) => sale_.id !== sale.id
    );
    setSales(newSales);
  };


  //Credit Sales
  const createdCreditSale= () => {
    setSelectedCreditSale({
      instalment_date: "",
      sale: "",
      instalment_amount: "",
      payment_mode: "",
      recipient: "",
    });
  };

  const newCreditSale = (creditsale) => {
    const addedCreditSale = [...creditsales, creditsale];
    console.log(creditsale)
    setCreditSales(addedCreditSale);
    createdCreditSale();
  };


  const selectCreditSale = (creditsale) => {
    console.log(creditsale)
    setSelectedCreditSale(creditsale);
  };


  const updatedCreditSale = (creditsale) => {
    const revisedCreditSale= creditsales.map((creditsale_) => {
      if (creditsale_.id === creditsale.id) {
        return creditsale;
      }
      return creditsale_;
    });
    setCreditSales(revisedCreditSale);
    createdCreditSale();
  };

  const deletedCreditSale = (creditsale) => {
    const newCreditSales = creditsales.filter(
      (creditsale_) => creditsale_.id !== creditsale.id
    );
    setCreditSales(newCreditSales);
  };


  //Deposits/Balance

  const createdDeposit= () => {
    setSelectedDeposit({
      deposit_date: "",
      batch: "",
      deposit_amount: "",
      credit_ac: "",
      debit_ac: "",      
      cash_balance: "",
      staff: "",
    });
  };

  const newDeposit = (deposit) => {
    const addedDeposit = [...deposits, deposit];
    console.log(deposit)
    setDeposits(addedDeposit);
    createdDeposit();
  };

  const selectDeposit = (deposit) => {
    console.log(deposit)
    setSelectedDeposit(deposit);
  };

  const updatedDeposit = (deposit) => {
    const revisedDeposit= deposits.map((deposit_) => {
      if (deposit_.id === deposit.id) {
        return deposit;
      }
      return deposit_;
    });
    setDeposits(revisedDeposit);
    createdDeposit();
  };

  const deletedDeposit= (deposit) => {
    const newDeposits= deposits.filter(
      (deposit_) => deposit_.id !== deposit.id
    );
    setDeposits(newDeposits);
  };


  //Navigation
  const [main, setMain] = useState(false);
  const toggleMain = () => {
    setMain(!main);
  };

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const [navbartoggler, setNavbartoggler] = useState(false);
  const toggleNavbar = () => {
    setNavbartoggler(!navbartoggler);
  };

  return (
    <div className="App">
      <NavBar
        toggleMain={toggleMain}
        showSidebar={showSidebar}
        toggleNabar={toggleNavbar}
      />
      <div className={main ? "main active" : "main"}>
        <SideBar sidebar={sidebar} navbartoggler={navbartoggler} />
        <Container fluid>
          <div className="tabContainer">
            <Tabs
              defaultActiveKey="sales-expenses-dashboard"
              id="sales-expenses-dashboard"
              className="mb-3"
            >
              <Tab eventKey="sales-expenses-dashboard" title="Dashboard">
                Sales Dashboard
              </Tab>

              <Tab eventKey="layers-products" title="Products">
                Products
                <Products
                 products={products}
                 selectProduct={selectProduct}
                 product={selectedProduct}
                 createdProduct={createdProduct}
                 newProduct={newProduct}
                 updatedProduct={updatedProduct}
                 deletedProduct={deletedProduct}
                  
                />


              </Tab>

              <Tab eventKey="layers-customers" title="Customers">
                Customers
                <Customers
                  customers={customers}
                  selectCustomer={selectCustomer}
                  customer={selectedCustomer}
                  createdCustomer={createdCustomer}
                  newCustomer={newCustomer}
                  updatedCustomer={updatedCustomer}
                  deletedCustomer={deletedCustomer}
                  
                />

              </Tab>

              <Tab eventKey="layers-sales" title="Sales">
                Sales
                <Sales
                  staffTeam={staffTeam}
                  batches={batches}
                  paymentmodes={paymentmodes}
                  sales={sales}
                  creditsales={creditsales}
                  products={products}
                  customers={customers}
                  selectSale={selectSale}
                  sale={selectedSale}
                  createdSale={createdSale}
                  newSale={newSale}
                  updatedSale={updatedSale}
                  deletedSale={deletedSale}
                  
                />

              </Tab>

              <Tab eventKey="layers-credit-sales" title="Credit Sales">
                Credit Sales
                <CreditSales
                  staffTeam={staffTeam}
                  batches={batches}
                  paymentmodes={paymentmodes}
                  customers={customers}
                  sales={sales}
                  products={products}
                  creditsales={creditsales}
                  selectCreditSale={selectCreditSale}
                  creditsale={selectedCreditSale}
                  createdCreditSale={createdCreditSale}
                  newCreditSale={newCreditSale}
                  updatedCreditSale={updatedCreditSale}
                  deletedCreditSale={deletedCreditSale}

                
                />
              </Tab>

              <Tab eventKey="layers-bank-deposits" title="Deposits/Balances">
                Deposits/Balances
                <DepositsBalances
                  staffTeam={staffTeam}
                  batches={batches}
                  banking={banking}
                  sales={sales}
                  creditsales={creditsales}
                  expenses={expenses}
                  creditexpenses={creditexpenses}
                  deposits={deposits}
                  selectDeposit={selectDeposit}
                  deposit={selecteddeposit}
                  createdDeposit={createdDeposit}
                  newDeposit={newDeposit}
                  updatedDeposit={updatedDeposit}
                  deletedDeposit={deletedDeposit}


                  // paymentmodes={paymentmodes}
                  // customers={customers}
                  // products={products}
                  // selectCreditSale={selectCreditSale}
                  // creditsale={selectedCreditSale}
                  // createdCreditSale={createdCreditSale}
                  // newCreditSale={newCreditSale}
                  // updatedCreditSale={updatedCreditSale}
                  // deletedCreditSale={deletedCreditSale}

                />
              </Tab>


              
            </Tabs>
          </div>
          <Footer />
        </Container>
      </div>
    </div>
  );
}
export default LayersSalesDashboard;
