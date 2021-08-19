import axios from 'axios';

const PATIENT_API_BASE_URL = "http://localhost:8080/ucare_backend/api/patient";

class patientService {
  
  addPatient(patient){
    return axios.post(PATIENT_API_BASE_URL + '/add', patient);
  }
}

export default new patientService();