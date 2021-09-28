import axios from 'axios';
import {PATIENT_API_BASE_URL} from './urlConfig'

class patientService {
  
  create(data){
    return axios.post(PATIENT_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveAll(){
    return axios.get(PATIENT_API_BASE_URL + '/retrieveAll', { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieve(patientNo){
    return axios.get(PATIENT_API_BASE_URL + '/retrieve/' + patientNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  update(data){
    return axios.put(PATIENT_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  updateDiagnosis(data){
    return axios.put(PATIENT_API_BASE_URL + '/updateDiagnosis', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  ssnOverlap(data){
    return axios.post(PATIENT_API_BASE_URL + '/ssnOverlap', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new patientService();