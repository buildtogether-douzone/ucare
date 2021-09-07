import axios from 'axios';
import {PATIENT_API_BASE_URL, HEADERS} from './urlConfig'

class patientService {
  
  create(data){
    return axios.post(PATIENT_API_BASE_URL + '/create', data, HEADERS);
  }

  retrieveAll(){
    return axios.get(PATIENT_API_BASE_URL + '/retrieveAll', HEADERS);
  }

  retrieve(patientNo){
    return axios.get(PATIENT_API_BASE_URL + '/retrieve/' + patientNo, HEADERS);
  }

  update(data){
    return axios.put(PATIENT_API_BASE_URL + '/update', data, HEADERS);
  }

  updateDiagnosis(data){
    return axios.put(PATIENT_API_BASE_URL + '/updateDiagnosis', data, HEADERS);
  }
}

export default new patientService();