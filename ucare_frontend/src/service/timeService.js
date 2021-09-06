import axios from 'axios';
import { TIME_API_BASE_URL, HEADERS } from './urlConfig'

class timeService {
  update(date){
    return axios.put(TIME_API_BASE_URL + '/update/' + date, null, HEADERS)
  }
  updateByCancel(data){
    return axios.put(TIME_API_BASE_URL + '/updateByCancel', data, HEADERS)
  }
  retrieveAll(date){
    return axios.get(TIME_API_BASE_URL + '/retrieveAll/' + date, HEADERS);
  }
}

export default new timeService();