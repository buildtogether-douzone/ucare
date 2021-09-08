import axios from 'axios';
import { STATUS_API_BASE_URL } from './urlConfig'

class statusService {
  retrieve(date){
    return axios.get(STATUS_API_BASE_URL + '/retrieve/' + date, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  update(data){
    return axios.put(STATUS_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
  delete(data){
    return axios.delete(STATUS_API_BASE_URL + '/delete/' + data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new statusService();