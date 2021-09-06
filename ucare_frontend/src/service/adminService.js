import axios from 'axios';
import { ADMIN_API_BASE_URL, HEADERS } from './urlConfig'

class adminService {
  retrieveAll(){
    return axios.get(ADMIN_API_BASE_URL + '/retrieveAll', HEADERS);
  }
  update(data){
    return axios.put(ADMIN_API_BASE_URL + '/update', data, HEADERS);
  }
}

export default new adminService();