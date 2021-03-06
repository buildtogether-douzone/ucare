import axios from 'axios';
import { DIAGNOSIS_API_BASE_URL } from './urlConfig'

class diagnosisService {
  create(data){
    return axios.post(DIAGNOSIS_API_BASE_URL + '/create', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveByPatientNo(patientNo){
    return axios.get(DIAGNOSIS_API_BASE_URL + '/retrieveByPatientNo/' + patientNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  retrieveByReceiptNo(receiptNo){
    return axios.get(DIAGNOSIS_API_BASE_URL + '/retrieveByReceiptNo/' + receiptNo, { headers: { Authorization: localStorage.getItem("authorization") }});
  }

  updateByDiagnosisNo(data){
    return axios.put(DIAGNOSIS_API_BASE_URL + '/updateByDiagnosisNo', data, { headers: { Authorization: localStorage.getItem("authorization") }});
  }
}

export default new diagnosisService();