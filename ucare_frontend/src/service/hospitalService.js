import axios from 'axios';
import { HOSPITAL_API_BASE_URL } from './urlConfig';

class hospitalService {
    fetchHospitalInfo() {
        return axios.get(HOSPITAL_API_BASE_URL + '/fetchInfo');
    }

    updateData(formData){
        return axios.post(HOSPITAL_API_BASE_URL + '/updateInfo', formData);
    }
}

export default new hospitalService();