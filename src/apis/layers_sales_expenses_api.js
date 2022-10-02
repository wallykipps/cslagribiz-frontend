export default class LAYERS_SALES_EXPENSES_API {
    static getLayersProducts(token){
        return fetch("http://127.0.0.1:8000/layers/products/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }

    static addLayersProducts( body, token ){
        return fetch(`http://127.0.0.1:8000/layers/products/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      
      }
      
      static updateLayersProducts(product_id, body, token){
        return fetch(`http://127.0.0.1:8000/layers/products/${product_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      }

      static removeLayersProducts(product_id, token){
        return fetch(`http://127.0.0.1:8000/layers/products/${product_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
      
          })
      }


    static getLayersCustomers(token){
        return fetch("http://127.0.0.1:8000/layers/customers/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }


    static addLayersCustomers( body, token ){
        return fetch(`http://127.0.0.1:8000/layers/customers/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      
      }
      
      static updateLayersCustomers(customer_id, body, token){
        return fetch(`http://127.0.0.1:8000/layers/customers/${customer_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      }

      static removeLayersCustomers(customer_id, token){
        return fetch(`http://127.0.0.1:8000/layers/customers/${customer_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
      
          })
      }


    static getLayersSales(token){
        return fetch("http://127.0.0.1:8000/layers/sales/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }

    static addLayersSales( body, token ){
        return fetch(`http://127.0.0.1:8000/layers/sales/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      
      }
      
      static updateLayersSales(sale_id, body, token){
        return fetch(`http://127.0.0.1:8000/layers/sales/${sale_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
      }

      static removeLayersSales(sale_id, token){
        return fetch(`http://127.0.0.1:8000/layers/sales/${sale_id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
      
          })
      }


    static getLayersCreditSales(token){
      return fetch("http://127.0.0.1:8000/layers/creditsales/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }).then(resp => resp.json())
  }



  static addLayersCreditSales( body, token ){
    return fetch(`http://127.0.0.1:8000/layers/creditsales/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
  
      }).then(resp => resp.json())
  
  }


  static updateLayersCreditSales(creditsale_id, body, token){
    return fetch(`http://127.0.0.1:8000/layers/creditsales/${creditsale_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
  
      }).then(resp => resp.json())
  }

  static removeLayersCreditSales(creditsale_id, token){
    return fetch(`http://127.0.0.1:8000/layers/creditsales/${creditsale_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
  
      })
  }



static getLayersVendors(token){
    return fetch("http://127.0.0.1:8000/layers/vendors/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      }).then(resp => resp.json())
}


static addLayersVendors( body, token ){
  return fetch(`http://127.0.0.1:8000/layers/vendors/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersVendors(vendor_id, body, token){
  return fetch(`http://127.0.0.1:8000/layers/vendors/${vendor_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersVendors(vendor_id, token){
  return fetch(`http://127.0.0.1:8000/layers/vendors/${vendor_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}



static getLayersCostCategories(token){
  return fetch("http://127.0.0.1:8000/layers/costcategories/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}

static addLayersCostCategories( body, token ){
  return fetch(`http://127.0.0.1:8000/layers/costcategories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersCostCategories(cost_id, body, token){
  return fetch(`http://127.0.0.1:8000/layers/costcategories/${cost_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersCostCategories(cost_id, token){
  return fetch(`http://127.0.0.1:8000/layers/costcategories/${cost_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}



static getLayersExpenses(token){
  return fetch("http://127.0.0.1:8000/layers/expenses/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}


static addLayersExpenses( body, token ){
  return fetch(`http://127.0.0.1:8000/layers/expenses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersExpenses(cost_id, body, token){
  return fetch(`http://127.0.0.1:8000/layers/expenses/${cost_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersExpenses(cost_id, token){
  return fetch(`http://127.0.0.1:8000/layers/expenses/${cost_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getLayersCreditExpenses(token){
  return fetch("http://127.0.0.1:8000/layers/creditexpenses/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}


static addLayersCreditExpenses( body, token ){
  return fetch(`http://127.0.0.1:8000/layers/creditexpenses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersCreditExpenses(creditcost_id, body, token){
  return fetch(`http://127.0.0.1:8000/layers/creditexpenses/${creditcost_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersCreditExpenses(creditcost_id, token){
  return fetch(`http://127.0.0.1:8000/layers/creditexpenses/${creditcost_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getLayersBankDeposits(token){
  return fetch("http://127.0.0.1:8000/layers/cashbalance/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    }).then(resp => resp.json())
}


static addLayersBankDeposits( body, token ){
  return fetch(`http://127.0.0.1:8000/layers/cashbalance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateLayersBankDeposits(deposit_id, body, token){
  return fetch(`http://127.0.0.1:8000/layers/cashbalance/${deposit_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeLayersBankDeposits(deposit_id, token){
  return fetch(`http://127.0.0.1:8000/layers/cashbalance/${deposit_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


}