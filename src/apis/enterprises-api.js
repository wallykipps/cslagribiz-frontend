// const TOKEN = "666affd707ee528ec7010f9e8de1f2a96482980f";
//http://127.0.0.1:8000
//https://backend.cslagri.biz

export default class ENTERPRISES_API {
    static loginUser(body){
        return fetch(`https://backend.cslagri.biz/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
    }

    static registerUsers(body){
      return fetch(`https://backend.cslagri.biz/enterprises/users/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
    
        }).then(resp => resp.json())
  }

    static getCompanies(token){
        return fetch("https://backend.cslagri.biz/enterprises/companies/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
              // 'Authorization': 'Token 666affd707ee528ec7010f9e8de1f2a96482980f'
            }
          }).then(resp => resp.json())
    }


    static getBusinessUnits(token){
        return fetch("https://backend.cslagri.biz/enterprises/businessunits/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
              // 'Authorization': `Token ${TOKEN}`

            }
          }).then(resp => resp.json())
    }


    static getEnterpriseTypes(token){
        return fetch("https://backend.cslagri.biz/enterprises/enterprisetypes/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
      
          }).then(resp => resp.json())
        
    }


    
    static getStaff(token){
        return fetch("https://backend.cslagri.biz/enterprises/staff/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
      
          }).then(resp => resp.json())
        
    }

    static createStaff(body, token){
      return fetch(`https://backend.cslagri.biz/enterprises/staff/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify(body)
    
        }).then(resp => resp.json())
  }


    static updateStaff(staff_id, body, token){
        return fetch(`https://backend.cslagri.biz/enterprises/staff/${staff_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
    }

    static removeStaff(staff_id, token){
      return fetch(`https://backend.cslagri.biz/enterprises/staff/${staff_id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
    
        })
  }


  static getPaymentModes(token){
    return fetch("https://backend.cslagri.biz/enterprises/payment_modes/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
  
      }).then(resp => resp.json())
    
}

static getBanking(token){
  return fetch("https://backend.cslagri.biz/enterprises/banking/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }

    }).then(resp => resp.json())
  
}



}