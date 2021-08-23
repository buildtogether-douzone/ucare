import axios from 'axios';
import { RECEIPT_API_BASE_URL } from './urlConfig';

class receiptService {
  
  // create(data){
  //   return axios.post(PATIENT_API_BASE_URL + '/create', data);
  // }

  retrieveAll(patientNo){
    return axios.get(RECEIPT_API_BASE_URL + '/retrieveAll/' + patientNo);
  }
}

export default new receiptService();