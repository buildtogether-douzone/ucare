import axios from 'axios';
import {PATIENT_API_BASE_URL} from './urlConfig'

class patientService {
  
  create(data){
    return axios.post(PATIENT_API_BASE_URL + '/create', data);
  }

  retrieveAll(){
    return axios.get(PATIENT_API_BASE_URL + '/retrieveAll');
  }
}

export default new patientService();