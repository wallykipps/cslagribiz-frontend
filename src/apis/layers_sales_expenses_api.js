//http://127.0.0.1:8000
//https://backend.cslagri.biz

export default class LAYERS_SALES_EXPENSES_API {
    static getLayersProducts(token){
        return fetch("https://backend.cslagri.biz/layers/products/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }

    static addLayersProducts( body, token ){
        return fetch(`https://backend.cslagri.biz/layers/products/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      
      }
      
      static updateLayersProducts(product_id, body, token){
        return fetch(`https://backend.cslagri.biz/layers/products/${product_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      }

      static removeLayersProducts(product_id, token){
        return fetch(`https://backend.cslagri.biz/layers/products/${product_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
      
          })
      }


    static getLayersCustomers(token){
        return fetch("https://backend.cslagri.biz/layers/customers/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }


    static addLayersCustomers( body, token ){
        return fetch(`https://backend.cslagri.biz/layers/customers/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      
      }
      
      static updateLayersCustomers(customer_id, body, token){
        return fetch(`https://backend.cslagri.biz/layers/customers/${customer_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      }

      static removeLayersCustomers(customer_id, token){
        return fetch(`https://backend.cslagri.biz/layers/customers/${customer_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
      
          })
      }


    static getLayersSales(token){
        return fetch("https://backend.cslagri.biz/layers/sales/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }

    static addLayersSales( body, token ){
        return fetch(`https://backend.cslagri.biz/layers/sales/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      
      }
      
      static updateLayersSales(sale_id, body, token){
        return fetch(`https://backend.cslagri.biz/layers/sales/${sale_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      }

      static removeLayersSales(sale_id, token){
        return fetch(`https://backend.cslagri.biz/layers/sales/${sale_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
      
          })
      }


    static getLayersCreditSales(token){
      return fetch("https://backend.cslagri.biz/layers/creditsales/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }).then(resp => resp.json())
  }



  static addLayersCreditSales( body, token ){
    return fetch(`https://backend.cslagri.biz/layers/creditsales/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
  
      }).then(resp => resp.json())
  
  }


  static updateLayersCreditSales(creditsale_id, body, token){
    return fetch(`https://backend.cslagri.biz/layers/creditsales/${creditsale_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
  
      }).then(resp => resp.json())
  }

  static removeLayersCreditSales(creditsale_id, token){
    return fetch(`https://backend.cslagri.biz/layers/creditsales/${creditsale_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
  
      })
  }



static getLayersVendors(token){
    return fetch("https://backend.cslagri.biz/layers/vendors/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }).then(resp => resp.json())
}


static addLayersVendors( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/vendors/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersVendors(vendor_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/vendors/${vendor_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersVendors(vendor_id, token){
  return fetch(`https://backend.cslagri.biz/layers/vendors/${vendor_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}



static getLayersCostCategories(token){
  return fetch("https://backend.cslagri.biz/layers/costcategories/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}

static addLayersCostCategories( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/costcategories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersCostCategories(cost_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/costcategories/${cost_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersCostCategories(cost_id, token){
  return fetch(`https://backend.cslagri.biz/layers/costcategories/${cost_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}



static getLayersExpenses(token){
  return fetch("https://backend.cslagri.biz/layers/expenses/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}


static addLayersExpenses( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/expenses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersExpenses(cost_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/expenses/${cost_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersExpenses(cost_id, token){
  return fetch(`https://backend.cslagri.biz/layers/expenses/${cost_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getLayersCreditExpenses(token){
  return fetch("https://backend.cslagri.biz/layers/creditexpenses/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}


static addLayersCreditExpenses( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/creditexpenses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersCreditExpenses(creditcost_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/creditexpenses/${creditcost_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersCreditExpenses(creditcost_id, token){
  return fetch(`https://backend.cslagri.biz/layers/creditexpenses/${creditcost_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getLayersBankDeposits(token){
  return fetch("https://backend.cslagri.biz/layers/cashbalance/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}


static addLayersBankDeposits( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/cashbalance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersBankDeposits(deposit_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/cashbalance/${deposit_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersBankDeposits(deposit_id, token){
  return fetch(`https://backend.cslagri.biz/layers/cashbalance/${deposit_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


}