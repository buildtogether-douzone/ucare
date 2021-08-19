import axios from 'axios';

const INFO_API_BASE_URL = "http://localhost:8080/ucare_backend/api/disease";

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