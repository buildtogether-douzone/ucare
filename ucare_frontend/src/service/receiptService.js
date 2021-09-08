import axios from 'axios';
import { RECEIPT_API_BASE_URL } from './urlConfig';

class receiptService {
  
  create(data){
    return axios.post(RECEIPT_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveAll(patientNo){
    return axios.get(RECEIPT_API_BASE_URL + '/retrieveAll/' + patientNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  updateState(data){
    return axios.put(RECEIPT_API_BASE_URL + '/updateState', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  delete(receiptNo){
    return axios.delete(RECEIPT_API_BASE_URL + '/delete/' + receiptNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  createRev(data){
    return axios.post(RECEIPT_API_BASE_URL + '/createRev', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
  
}

export default new receiptService();