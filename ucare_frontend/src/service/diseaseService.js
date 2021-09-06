import axios from 'axios';
import { DISEASE_API_BASE_URL, HEADERS } from './urlConfig'

class diseaseService {
  create(data){
    return axios.post(DISEASE_API_BASE_URL + '/create', data, HEADERS);
  }
  retrieveAll(){
    return axios.get(DISEASE_API_BASE_URL + '/retrieveAll', HEADERS);
  }
  update(data){
    return axios.put(DISEASE_API_BASE_URL + '/update', data, HEADERS)
  }
  delete(diseaseNo){
    return axios.delete(DISEASE_API_BASE_URL + '/delete/' + diseaseNo, HEADERS);
  }
}

export default new diseaseService();