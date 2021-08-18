import axios from 'axios';

const ADMIN_API_BASE_URL = "http://localhost:8080/ucare_backend/api/admin";

class adminService {
  loadUsers(){
    return axios.get(ADMIN_API_BASE_URL + '/loadUsers');
  }
}

export default new adminService();