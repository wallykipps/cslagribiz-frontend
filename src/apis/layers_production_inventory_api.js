//http://127.0.0.1:8000
//https://backend.cslagri.biz

export default class LAYERS_PRODUCTION_API {
    static getBatches(token){
        return fetch("https://backend.cslagri.biz/layers/batches/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }).then(resp => resp.json())
    }

    static updateBatches(batch_id, body, token){
      return fetch(`https://backend.cslagri.biz/layers/batches/${batch_id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify(body)
    
        }).then(resp => resp.json())
  }

  static addBatch( body, token ){
    return fetch(`https://backend.cslagri.biz/layers/batches/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
  
      }).then(resp => resp.json())

  }

  static removeBatch(batch_id, token){
    return fetch(`https://backend.cslagri.biz/layers/batches/${batch_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
  
      })
}

static getStockMovement( token ){
  return fetch(`https://backend.cslagri.biz/layers/stockmovement/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}


static getBirdStock( token ){
  return fetch(`https://backend.cslagri.biz/layers/birdsstock/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addBirdsStock( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/birdsstock/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}

static updateBirdsStock(bird_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/birdsstock/${bird_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}


static removeBirdsStock(bird_id, token){
  return fetch(`https://backend.cslagri.biz/layers/birdsstock/${bird_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getEggProduction( token ){
  return fetch(`https://backend.cslagri.biz/layers/production/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addEggsProduction( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/production/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateEggsProduction(eggs_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/production/${eggs_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeEggsProduction(eggs_id, token){
  return fetch(`https://backend.cslagri.biz/layers/production/${eggs_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}

static getEggsInventory( token ){
  return fetch(`https://backend.cslagri.biz/layers/eggsinventory/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addEggsInventory( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/eggsinventory/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateEggsInventory(eggs_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/eggsinventory/${eggs_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeEggsInventory(eggs_id, token){
  return fetch(`https://backend.cslagri.biz/layers/eggsinventory/${eggs_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}

static getFeedTypes( token ){
  return fetch(`https://backend.cslagri.biz/layers/feedtypes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addFeedTypes( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/feedtypes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateFeedTypes(feed_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/feedtypes/${feed_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeFeedTypes(feed_id, token){
  return fetch(`https://backend.cslagri.biz/layers/feedtypes/${feed_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}

static getFeedInventory( token ){
  return fetch(`https://backend.cslagri.biz/layers/feedinventory/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addFeedInventory( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/feedinventory/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateFeedInventory(feed_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/feedinventory/${feed_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeFeedInventory(feed_id, token){
  return fetch(`https://backend.cslagri.biz/layers/feedinventory/${feed_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getVaccinationProgram( token ){
  return fetch(`https://backend.cslagri.biz/layers/vaccinationprogram/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addVaccinationProgram( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/vaccinationprogram/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateVaccinationProgram(vaccine_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/vaccinationprogram/${vaccine_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeVaccinationProgram(vaccine_id, token){
  return fetch(`https://backend.cslagri.biz/layers/vaccinationprogram/${vaccine_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getVaccination( token ){
  return fetch(`https://backend.cslagri.biz/layers/vaccination/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addVaccination( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/vaccination/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateVaccination(vaccine_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/vaccination/${vaccine_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeVaccination(vaccine_id, token){
  return fetch(`https://backend.cslagri.biz/layers/vaccination/${vaccine_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}

static getWeightTargets( token ){
  return fetch(`https://backend.cslagri.biz/layers/weighttargets/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addWeightTargets( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/weighttargets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateWeightTargets(weight_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/weighttargets/${weight_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeWeightTargets(weight_id, token){
  return fetch(`https://backend.cslagri.biz/layers/weighttargets/${weight_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getWeightMonitoring( token ){
  return fetch(`https://backend.cslagri.biz/layers/weightmonitoring/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addWeightMonitoring( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/weightmonitoring/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateWeightMonitoring(weight_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/weightmonitoring/${weight_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeWeightMonitoring(weight_id, token){
  return fetch(`https://backend.cslagri.biz/layers/weightmonitoring/${weight_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}


static getFeedTargets( token ){
  return fetch(`https://backend.cslagri.biz/layers/feedtargets/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    }).then(resp => resp.json())

}

static addFeedTargets( body, token ){
  return fetch(`https://backend.cslagri.biz/layers/feedtargets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())

}


static updateFeedTargets(feed_id, body, token){
  return fetch(`https://backend.cslagri.biz/layers/feedtargets/${feed_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)

    }).then(resp => resp.json())
}

static removeFeedTargets(feed_id, token){
  return fetch(`https://backend.cslagri.biz/layers/feedtargets/${feed_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },

    })
}

}