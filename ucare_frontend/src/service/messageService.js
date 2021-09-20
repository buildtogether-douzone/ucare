import axios from 'axios';
import { MESSAGE_API_BASE_URL} from './urlConfig'

class messageService {
    retrieveAll(userID){
        return axios.get(MESSAGE_API_BASE_URL + '/retrieveAll/' + userID , { headers: { Authorization: localStorage.getItem("authorization") }});
    }

    revise(no, name){
      return axios.put(MESSAGE_API_BASE_URL + '/revise/'+ no + '/' + name, null, { headers: { Authorization: localStorage.getItem("authorization") }});
    }

    delete(data){
      return axios.delete(MESSAGE_API_BASE_URL + '/delete/'+ data, { headers: { Authorization: localStorage.getItem("authorization") }});
    }

    sendMessage(data){
      return axios.post(MESSAGE_API_BASE_URL + '/sendMessage', data, { headers: { Authorization: localStorage.getItem("authorization") }})
    }

    sendMessageRetrieveAll(userID){
      return axios.get(MESSAGE_API_BASE_URL + '/sendMessageRetrieveAll/' + userID , { headers: { Authorization: localStorage.getItem("authorization") }});
    }
}

export default new messageService();