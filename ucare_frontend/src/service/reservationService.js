import axios from 'axios';
import { RESERVATION_API_BASE_URL } from './urlConfig'

class reservationService {
  
  create(data){
    return axios.post(RESERVATION_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveAll(){
    return axios.get(RESERVATION_API_BASE_URL + '/retrieveAll', { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  delete(revNo) {
    return axios.delete(RESERVATION_API_BASE_URL + '/delete/' + revNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new reservationService();