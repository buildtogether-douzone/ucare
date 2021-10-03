import axios from 'axios';
import { PRESCRIPTION_API_BASE_URL } from './urlConfig'

class prescriptionService {
  create(data){
    return axios.post(PRESCRIPTION_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveCureYN(date){
    return axios.get(PRESCRIPTION_API_BASE_URL + '/retrieveCureYN/' + date, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveByDiagnosisNo(diagnosisNo){
    return axios.get(PRESCRIPTION_API_BASE_URL + '/retrieveByDiagnosisNo/' + diagnosisNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  update(data){
    return axios.put(PRESCRIPTION_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }})
  }

  deleteByPrescriptionNo(prescriptionNo){
    return axios.delete(PRESCRIPTION_API_BASE_URL + '/deleteByPrescriptionNo/' + prescriptionNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new prescriptionService();