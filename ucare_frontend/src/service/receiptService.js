import axios from 'axios';
import { RECEIPT_API_BASE_URL } from './urlConfig';

class receiptService {
  
  create(data){
    return axios.post(RECEIPT_API_BASE_URL + '/create', data);
  }

  retrieveAll(patientNo){
    return axios.get(RECEIPT_API_BASE_URL + '/retrieveAll/' + patientNo);
  }

  delete(receiptNo){
    return axios.delete(RECEIPT_API_BASE_URL + '/delete/' + receiptNo);
  }
}

export default new receiptService();