import axios from 'axios';
import { Receipt_API_BASE_URL } from './urlConfig';

class receiptService {
  
  // create(data){
  //   return axios.post(PATIENT_API_BASE_URL + '/create', data);
  // }

  retrieveAll(){
    return axios.get(Receipt_API_BASE_URL + '/retrieveAll');
  }
}

export default new receiptService();