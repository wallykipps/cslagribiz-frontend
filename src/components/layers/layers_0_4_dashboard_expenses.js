import React, { useState, useEffect } from "react";
import "../../App.css";
import "../css/Layers.css";
import { Vendors} from "./layers_9_vendors";
import { CostCategories} from "./layers_10_costcategories";
import { Expenses } from "./layers_11_expenses";
import { CreditExpenses} from "./layers_12_creditexpenses";
import NavBar from "../navbar";
import SideBar from "../sidebar";
import Footer from "../footer";
import { Tabs, Tab, Row, Col, Nav, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import {
  useFetchBatches,
  useFetchLayersVendors,
  useFetchLayersCostCategories,
  useFetchLayersExpenses,
  useFetchLayersCreditExpenses,
  useFetchFeedTypes,
} from "../../Hooks/layersFetch";
import {
  useFetchBusinessUnits,
  useFetchEnterpriseTypes,
  useFetchStaff,
  useFetchPaymentModes,
} from "../../Hooks/enterpriseFetch";

function LayesExpensesDashboard(props) {
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);

  const [dataBunits, loadingBunits, errorBunits] = useFetchBusinessUnits();
  const [dataEtypes, loadingEtypes, errorEtypes] = useFetchEnterpriseTypes();
  const [dataStaff, loadingStaff, errorStaff] = useFetchStaff();
  const [dataPaymentModes, loadingPaymentModes, errorPaymentModes] = useFetchPaymentModes();

  const [businessunits, setBusinessUnit] = useState([]);
  const [enterprisetypes, setEnterpriseType] = useState([]);
  const [staffTeam, setStaffTeam] = useState([]);
  const [paymentmodes, setPaymentModes] = useState([]);

  const [dataBatches, loadingBatches, errorBatches] = useFetchBatches();
  const [dataLayersVendors, loadingLayersVendors, errorLayersVendors] = useFetchLayersVendors();
  const [dataLayersCostCategories, loadingLayersCostCategories, errorLayersCostCategories] = useFetchLayersCostCategories();
  const [dataLayersExpenses, loadingLayersExpenses, errorLayersExpenses] = useFetchLayersExpenses();
  const [dataLayersCreditExpenses, loadingLayersCreditExpenses, errorLayersCreditExpenses] = useFetchLayersCreditExpenses();
  const [dataFeedTypes, loadingFeedTypes, errorFeedTypes] = useFetchFeedTypes();


  
  const [batches, setBatches] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [costcategories, setCostCategories] = useState([]);
  const [selectedCostCategory, setSelectedCostCategory] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState([]);
  const [creditexpenses, setCreditExpenses] = useState([]);
  const [selectedCreditExpense, setSelectedCreditExpense] = useState([]);
  const [feedtypes, setFeedTypes]=useState([]);




  //Authentication
  useEffect(() => {
    // console.log(token);
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


  //Get data
  useEffect(() => {
    setBatches(dataBatches);
  }, [dataBatches]);

  useEffect(() => {
    setVendors(dataLayersVendors);
  }, [dataLayersVendors]);

  useEffect(() => {
    setCostCategories(dataLayersCostCategories);
  }, [dataLayersCostCategories]);

  useEffect(() => {
    setExpenses(dataLayersExpenses);
  }, [dataLayersExpenses]);

  useEffect(() => {
    setCreditExpenses(dataLayersCreditExpenses);
  }, [dataLayersCreditExpenses]);

  useEffect(() => {
    setFeedTypes(dataFeedTypes);
  }, [dataFeedTypes]);


  //Vendors
  const createdVendor = () => {
    setSelectedVendor({
      vendor_date: "",
      vendor: "",
      phonenumber: "",
      email: "",
      location: "",
    });
  };

  const newVendor = (vendor) => {
    const addedVendor = [...vendors, vendor];
    setVendors(addedVendor);
    createdVendor();
  };

  const selectVendor= (vendor) => {
    // console.log(vendor)
    setSelectedVendor(vendor);
  };

  const updatedVendor = (vendor) => {
    const revisedVendor = vendors.map((vendor_) => {
      if (vendor_.id === vendor.id) {
        return vendor;
      }
      return vendor_;
    });
    setVendors(revisedVendor);
    createdVendor();
  };

  const deletedVendor = (vendor) => {
    const newVendors = vendors.filter(
      (vendor_) => vendor_.id !== vendor.id
    );
    setVendors(newVendors);
  };

  //Cost Categories

  const createdCostCategory = () => {
    setSelectedCostCategory({
      vendor_date: "",
      vendor: "",
      phonenumber: "",
      email: "",
      location: "",
    });
  };

  const newCostCategory = (costcategory) => {
    const addedCostCategory = [...costcategories, costcategory];
    setCostCategories(addedCostCategory);
    createdCostCategory();
  };


  const selectCostCategory= (costcategory) => {
    // console.log(vendor)
    setSelectedCostCategory(costcategory);
  };

  const updatedCostCategory = (costcategory) => {
    const revisedCostCategory = costcategories.map((costcategory_) => {
      if (costcategory_.id === costcategory.id) {
        return costcategory;
      }
      return costcategory_;
    });
    setCostCategories(revisedCostCategory);
    createdCostCategory();
  };

  const deletedCostCategory = (costcategory) => {
    const newCostCategories = vendors.filter(
      (costcategory_) => costcategory_.id !== costcategory.id
    );
    setCostCategories(newCostCategories );
  };



  //Expenses
  // 'purchase_date', 'cost_category', 'vendor', 'expense_details','quantity','unitprice','payment_type','batch','paymentsource','staff',


  const createdExpense = () => {
    setSelectedExpense({
      purchase_date: "",
      cost_category: "",
      vendor: "",
      expense_details: "",
      unit: "",
      quantity: "",
      unitprice: "",
      payment_type: "",
      batch: "",
      paymentsource: "",
      staff: "",
    });
  };

  const newExpense = (expense) => {
    const addedExpense= [...expenses, expense];
    setExpenses(addedExpense);
    createdExpense();
  };


  const selectExpense= (expense) => {
    setSelectedExpense(expense);
  };

  const updatedExpense = (expense) => {
    const revisedExpense= expenses.map((expense_) => {
      if (expense_.id === expense.id) {
        return expense;
      }
      return expense_;
    });
    setExpenses(revisedExpense);
    createdExpense();
  };

  const deletedExpense = (expense) => {
    const newExpenses = expenses.filter(
      (expense_) => expense_.id !== expense.id
    );
    setExpenses(newExpenses);
  };


  //CreditExpenses
 
  const createdCreditExpense = () => {
    setSelectedCreditExpense({
      instalment_date: "",
      expense: "",
      instalment_amount: "",
      payment_mode: "",
      payment_source: "",
      paymentby: "",

    });
  };

  const newCreditExpense = (creditexpense) => {
    const addedCreditExpense= [...creditexpenses, creditexpense];
    setCreditExpenses(addedCreditExpense);
    createdCreditExpense();
  };

  const selectCreditExpense= (creditexpense) => {
    setSelectedCreditExpense(creditexpense);
  };

  const updatedCreditExpense = (creditexpense) => {
    const revisedCreditExpense= creditexpenses.map((creditexpense_) => {
      if (creditexpense_.id === creditexpense.id) {
        return creditexpense;
      }
      return creditexpense_;
    });
    setCreditExpenses(revisedCreditExpense);
    createdCreditExpense();
  };

  const deletedCrditExpense = (creditexpense) => {
    const newCreditExpenses = creditexpenses.filter(
      (creditexpense_) => creditexpense_.id !== creditexpense.id
    );
    setCreditExpenses(newCreditExpenses);
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
              defaultActiveKey="layers-expenses"
              id="expenses-dashboard"
              className="mb-3"
            >

              <Tab eventKey="layers-expenses-categories" title="Vendors">
                {/* Vendors */}
                <Vendors
                  vendors = {vendors}
                  selectVendor={selectVendor}
                  vendor ={selectedVendor}
                  createdVendor={createdVendor}
                  newVendor={newVendor}
                  updatedVendor={updatedVendor}
                  deletedVendor={deletedVendor}
                />
              
              </Tab>

              <Tab eventKey="layers-vendors" title="Cost Categories">
                {/* Cost Categories */}
                <CostCategories
                  costcategories={costcategories} 
                  selectCostCategory={selectCostCategory}
                  costcategory={selectedCostCategory}
                  createdCostCategory={createdCostCategory}
                  newCostCategory={newCostCategory}
                  updatedCostCategory={updatedCostCategory}
                  deletedCostCategory={deletedCostCategory}
                />

              </Tab>

              <Tab eventKey="layers-expenses" title="Expenses">
                {/* Expenses */}
                <Expenses
                  staffTeam={staffTeam}
                  batches={batches}
                  paymentmodes={paymentmodes}
                  vendors = {vendors}
                  costcategories={costcategories}
                  feedtypes={feedtypes}
                  expenses={expenses}
                  selectExpense={selectExpense}
                  expense={selectedExpense}
                  createdExpense={createdExpense}
                  newExpense={newExpense}
                  updatedExpense={updatedExpense}
                  deletedExpense={deletedExpense}
                
                />


              </Tab>

              <Tab eventKey="layers-credit-expenses" title="Credit Expenses">
                {/* Credit Expenses */}
                <CreditExpenses
                  staffTeam={staffTeam}
                  batches={batches}
                  paymentmodes={paymentmodes}
                  vendors = {vendors}
                  costcategories={costcategories}
                  expenses={expenses}
                  creditexpenses={creditexpenses}
                  selectCreditExpense={selectCreditExpense}
                  creditexpense={selectedCreditExpense}
                  createdCreditExpense={createdCreditExpense}
                  newCreditExpense={newCreditExpense}
                  updatedCreditExpense={updatedCreditExpense}
                  deletedCrditExpense={deletedCrditExpense}
                  
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
export default LayesExpensesDashboard;
