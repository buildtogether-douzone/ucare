import axios from 'axios';
import { DIAGNOSIS_API_BASE_URL } from './urlConfig'

class diagnosisService {
  create(data){
    return axios.post(DIAGNOSIS_API_BASE_URL + '/create', data);
  }
  retrieveByPatientNo(patientNo){
    return axios.get(DIAGNOSIS_API_BASE_URL + '/retrieveByPatientNo/' + patientNo);
  }
}

export default new diagnosisService();