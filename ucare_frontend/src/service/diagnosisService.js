import axios from 'axios';
import { DIAGNOSIS_API_BASE_URL, HEADERS } from './urlConfig'

class diagnosisService {
  create(data){
    return axios.post(DIAGNOSIS_API_BASE_URL + '/create', data, HEADERS);
  }
  retrieveByPatientNo(patientNo){
    return axios.get(DIAGNOSIS_API_BASE_URL + '/retrieveByPatientNo/' + patientNo, HEADERS);
  }
}

export default new diagnosisService();