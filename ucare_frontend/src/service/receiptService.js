import axios from 'axios';

const Receipt_API_BASE_URL = "http://localhost:8080/ucare_backend/api/receipt";

class receiptService {
  
  // create(data){
  //   return axios.post(PATIENT_API_BASE_URL + '/create', data);
  // }

  retrieveAll(){
    return axios.get(Receipt_API_BASE_URL + '/retrieveAll');
  }
}

export default new receiptService();