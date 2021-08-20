import axios from 'axios';

const ADMIN_API_BASE_URL = "http://localhost:8080/ucare_backend/api/admin";

class adminService {
  retrieveAll(){
    return axios.get(ADMIN_API_BASE_URL + '/retrieveAll');
  }
  update(data){
    return axios.put(ADMIN_API_BASE_URL + '/update', data)
  }
}

export default new adminService();