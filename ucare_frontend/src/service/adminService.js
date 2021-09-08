import axios from 'axios';
import { ADMIN_API_BASE_URL } from './urlConfig'

class adminService {
  retrieveAll(){
    return axios.get(ADMIN_API_BASE_URL + '/retrieveAll', { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  update(data){
    return axios.put(ADMIN_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new adminService();