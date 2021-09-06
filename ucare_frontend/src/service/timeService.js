import axios from 'axios';
import { TIME_API_BASE_URL } from './urlConfig'

class timeService {
  update(date){
    return axios.put(TIME_API_BASE_URL + '/update/' + date)
  }
  updateByCancel(data){
    return axios.put(TIME_API_BASE_URL + '/updateByCancel', data)
  }
  retrieveAll(date){
    return axios.get(TIME_API_BASE_URL + '/retrieveAll/' + date);
  }
}

export default new timeService();