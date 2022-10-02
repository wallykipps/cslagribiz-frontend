import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Login from './components/login';
import EnterpriseDashboard from './components/enterprises/enterprise_dashboard';
import LayersDashboard from './components/layers/layers_0_0_dashboard';
import LayersFlockDashboard from './components/layers/layers_0_1_dashboard_flock';
import EggProductionDashboard from './components/layers/layers_0_2_dashboard_production';
import LayersSalesDashboard from './components/layers/layers_0_3_dashboard_sales';
import LayesExpensesDashboard from './components/layers/layers_0_4_dashboard_expenses';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';


function Router(){

  const[token, setToken] = useState('');

  return(
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path = "/" element={<App/>}/>
            <Route exact path = "/login" element={<Login/>}/>
            <Route exact path = "/enterprises" element={<EnterpriseDashboard/>}/>
            <Route exact path = "/layers-dashboard" element={<LayersDashboard/>}/>
            <Route exact path = "/layers-flock-dashboard" element={<LayersFlockDashboard/>}/>
            <Route exact path = "/layers-production-dashboard" element={<EggProductionDashboard/>}/>
            <Route exact path = "/layers-sales-dashboard" element={<LayersSalesDashboard/>}/>
            <Route exact path = "/layers-expenses-dashboard" element={<LayesExpensesDashboard/>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>

  )
}

ReactDOM.render(
<Router/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
