import axios from 'axios';
import { HOLIDAY_API_BASE_URL } from './urlConfig';

class holidayService {

    retrieve(date){
        return axios.get(HOLIDAY_API_BASE_URL + '/retrieve/' + date, { headers: { Authorization: localStorage.getItem("authorization") }});
    }

    update(data){
        return axios.post(HOLIDAY_API_BASE_URL + '/update', data, { headers: { Authorization: localStorage.getItem("authorization") }});
    }
}

export default new holidayService();