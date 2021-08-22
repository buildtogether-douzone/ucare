import axios from 'axios';
import { ADMIN_API_BASE_URL } from './urlConfig'

class adminService {
  retrieveAll(){
    return axios.get(ADMIN_API_BASE_URL + '/retrieveAll');
  }
  update(data){
    return axios.put(ADMIN_API_BASE_URL + '/update', data)
  }
}

export default new adminService();