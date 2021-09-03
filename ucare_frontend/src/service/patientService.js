import axios from 'axios';
import {PATIENT_API_BASE_URL} from './urlConfig'

class patientService {
  
  create(data){
    return axios.post(PATIENT_API_BASE_URL + '/create', data);
  }

  retrieveAll(){
    return axios.get(PATIENT_API_BASE_URL + '/retrieveAll');
  }

  retrieve(patientNo){
    return axios.get(PATIENT_API_BASE_URL + '/retrieve/' + patientNo);
  }

  update(data){
    return axios.put(PATIENT_API_BASE_URL + '/update', data);
  }
}

export default new patientService();