import axios from 'axios';
import { HOSPITAL_API_BASE_URL, HEADERS } from './urlConfig';

class hospitalService {
    fetchHospitalInfo() {
        return axios.get(HOSPITAL_API_BASE_URL + '/fetchInfo', HEADERS);
    }

    updateData(formData){
        return axios.post(HOSPITAL_API_BASE_URL + '/updateInfo', formData, HEADERS);
    }
}

export default new hospitalService();