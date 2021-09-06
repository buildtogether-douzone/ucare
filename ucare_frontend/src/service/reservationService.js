import axios from 'axios';
import {Reservation_API_BASE_URL} from './urlConfig'

class reservationService {
  
  create(data){
    return axios.post(Reservation_API_BASE_URL + '/create', data);
  }
}

export default new reservationService();