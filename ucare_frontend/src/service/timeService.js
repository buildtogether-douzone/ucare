import axios from 'axios';
import { TIME_API_BASE_URL } from './urlConfig'

class timeService {
  update(date){
    return axios.put(TIME_API_BASE_URL + '/update/' + date, null, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
  updateByCancel(data){
    return axios.put(TIME_API_BASE_URL + '/updateByCancel', data, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
  retrieveAll(date){
    return axios.get(TIME_API_BASE_URL + '/retrieveAll/' + date, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  updateTime(date){
    return axios.put(TIME_API_BASE_URL + '/updateTime', date, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
  updateDelete(date){
    return axios.put(TIME_API_BASE_URL + '/updateDelete', date, { headers: { Authorization: localStorage.getItem("authorization") }})
  }
}

export default new timeService();