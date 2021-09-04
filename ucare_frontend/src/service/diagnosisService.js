import axios from 'axios';
import { DIAGNOSIS_API_BASE_URL } from './urlConfig'

class diagnosisService {
  retrieveByPatientNo(patientNo){
    return axios.get(DIAGNOSIS_API_BASE_URL + '/retrieveByPatientNo/' + patientNo);
  }
}

export default new diagnosisService();