import axios from 'axios';
import { STATUS_API_BASE_URL, HEADERS } from './urlConfig'

class statusService {
  retrieve(date){
    return axios.get(STATUS_API_BASE_URL + '/retrieve/' + date, HEADERS);
  }
  update(data){
    return axios.put(STATUS_API_BASE_URL + '/update', data, HEADERS)
  }
  delete(data){
    return axios.delete(STATUS_API_BASE_URL + '/delete/' + data, HEADERS);
  }
}

export default new statusService();