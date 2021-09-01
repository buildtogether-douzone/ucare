import axios from 'axios';
import { TIME_API_BASE_URL } from './urlConfig'

class timeService {
  update(date){
    return axios.put(TIME_API_BASE_URL + '/update/' + date)
  }
}

export default new timeService();