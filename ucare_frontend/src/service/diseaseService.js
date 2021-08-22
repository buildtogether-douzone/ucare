import axios from 'axios';
import { INFO_API_BASE_URL } from './urlConfig'

class diseaseService {
  create(data){
    return axios.post(INFO_API_BASE_URL + '/create', data);
  }
  retrieveAll(){
    return axios.get(INFO_API_BASE_URL + '/retrieveAll');
  }
  update(data){
    return axios.put(INFO_API_BASE_URL + '/update', data)
  }
  delete(diseaseNo){
    return axios.delete(INFO_API_BASE_URL + '/delete/' + diseaseNo);
  }
}

export default new diseaseService();