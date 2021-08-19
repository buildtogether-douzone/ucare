import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/ucare_backend/api/patient";

class patientService {
  
  addPatient(patient){
    return axios.post(USER_API_BASE_URL + '/add', patient);
  }
}

export default new patientService();