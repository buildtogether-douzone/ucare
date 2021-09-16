import axios from 'axios';
import { MESSAGE_API_BASE_URL} from './urlConfig'

class messageService {
    retrieveAll(userID){
        return axios.get(MESSAGE_API_BASE_URL + '/retrieveAll/' + userID , { headers: { Authorization: localStorage.getItem("authorization") }});
      }
}

export default new messageService();