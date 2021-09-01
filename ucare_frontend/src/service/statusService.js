import axios from 'axios';
import { STATUS_API_BASE_URL } from './urlConfig'

class statusService {
  retrieve(){
    return axios.get(STATUS_API_BASE_URL + '/retrieve');
  }
  update(data){
    return axios.put(STATUS_API_BASE_URL + '/update', data)
  }
}

export default new statusService();