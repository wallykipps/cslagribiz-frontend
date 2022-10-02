// const TOKEN = "666affd707ee528ec7010f9e8de1f2a96482980f";
export default class ENTERPRISES_API {
    static loginUser(body){
        return fetch(`http://127.0.0.1:8000/login/`, {
        //return fetch(`http://46.101.111.245/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
    }

    static registerUsers(body){
      return fetch(`http://127.0.0.1:8000/enterprises/users/`, {
      //return fetch(`http://46.101.111.245/enterprises/users/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
    
        }).then(resp => resp.json())
  }

    static getCompanies(token){
        return fetch("http://127.0.0.1:8000/enterprises/companies/", {
        //return fetch("http://46.101.111.245/enterprises/companies/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
              // 'Authorization': 'Token 666affd707ee528ec7010f9e8de1f2a96482980f'
            }
          }).then(resp => resp.json())
    }


    static getBusinessUnits(token){
        return fetch("http://127.0.0.1:8000/enterprises/businessunits/", {
        //return fetch("http://46.101.111.245/enterprises/businessunits/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
              // 'Authorization': `Token ${TOKEN}`

            }
          }).then(resp => resp.json())
    }


    static getEnterpriseTypes(token){
        return fetch("http://127.0.0.1:8000/enterprises/enterprisetypes/", {
       //return fetch("http://46.101.111.245/enterprises/enterprisetypes/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
      
          }).then(resp => resp.json())
        
    }


    
    static getStaff(token){
        return fetch("http://127.0.0.1:8000/enterprises/staff/", {
        //return fetch("http://46.101.111.245/enterprises/staff/", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
      
          }).then(resp => resp.json())
        
    }

    static createStaff(body, token){
      return fetch(`http://127.0.0.1:8000/enterprises/staff/`, {
      //return fetch(`http://46.101.111.245/enterprises/staff/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify(body)
    
        }).then(resp => resp.json())
  }


    static updateStaff(staff_id, body, token){
        return fetch(`http://127.0.0.1:8000/enterprises/staff/${staff_id}/`, {
        //return fetch(`http://46.101.111.245/enterprises/staff/${staff_id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
      
          }).then(resp => resp.json())
    }

    static removeStaff(staff_id, token){
      return fetch(`http://127.0.0.1:8000/enterprises/staff/${staff_id}/`, {
      //return fetch(`http://146.101.111.245/enterprises/staff/${staff_id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
    
        })
  }


  static getPaymentModes(token){
    return fetch("http://127.0.0.1:8000/enterprises/payment_modes/", {
    //return fetch("http://46.101.111.245/enterprises/payment_modes/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
  
      }).then(resp => resp.json())
    
}

static getBanking(token){
  return fetch("http://127.0.0.1:8000/enterprises/banking/", {
  //return fetch("http://46.101.111.245/enterprises/banking/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }

    }).then(resp => resp.json())
  
}



}