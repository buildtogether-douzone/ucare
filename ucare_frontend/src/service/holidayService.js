import axios from 'axios';
import { HOLIDAY_API_BASE_URL } from './urlConfig';

class holidayService {
    update(data){
        return axios.post(HOLIDAY_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }});
    }
}

export default new holidayService();