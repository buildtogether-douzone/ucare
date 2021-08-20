import axios from 'axios';

const PATIENT_API_BASE_URL = "http://localhost:8080/ucare_backend/api/patient";

class patientService {
  
  create(data){
    return axios.post(PATIENT_API_BASE_URL + '/create', data);
  }

  retrieveAll(){
    return axios.get(PATIENT_API_BASE_URL + '/retrieveAll');
  }
}

export default new patientService();