import axios from 'axios';
import { RESERVATION_API_BASE_URL, HEADERS } from './urlConfig'

class reservationService {
  
  create(data){
    return axios.post(RESERVATION_API_BASE_URL + '/create', data, HEADERS);
  }

  retrieveAll(){
    return axios.get(RESERVATION_API_BASE_URL + '/retrieveAll', HEADERS);
  }
}

export default new reservationService();