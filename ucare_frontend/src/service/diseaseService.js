import axios from 'axios';
import { DISEASE_API_BASE_URL } from './urlConfig'

class diseaseService {
  create(data){
    return axios.post(DISEASE_API_BASE_URL + '/create', data);
  }
  retrieveAll(){
    return axios.get(DISEASE_API_BASE_URL + '/retrieveAll');
  }
  update(data){
    return axios.put(DISEASE_API_BASE_URL + '/update', data)
  }
  delete(diseaseNo){
    return axios.delete(DISEASE_API_BASE_URL + '/delete/' + diseaseNo);
  }
}

export default new diseaseService();