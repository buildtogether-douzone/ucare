import axios from 'axios';
import { RECEIPT_API_BASE_URL, HEADERS } from './urlConfig';

class receiptService {
  
  create(data){
    return axios.post(RECEIPT_API_BASE_URL + '/create', data, HEADERS);
  }

  retrieveAll(patientNo){
    return axios.get(RECEIPT_API_BASE_URL + '/retrieveAll/' + patientNo, HEADERS);
  }

  updateState(data){
    return axios.put(RECEIPT_API_BASE_URL + '/updateState', data, HEADERS);
  }

  delete(receiptNo){
    return axios.delete(RECEIPT_API_BASE_URL + '/delete/' + receiptNo, HEADERS);
  }

  createRev(data){
    return axios.post(RECEIPT_API_BASE_URL + '/createRev', data, HEADERS);
  }
}

export default new receiptService();