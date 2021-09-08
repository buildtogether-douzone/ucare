import axios from 'axios';
import { HOSPITAL_API_BASE_URL } from './urlConfig';

class hospitalService {

    fetchHospitalInfo() {
        return axios.get(HOSPITAL_API_BASE_URL + '/fetchInfo', { headers: { Authorization: localStorage.getItem("authorization") }});
    }

    updateData(formData){
        return axios.post(HOSPITAL_API_BASE_URL + '/updateInfo', formData, { headers: { Authorization: localStorage.getItem("authorization") }});
    }
}

export default new hospitalService();