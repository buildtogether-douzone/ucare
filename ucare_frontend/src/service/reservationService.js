import axios from 'axios';
import { RESERVATION_API_BASE_URL } from './urlConfig'

class reservationService {
  
  create(data){
    return axios.post(RESERVATION_API_BASE_URL + '/create', data);
  }
}

export default new reservationService();